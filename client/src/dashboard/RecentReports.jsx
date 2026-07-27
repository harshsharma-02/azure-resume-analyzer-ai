import ReportCard from "./ReportCard";


function RecentReports({ resumes }) {


  return (

    <section className="mt-12">

      <h2 className="mb-6 text-3xl font-bold">
        Recent Reports
      </h2>


      <div className="space-y-5">


        {
          resumes?.length === 0 ? (

            <p className="text-slate-500">
              No reports available. Upload your resume to generate one.
            </p>

          ) : (

            resumes?.map((resume) => (

              <ReportCard

                key={resume._id}

                file={resume.originalName}

                score={
                  resume.analysis?.atsScore
                    ? `${resume.analysis.atsScore}%`
                    : "Not Evaluated"
                }

                date={
                  new Date(resume.createdAt)
                    .toLocaleDateString()
                }

              />

            ))

          )
        }


      </div>

    </section>

  );
}


export default RecentReports;