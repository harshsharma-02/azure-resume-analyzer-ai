import ReportCard from "./ReportCard";
import { deleteResume } from "../services/resumeAPI";

function RecentReports({
  resumes = [],
  reports = [],
  selectedResume,
  setSelectedResume,
  refreshResumes,
}) {
  const items = resumes?.length ? resumes : reports;

  const handleDelete = async (resume) => {
    const confirmed = window.confirm(
      `Delete "${resume.originalName}"?`
    );

    if (!confirmed) return;

    try {
      await deleteResume(resume._id);

      const remaining = resumes.filter(
        (r) => r._id !== resume._id
      );

      if (selectedResume?._id === resume._id) {
        setSelectedResume(remaining[0] || null);
      }

      await refreshResumes();
    } catch (err) {
      console.error(err);
      alert("Failed to delete resume.");
    }
  };

  return (
    <section id="reports" className="glass p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="eyebrow">- History -</div>

          <h2 className="mt-2 font-display text-3xl text-white">
            Recent Reports
          </h2>
        </div>

        <span className="chip">
          {items?.length || 0} entries
        </span>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 rounded-2xl border border-dashed border-white/10">
            <p className="text-[#a5b4d0] text-sm">
              No reports yet. Upload a resume to generate one.
            </p>
          </div>
        ) : (
          items.map((resume) => {
            const isActive =
              selectedResume?._id === resume._id;

            return (
              <div
                key={resume._id}
                onClick={() => setSelectedResume(resume)}
                className={`
                  cursor-pointer
                  rounded-2xl
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "ring-2 ring-cyan-400 bg-cyan-500/10"
                      : "hover:bg-white/5"
                  }
                `}
              >
                <ReportCard
                  file={resume.originalName || "Resume.pdf"}
                  score={
                    resume.aiFeedback?.overallRating
                      ? `${resume.aiFeedback.overallRating * 10}%`
                      : "N/A"
                  }
                  date={
                    resume.createdAt
                      ? new Date(
                          resume.createdAt
                        ).toLocaleDateString()
                      : "—"
                  }
                  active={isActive}
                  onDelete={() => handleDelete(resume)}
                />
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default RecentReports;