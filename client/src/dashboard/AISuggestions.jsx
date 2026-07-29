import { Sparkles } from "lucide-react";

function AISuggestions({ feedback }) {
  if (!feedback) {
    return (
      <div className="glass p-6 text-center">
        <div className="flex items-center gap-2 eyebrow justify-center">
          <Sparkles size={18} className="text-[#7ea8ff]" /> AI Coach
        </div>
        <h2 className="mt-2 font-display text-2xl text-white">Suggestions</h2>
        <p className="mt-3 text-sm text-[#a5b4d0]">Generate AI feedback to see personalized suggestions here.</p>
      </div>
    );
  }

  return (
    <div className="glass p-6 space-y-5">
      <div>
        <div className="flex items-center gap-2 eyebrow"><Sparkles size={12} className="text-[#7ea8ff]" /> AI Coach</div>
        <h2 className="mt-2 font-display text-2xl text-white">Resume Review</h2>
      </div>

      {[
        { title: "Strengths", color: "#34d399", items: feedback.strengths?.slice(0, 3) },
        { title: "Weaknesses", color: "#f87171", items: feedback.weaknesses?.slice(0, 3) },
        { title: "Improvements", color: "#7ea8ff", items: feedback.improvements?.slice(0, 3) },
      ].map((sec) => (
        <div key={sec.title}>
          <div className="font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: sec.color }}>{sec.title}</div>
          <ul className="mt-2 space-y-1.5">
            {sec.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#dbe4ff]">
                <span className="mt-1.5 h-1 w-1 rounded-full shrink-0" style={{ background: sec.color }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {feedback.recruiterSummary && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#f6c26b]">Recruiter Summary</div>
          <p className="mt-2 text-sm text-[#dbe4ff] leading-relaxed">{feedback.recruiterSummary}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/8">
        <div>
          <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7c8db0]">Rating</div>
          <div className="mt-1 font-display text-3xl text-gradient">{feedback.overallRating}<span className="text-[#7c8db0] text-lg">/10</span></div>
        </div>
        <div>
          <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7c8db0]">Hiring Prob.</div>
          <div className="mt-1 font-display text-3xl text-gradient">{feedback.hiringProbability}<span className="text-[#7c8db0] text-lg">%</span></div>
        </div>
      </div>
    </div>
  );
}

export default AISuggestions;
