import { useState } from "react";
import API from "../api/axios";
import {
  Brain,
  Copy,
  Code,
  FolderGit2,
  Users,
  Cloud,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

function InterviewGenerator({ resume }) {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);

  const badge = {
    Easy: "border-[#34d399]/25 bg-[#34d399]/10 text-[#86efac]",
    Medium: "border-[#f6c26b]/25 bg-[#f6c26b]/10 text-[#fcd34d]",
    Hard: "border-[#f87171]/25 bg-[#f87171]/10 text-[#fca5a5]",
  };

  const copyQuestion = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Question copied!");
  };

  const generateQuestions = async () => {
    if (!resume?._id) {
      return toast.error("Please upload a resume first.");
    }

    if (!jobDescription.trim()) {
      return toast.error("Paste a Job Description first.");
    }

    const toastId = toast.loading("Generating interview questions...");

    try {
      setLoading(true);

      const response = await API.post(`/interview/${resume._id}`, {
        jobDescription,
      });

      setQuestions(response.data.questions);

      toast.success("Interview questions generated successfully!", {
        id: toastId,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to generate interview questions.",
        {
          id: toastId,
        },
      );
    } finally {
      setLoading(false);
    }
  };

  const Section = ({ title, icon: Icon, items }) => (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={16} className="text-[#7ea8ff]" />
        <h3 className="font-display text-2xl text-white">{title}</h3>
      </div>
      <div className="space-y-3">
        {items?.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-[#dbe4ff] text-[14px] leading-relaxed">
                {item.question}
              </p>
              <button
                onClick={() => copyQuestion(item.question)}
                className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#a5b4d0] hover:text-white hover:border-white/25 transition"
              >
                <Copy size={14} />
              </button>
            </div>
            <span
              className={`mt-3 inline-block rounded-full border px-3 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] ${badge[item.difficulty]}`}
            >
              {item.difficulty}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="glass p-8 hover-lift">
      <div className="flex items-center gap-2 justify-center">
        <Brain className="text-[#7ea8ff]" size={30} />
        <div>
          <div className="eyebrow">- Preperation Corner -</div>
          <h2 className=" font-display  text-white text-center">
            Interview Question Generator
          </h2>
        </div>
      </div>

      <textarea
        disabled={loading}
        rows={7}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the Job Description here…"
        className="mt-6 w-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-white placeholder:text-[#5a6d92] font-sans resize-none disabled:opacity-60 disabled:cursor-not-allowed scrollbar-none"
      />

      <button
        onClick={generateQuestions}
        disabled={loading}
        className="btn-primary mt-4 !text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? "Generating Questions..." : "Generate Questions"}
        <Sparkles size={16} />
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
