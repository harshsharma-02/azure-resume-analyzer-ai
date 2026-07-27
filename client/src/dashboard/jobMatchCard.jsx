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

    if (!jobDescription.trim()) {
      alert("Paste a Job Description first.");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post(`/resume/${resume._id}/job-match`, {
        jobDescription,
      });

      setResult(response.data.jobMatch);
      resume.jobMatch = response.data.jobMatch;
    } catch (error) {
      alert(error.response?.data?.message || "Comparison failed.");
    } finally {
      setLoading(false);
    }
  };

  const getColor = () => {
    if (!result) return "#2563eb";

    if (result.matchPercentage >= 80) return "#16a34a";

    if (result.matchPercentage >= 60) return "#2563eb";

    if (result.matchPercentage >= 40) return "#f59e0b";

    return "#dc2626";
  };

  const getLabel = () => {
    if (!result) return "";

    if (result.matchPercentage >= 80) return "Excellent Match";

    if (result.matchPercentage >= 60) return "Good Match";

    if (result.matchPercentage >= 40) return "Average Match";

    return "Poor Match";
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      <div className="flex items-center gap-3">
        <Briefcase className="text-blue-600" />

        <h2 className="text-3xl font-bold">Resume vs Job Description</h2>
      </div>

      <textarea
        rows={8}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste any Job Description..."
        className="
mt-6
w-full
rounded-2xl
border
border-slate-300
bg-slate-50
p-5
text-sm
leading-7
shadow-smF
focus:ring-4
focus:ring-blue-200
focus:border-blue-500
"
      />

      <button
        onClick={handleCompare}
        disabled={loading}
        className="
          mt-6
          rounded-xl
          bg-blue-600
          px-8
          py-3
          text-white
          font-semibold
          hover:bg-blue-700
        "
      >
        {loading ? "AI Comparing..." : "Compare Resume"}
      </button>

      {result && (
        <div className="mt-12">
          <div className="flex flex-col items-center">
            <div className="h-40 w-40">
              <CircularProgressbar
                value={result.matchPercentage}
                text={`${result.matchPercentage}%`}
                styles={buildStyles({
                  pathColor: getColor(),
                  textColor: getColor(),
                })}
              />
            </div>

            <p
              className="mt-5 text-xl font-bold"
              style={{
                color: getColor(),
              }}
            >
              {getLabel()}
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-green-600">
                <CheckCircle2 size={22} />
                Matched Skills
              </h3>

              <div className="flex flex-wrap gap-3">
                {result.matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="
                      rounded-full
                      bg-green-100
                      px-4
                      py-2
                      text-green-700
                      font-medium
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-red-600">
                <XCircle size={22} />
                Missing Skills
              </h3>

              <div className="flex flex-wrap gap-3">
                {result.missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="
                      rounded-full
                      bg-red-100
                      px-4
                      py-2
                      text-red-700
                      font-medium
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold">
              <Sparkles className="text-yellow-500" />
              AI Recommendations
            </h3>

            <div className="grid gap-4">
              {result.recommendations.map((item, index) => (
                <div
                  key={index}
                  className="
                    rounded-2xl
                    border-l-4
                    border-blue-600
                    bg-slate-50
                    p-5
                    shadow-sm
                  "
                >
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
