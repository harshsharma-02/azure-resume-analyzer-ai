import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function SkillsChart({ resume }) {
  const data = resume?.aiFeedback?.skillRatings || [];

  console.log("Resume:", resume);
  console.log("AI Feedback:", resume?.aiFeedback);
  console.log("Chart Data:", data);

  return (
    <div
      className="
        mt-12
        rounded-3xl
        bg-white
        p-8
        shadow-lg
      "
    >
      <h2 className="mb-8 text-3xl font-bold">
        Skills Overview
      </h2>

      {data.length === 0 ? (
        <p>No skill ratings available yet</p>
      ) : (
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={100}
              />

              <YAxis domain={[0, 100]} />

              <Tooltip />

              <Bar dataKey="score" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default SkillsChart;