import { useState } from "react";
import API from "../api/axios";
import { Brain, Copy, Code, FolderGit2, Users, Cloud } from "lucide-react";

function InterviewGenerator({ resume }) {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);

  const badge = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };

  const copyQuestion = (text) => {
    navigator.clipboard.writeText(text);
    alert("Question copied!");
  };

  const generateQuestions = async () => {
    if (!resume?._id) {
      alert("Please upload a resume first.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Paste a Job Description.");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post(`/interview/${resume._id}`, {
        jobDescription,
      });

      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to generate questions.");
    } finally {
      setLoading(false);
    }
  };

  const Section = ({ title, icon: Icon, items }) => (
    <div className="mt-10">
      <div className="mb-5 flex items-center gap-3">
        <Icon className="text-blue-600" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="space-y-4">
        {items?.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="font-medium">{item.question}</p>

              <button
                onClick={() => copyQuestion(item.question)}
                className="rounded-lg bg-slate-100 p-2 hover:bg-slate-200"
              >
                <Copy size={18} />
              </button>
            </div>

            <span
              className={`mt-4 inline-block rounded-full px-3 py-1 text-sm font-semibold ${badge[item.difficulty]}`}
            >
              {item.difficulty}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl">
      <div className="flex items-center gap-3">
        <Brain className="text-blue-600" />
        <h1 className="text-3xl font-bold">AI Interview Question Generator</h1>
      </div>

      <textarea
        rows={8}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the Job Description..."
        className="mt-6 w-full rounded-2xl border border-slate-300 p-5 outline-none focus:border-blue-500"
      />

      <button
        onClick={generateQuestions}
        disabled={loading}
        className="mt-6 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Generating..." : "Generate Interview Questions"}
      </button>

      {questions && (
        <>
          <Section
            title="Technical Questions"
            icon={Code}
            items={questions.technical}
          />

          <Section
            title="Project Questions"
            icon={FolderGit2}
            items={questions.projects}
          />

          <Section
            title="Behavioral Questions"
            icon={Users}
            items={questions.behavioral}
          />

          <Section
            title="Cloud & Azure Questions"
            icon={Cloud}
            items={questions.cloud}
          />
        </>
      )}
    </div>
  );
}

export default InterviewGenerator;
