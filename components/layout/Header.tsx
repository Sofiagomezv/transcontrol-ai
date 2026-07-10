type HeaderProps = {
  title: string;
  description: string;
  onMenuClick: () => void;
};

export function Header({ title, description, onMenuClick }: HeaderProps) {
  return (
    <header className="border-b border-slate-800/80 bg-[#0F172A]/80 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-xl border border-slate-800 bg-slate-900/70 p-2 text-slate-300 lg:hidden"
            onClick={onMenuClick}
            aria-label="Abrir menú"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </button>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-400">
              Panel operativo
            </p>
            <h1 className="text-xl font-semibold text-white">{title}</h1>
            <p className="text-sm text-slate-400">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2563EB] font-semibold text-white">
            AD
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">Alejandro Díaz</p>
            <p className="text-xs text-slate-400">Director de operaciones</p>
          </div>
        </div>
      </div>
    </header>
  );
}
