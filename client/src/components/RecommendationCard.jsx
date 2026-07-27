import { CheckCircle2 } from "lucide-react";

function RecommendationCard({ text }) {
  return (
    <div
      className="
      flex
      items-start
      gap-4
      rounded-xl
      border
      border-slate-200
      bg-slate-50
      p-4
      transition
      hover:border-blue-300
      hover:bg-white
      "
    >
      <CheckCircle2
        className="mt-1 text-green-500"
        size={22}
      />

      <p className="text-slate-700">
        {text}
      </p>
    </div>
  );
}

export default RecommendationCard;