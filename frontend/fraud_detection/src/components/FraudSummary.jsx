import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
export default function FraudSummary({ transactions, onInspect }) {

  // 🔥 Count fraud reasons
  const reasonCount = {};

  transactions.forEach(t => {
    if (t.result.fraud) {
      t.result.reasons.forEach(r => {
        reasonCount[r] = (reasonCount[r] || 0) + 1;
      });
    }
  });

  const data = Object.keys(reasonCount).map(key => ({
    name: key,
    value: reasonCount[key]
  }));

  return (
    <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700">

      <h2 className="font-bold mb-3">Fraud Insights</h2>

      <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
              >
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#9CA3AF"
                  width={120}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff"
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 6, 6]}>
                  {data.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.value > 0 ? "#ef4444" : "#22c55e"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
      <div className="grid grid-cols-3 gap-3 mt-4">

  <button
    onClick={() => onInspect("high")}
    className="bg-red-600 hover:bg-red-700 p-2 rounded"
  >
     Highest Risk
  </button>

  <button
    onClick={() => onInspect("latest")}
    className="bg-purple-500 hover:bg-purple-700 p-2 rounded "
  >
     Latest Fraud
  </button>

  <button
    onClick={() => onInspect("random")}
    className="bg-green-600 hover:bg-green-700 p-2 rounded"
  >
     Random Sample
  </button>

</div>

    </div>
  );
}