function SkillTag({ skill, variant = "detected" }) {
  const styles =
    variant === "missing"
      ? "border-[#f87171]/25 bg-[#f87171]/10 text-[#fca5a5]"
      : "border-[#7ea8ff]/25 bg-[#7ea8ff]/10 text-[#dbe4ff]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.1em] ${styles}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${variant === "missing" ? "bg-[#f87171]" : "bg-[#7ea8ff]"}`} />
      {skill}
    </span>
  );
}
export default SkillTag;
