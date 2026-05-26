type StatCardProps = {
  label: string;
  value: string;
  detail?: string;
  tone?: "default" | "success" | "danger";
};

const tones = {
  default: "text-slate-900",
  success: "text-emerald-600",
  danger: "text-rose-600",
};

export default function StatCard({
  label,
  value,
  detail,
  tone = "default",
}: StatCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className={`mt-2 text-2xl font-bold ${tones[tone]}`}>{value}</p>
      {detail ? <p className="mt-2 text-xs text-slate-500">{detail}</p> : null}
    </div>
  );
}
