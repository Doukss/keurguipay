type PageHeaderProps = {
  title: string;
  description: string;
  actionLabel?: string;
};

export default function PageHeader({
  title,
  description,
  actionLabel,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {actionLabel ? (
        <button className="inline-flex h-10 items-center justify-center rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700">
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
