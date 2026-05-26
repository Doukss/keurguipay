import type { RentStatus } from "@/lib/mock-data";

const statusConfig: Record<RentStatus, { label: string; className: string }> = {
  PAID: {
    label: "Paye",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  PENDING: {
    label: "En attente",
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  OVERDUE: {
    label: "En retard",
    className: "border-rose-200 bg-rose-50 text-rose-700",
  },
};

export default function StatusBadge({ status }: { status: RentStatus }) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
