import DashboardLayout from "../dashboard/DashboardLayout";
import StatsSection from "../dashboard/StatsSection";
import UploadCard from "../dashboard/UploadCard";
import SkillsChart from "../dashboard/SkillsChart";
import RecentReports from "../dashboard/RecentReports";
import QuickActions from "../dashboard/QuickActions";
import AISuggestions from "../dashboard/AISuggestions";
import ActivityTimeline from "../dashboard/ActivityTimeline";
import useAuth from "../hooks/useAuth";
import useResumes from "../hooks/useResumes";
import useReports from "../hooks/useReports";
import useAIFeedback from "../hooks/useAIFeedback";
import JobMatchCard from "../dashboard/jobMatchCard";
import InterviewGenerator from "../dashboard/interviewGenerator";
import { motion } from "framer-motion";

function Dashboard() {
  const user = useAuth();
  const resumes = useResumes();
  const reports = useReports();
  const latestResume = resumes?.[0];
  const { feedback } = useAIFeedback(latestResume?._id);

  console.log("Resumes:", resumes);
console.log("Latest Resume:", latestResume);
console.log("Analysis:", latestResume?.analysis);
console.log("AI Feedback:", latestResume?.aiFeedback);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="chip">Welcome back</div>
        <h1 className="mt-3 font-display text-6xl text-white leading-[0.95]">
          Hi {user?.name?.split(" ")[0] || "there"},<br />
          <em className="text-gradient not-italic italic">let's ship your best resume.</em>
        </h1>
        <p className="mt-4 text-[#a5b4d0] max-w-xl">
          Your Azure AI copilot has parsed {resumes?.length || 0} resume{resumes?.length === 1 ? "" : "s"} so far. Continue where you left off, or drop a new one below.
        </p>
      </motion.div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        {/* LEFT — 2 columns */}
        <div className="xl:col-span-2 space-y-6">
          <StatsSection resumes={resumes} reports={reports} />
          <SkillsChart resume={resumes?.[0]} />
          <JobMatchCard resume={latestResume} />
          <InterviewGenerator resume={latestResume} />
          <RecentReports resumes={resumes} reports={reports} />
        </div>

        {/* RIGHT — 1 column */}
        <div className="space-y-6">
          <UploadCard />
          <QuickActions resume={latestResume} />
          <AISuggestions feedback={feedback} />
          <ActivityTimeline />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
