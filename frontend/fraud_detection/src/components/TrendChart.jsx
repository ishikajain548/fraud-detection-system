import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function TrendChart({ transactions }) {

  const data = transactions.map((t, i) => ({
    index: i,
    score: t.result.final_score
  }));

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-700 h-[300px] overflow-y-auto">
      <h2 className="font-bold mb-2">Risk Trend</h2>

      <LineChart width={400} height={250} data={data}>
        <XAxis dataKey="index" />
        <YAxis />
        <Tooltip />
        <Line dataKey="score" />
      </LineChart>
    </div>
  );
}