export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Espace agence
          </p>
          <h1 className="text-base font-semibold text-slate-900">KeurGui Pay</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-slate-900">Agence Immo Pro</p>
            <p className="text-xs text-slate-500">Dakar, Senegal</p>
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
            AG
          </div>
        </div>
      </div>
    </header>
  );
}
