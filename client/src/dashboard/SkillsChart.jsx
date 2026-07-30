import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

import { BarChart3, BarChart3Icon } from "lucide-react";

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;

  const skill = payload[0].payload;

  return (
    <div
      className="
      rounded-2xl
      border
      border-white/10
      bg-[#101827]/80
      backdrop-blur-2xl
      px-5
      py-4
      shadow-2xl
      "
    >
      <p className="text-sm text-[#7ea8ff] font-semibold">
        {skill.name}
      </p>

      <h3 className="mt-1 text-3xl font-black text-white">
        {skill.score}
        <span className="text-lg text-[#94a3b8]">%</span>
      </h3>

     
    </div>
  );
}

function SkillsChart({ resume }) {
  const data = resume?.aiFeedback?.skillRatings || [];

  if (!data.length) {
    return (
      <div className="glass p-8 hover-lift">
        <div className="flex items-center gap-2 eyebrow">
          <BarChart3 size={30} className="text-[#7ea8ff]" />
        </div>

        <h2 className="mt-2 font-display text-2xl text-white">
          AI Skill Ratings
        </h2>

        <div className="mt-12 text-center text-[#94a3b8]">
          Upload and analyze a resume to generate skill ratings.
        </div>
      </div>
    );
  }

  return (
    <div className="glass p-8">
      <div className="text-center">
        <div>
          <div className="flex items-center gap-2 eyebrow justify-center">
            <BarChart3Icon
              size={16}
              className="text-[#7ea8ff] "
            />
            Skill Analysis
          </div>

          <h2 className="mt-2 font-display text-2xl text-white">
            AI Skill Ratings
          </h2>

          <p className="mt-2 text-[#94a3b8] text-sm">
            Generated using your projects, experience and AI evaluation.
          </p>
        </div>
      </div>

      <div className="mt-8 h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 25,
            }}
          >
            <defs>
              <linearGradient
                id="barGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#6EA8FE"
                  stopOpacity={0.95}
                />

                <stop
                  offset="45%"
                  stopColor="#6EA8FE"
                  stopOpacity={0.45}
                />

                <stop
                  offset="100%"
                  stopColor="#6EA8FE"
                  stopOpacity={0.15}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,0.05)"
              strokeDasharray="4 6"
            />

            <XAxis
              dataKey="name"
              interval={0}
              angle={-25}
              textAnchor="end"
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{
                fill: "rgba(126,168,255,0.05)",
              }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="score"
              radius={[14, 14, 0, 0]}
              fill="url(#barGradient)"
              animationDuration={1500}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth={1.2}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SkillsChart;