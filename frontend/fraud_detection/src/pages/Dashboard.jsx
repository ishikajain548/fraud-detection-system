import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import Metrics from "../components/Metrics";
import LiveFeed from "../components/LiveFeed";
import ShapChart from "../components/ShapChart";
import TrendChart from "../components/TrendChart";
import FraudSummary from "../components/FraudSummary";
import { explainFraud } from "../services/api";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [shap, setShap] = useState(null);
  const [showShap, setShowShap] = useState(false);

  // 🔥 WebSocket setup
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe("/topic/transactions", (msg) => {
          const data = JSON.parse(msg.body);

          setTransactions((prev) => [data, ...prev.slice(0, 49)]);
        });
      }
    });

    client.activate();

    return () => client.deactivate();
  }, []);

  // 🔥 SHAP on click
  useEffect(() => {
  if (!selectedTxn || !selectedTxn.transaction) return;

  console.log(selectedTxn);

  const request = selectedTxn.transaction;

  explainFraud(request)
    .then((res) => {
      console.log("Explain response:", res.data);
      setShap(res.data.explanations);
    })
    .catch((err) => {
      console.error("Explain error:", err);
    });

}, [selectedTxn]);

const handleInspect = (mode) => {
  if (transactions.length === 0) return;

  let txn = null;

  if (mode === "high") {
    txn = [...transactions]
      .sort((a, b) => b.result.final_score - a.result.final_score)[0];
  }

  else if (mode === "latest") {
    txn = transactions.find(t => t.result.fraud);
  }

  else if (mode === "random") {
    txn = transactions[Math.floor(Math.random() * transactions.length)];
  }

  if (!txn) return;

  setSelectedTxn(txn);   // 🔥 triggers SHAP
  setShowShap(true);     // 🔥 switch UI
};


  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Smart Fraud Detection System
      </h1>

      <Metrics transactions={transactions} />

      <div className="grid md:grid-cols-2 gap-6 mt-6">

        <div className="space-y-6">
          <LiveFeed transactions={transactions} onSelect={setSelectedTxn} />
          <TrendChart transactions={transactions} />
        </div>

        <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700">

  <h2 className="font-bold mb-2 text-lg">
    Fraud Explanation
  </h2>

  {selectedTxn && (
    <div className="mb-3 text-sm text-gray-400">
      Rules Triggered:
      <div className="flex gap-2 mt-1">
        {selectedTxn.result.reasons.map((r, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded"
          >
            {r}
          </span>
        ))}
      </div>
    </div>
  )}

  {/* <ShapChart shapValues={shap} /> */}
<div className="space-y-6">

  {!showShap ? (
  <FraudSummary 
    transactions={transactions} 
    onInspect={handleInspect}   
  />
) : (
    <div>
      <button
        onClick={() => setShowShap(false)}
        className="mb-2 text-sm text-blue-400"
      >
        ← Back to Summary
      </button>

      <ShapChart shapValues={shap} />
    </div>
  )}

</div>


</div>

      </div>
    </div>
  );
}