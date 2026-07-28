import ReportCard from "./ReportCard";

function RecentReports({ resumes = [], reports = [] }) {
  const items = resumes?.length ? resumes : reports;

  return (
    <section className="glass p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="eyebrow">— History</div>
          <h2 className="mt-2 font-display text-3xl text-white">Recent Reports</h2>
        </div>
        <span className="chip">{items?.length || 0} entries</span>
      </div>

      <div className="space-y-3">
        {(!items || items.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-14 rounded-2xl border border-dashed border-white/10">
            <p className="text-[#a5b4d0] text-sm">No reports yet. Upload a resume to generate one.</p>
          </div>
        ) : (
          items.map((r) => (
            <ReportCard
              key={r._id}
              file={r.originalName || "Resume.pdf"}
              score={r.analysis?.atsScore ? `${r.analysis.atsScore}%` : "N/A"}
              date={r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "—"}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default RecentReports;
