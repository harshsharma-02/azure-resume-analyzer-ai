import { useState } from "react";
import API from "../api/axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { CheckCircle2, XCircle, Sparkles, Briefcase } from "lucide-react";

function JobMatchCard({ resume }) {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCompare = async () => {
    if (!resume?._id) return;
    if (!jobDescription.trim()) return alert("Paste a Job Description first.");
    try {
      setLoading(true);
      const response = await API.post(`/resume/${resume._id}/job-match`, { jobDescription });
      setResult(response.data.jobMatch);
      resume.jobMatch = response.data.jobMatch;
    } catch (error) {
      alert(error.response?.data?.message || "Comparison failed.");
    } finally {
      setLoading(false);
    }
  };

  const getColor = () => {
    if (!result) return "#7ea8ff";
    if (result.matchPercentage >= 80) return "#34d399";
    if (result.matchPercentage >= 60) return "#7ea8ff";
    if (result.matchPercentage >= 40) return "#f6c26b";
    return "#f87171";
  };
  const getLabel = () => {
    if (!result) return "";
    if (result.matchPercentage >= 80) return "Excellent Match";
    if (result.matchPercentage >= 60) return "Good Match";
    if (result.matchPercentage >= 40) return "Average Match";
    return "Poor Match";
  };

  return (
    <div className="glass p-8">
      <div className="flex items-center gap-3 justify-center ">
        <Briefcase className="text-[#7ea8ff]" size={30} />
        <div>
          <div className="eyebrow text-6xl">- Compare -</div>
          <h2 className="mt-10 font-display text-3xl text-white">Resume vs Job Description</h2>
        </div>
      </div>

      <textarea
        rows={7}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste any Job Description here…"
        className="mt-6 w-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-white placeholder:text-[#5a6d92] font-sans resize-none"
      />

      <button
        onClick={handleCompare}
        disabled={loading}
        className="btn-primary mt-4 !text-sm disabled:opacity-60"
      >
        {loading ? "AI Comparing…" : "Compare Resume"}
        <Sparkles size={16} />
      </button>

      {result && (
        <div className="mt-10">
          <div className="flex flex-col items-center">
            <div className="h-40 w-40">
              <CircularProgressbar
                value={result.matchPercentage}
                text={`${result.matchPercentage}%`}
                styles={buildStyles({
                  pathColor: getColor(),
                  textColor: getColor(),
                  trailColor: "rgba(148,175,218,0.1)",
                  textSize: "18px",
                })}
              />
            </div>
            <p className="mt-4 font-display text-2xl" style={{ color: getColor() }}>{getLabel()}</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#34d399]">
                <CheckCircle2 size={12} /> Matched skills
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.matchedSkills.map((s) => (
                  <span key={s} className="rounded-full border border-[#34d399]/25 bg-[#34d399]/10 px-3 py-1 text-[11px] font-mono text-[#86efac]">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#f87171]">
                <XCircle size={12} /> Missing skills
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.missingSkills.map((s) => (
                  <span key={s} className="rounded-full border border-[#f87171]/25 bg-[#f87171]/10 px-3 py-1 text-[11px] font-mono text-[#fca5a5]">{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#7ea8ff]">
              <Sparkles size={12} /> AI recommendations
            </div>
            <div className="mt-4 grid gap-3">
              {result.recommendations.map((item, index) => (
                <div key={index} className="rounded-2xl border-l-2 border-[#7ea8ff] bg-white/[0.03] p-4 text-sm text-[#dbe4ff]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobMatchCard;
