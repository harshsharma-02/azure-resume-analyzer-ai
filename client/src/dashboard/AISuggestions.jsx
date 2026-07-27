import { Sparkles, ArrowRight } from "lucide-react";

const suggestions = [
  "Include measurable achievements.",

  "Add Azure certifications.",

  "Improve cloud keywords.",

  "Mention deployment projects.",
];
function AISuggestions({ feedback }) {
  if (!feedback) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow">
        <h2 className="text-xl font-bold">AI Suggestions</h2>

        <p className="mt-3 text-slate-500">
          Generate AI feedback to see suggestions.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow space-y-6">
      <h2 className="text-2xl font-bold">AI Resume Review 🤖</h2>

      <div>
        <h3 className="font-semibold text-green-600">Strengths</h3>

        <ul className="mt-2 list-disc pl-5 text-sm">
          {feedback.strengths?.slice(0, 3).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-red-600">Weaknesses</h3>

        <ul className="mt-2 list-disc pl-5 text-sm">
          {feedback.weaknesses?.slice(0, 3).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-blue-600">Improvements</h3>

        <ul className="mt-2 list-disc pl-5 text-sm">
          {feedback.improvements?.slice(0, 3).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl bg-slate-100 p-4">
        <p className="font-bold">Recruiter Summary</p>

        <p className="mt-2 text-sm">{feedback.recruiterSummary}</p>
      </div>

      <div className="flex justify-between">
        <div>
          <p className="text-sm text-slate-500">Resume Rating</p>

          <p className="text-3xl font-black">{feedback.overallRating}/10</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Hiring Probability</p>

          <p className="text-3xl font-black">{feedback.hiringProbability}%</p>
        </div>
      </div>
    </div>
  );
}

export default AISuggestions;
