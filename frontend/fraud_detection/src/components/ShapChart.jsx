import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

export default function ShapChart({ shapValues }) {
  if (!shapValues) {
    return (
      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 text-gray-400 text-center">
        Select a transaction to view SHAP explanation
      </div>
    );
  }

  // Convert + sort by importance
  const data = Object.keys(shapValues)
    .map((key) => ({
      name: key,
      value: shapValues[key]
    }))
    .sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

  return (
    <div className="bg-gray-900 p-5 rounded-2xl shadow-xl border border-gray-800">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">
          SHAP Explanation
        </h2>
        <span className="text-xs text-gray-400">
          Feature Impact on Prediction
        </span>
      </div>

      {/* Chart */}
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

      {/* Legend */}
      <div className="flex gap-4 mt-4 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          Increases Fraud Risk
        </span>
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          Decreases Risk
        </span>
      </div>

    </div>
  );
}