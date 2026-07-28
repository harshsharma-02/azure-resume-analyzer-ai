import { CheckCircle2 } from "lucide-react";

function RecommendationCard({ text }) {
  return (
    <div className="group flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition hover:border-[#7ea8ff]/30 hover:bg-white/[0.05]">
      <CheckCircle2 size={18} className="mt-0.5 text-[#67e8f9] shrink-0" />
      <p className="text-[14px] leading-relaxed text-[#dbe4ff]">{text}</p>
    </div>
  );
}
export default RecommendationCard;
