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
import JobMatchCard from "../dashboard/jobMatchCard"
import InterviewGenerator from "../dashboard/interviewGenerator";

function Dashboard() {
  const user = useAuth();
  const resumes = useResumes();
  const reports = useReports();
  const latestResume = resumes?.[0];

const { feedback, loading } = useAIFeedback(
  latestResume?._id
);


  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-5xl font-black">
          Welcome Back {user?.name || ""} 👋
        </h1>

        <div className="mt-10 grid gap-8 xl:grid-cols-3">
          {/* LEFT */}

          <div className="xl:col-span-2 space-y-8">
            <StatsSection resumes={resumes} reports={reports} />
            <SkillsChart resume={resumes?.[0]} />

            <JobMatchCard resume={latestResume} />

            <InterviewGenerator resume={latestResume} />

            <RecentReports reports={reports} />
          </div>

          {/* RIGHT */}

          <div className="space-y-8">
            <UploadCard />

            <QuickActions resume={latestResume} />

            <AISuggestions feedback={feedback} />

            <ActivityTimeline />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
