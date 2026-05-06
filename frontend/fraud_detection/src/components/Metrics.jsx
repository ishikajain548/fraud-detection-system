export default function Metrics({ transactions }) {

  const total = transactions.length;

  const fraudCount = transactions.filter(t => t.result.fraud).length;

  const avgScore = total
    ? transactions.reduce((a, b) => a + b.result.final_score, 0) / total
    : 0;

  return (
    <div className="grid grid-cols-4 gap-4">

  <div className="bg-gray-800 p-4 rounded-xl">
    <p className="text-gray-400 text-sm">Total</p>
    <p className="text-xl font-bold">{total}</p>
  </div>

  <div className="bg-red-900/30 p-4 rounded-xl border border-red-500">
    <p className="text-gray-400 text-sm">Frauds</p>
    <p className="text-xl font-bold text-red-400">{fraudCount}</p>
  </div>

  <div className="bg-blue-900/30 p-4 rounded-xl border border-blue-500">
    <p className="text-gray-400 text-sm">Avg Risk</p>
    <p className="text-xl font-bold">
      {(avgScore * 100).toFixed(1)}%
    </p>
  </div>

  <div className="bg-yellow-900/30 p-4 rounded-xl border border-yellow-500">
    <p className="text-gray-400 text-sm">High Risk</p>
    <p className="text-xl font-bold text-yellow-400">
      {transactions.filter(t => t.result.final_score > 0.8).length}
    </p>
  </div>

</div>
  );
}