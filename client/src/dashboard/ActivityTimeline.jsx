const activities = [
  { name: "Resume uploaded", time: "Just now" },
  { name: "ATS Score generated", time: "2 min ago" },
  { name: "Job match completed", time: "5 min ago" },
  { name: "Report downloaded", time: "8 min ago" },
];

function ActivityTimeline() {
  return (
    <div className="glass p-6 hover-lift">
      <div className="eyebrow">- Timeline -</div>
      <h2 className="mt-2 font-display text-2xl text-white text-center">Recent Activity</h2>

      <div className="mt-6 space-y-5 relative">
        <div className="absolute left-[5px] top-1 bottom-1 w-px bg-gradient-to-b from-[#4a7dff]/40 via-white/10 to-transparent" />
        {activities.map((a, i) => (
          <div key={a.name} className="flex gap-4 relative pl-6">
            <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-[#7ea8ff] bg-[#050914]" style={{ animationDelay: `${i * 0.3}s` }} />
            <div>
              <h3 className="text-[14px] font-medium text-white">{a.name}</h3>
              <p className="text-xs font-mono text-[#7c8db0] mt-0.5">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityTimeline;
