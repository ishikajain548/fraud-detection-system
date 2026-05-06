export default function LiveFeed({ transactions, onSelect }) {

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-700 h-[300px] overflow-y-auto">

      <h2 className="font-bold mb-2">Live Transactions</h2>

      {transactions.map((txn, i) => (
       <div
  key={i}
  onClick={() => onSelect(txn)}
  className={`p-3 mb-2 rounded-xl cursor-pointer border ${
    txn.result.fraud
      ? "bg-red-900/30 border-red-500"
      : "bg-green-900/30 border-green-500"
  }`}
>
  <div className="flex justify-between">
    <span className="font-semibold">
      ₹{txn.transaction.amount}
    </span>

    <span className={`text-sm font-bold ${
      txn.result.fraud ? "text-red-400" : "text-green-400"
    }`}>
      {txn.result.decision}
      
    </span>
  </div>

  <div className="text-xs text-gray-400 mt-1">
    Score: {(txn.result.final_score * 100).toFixed(1)}%
  </div>
</div>
      ))}

    </div>
  );
}