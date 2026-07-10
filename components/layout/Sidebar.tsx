"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";

type NavItem = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: HomeIcon },
  { label: "Viajes", href: "/viajes", icon: RouteIcon },
  { label: "Vehículos", href: "/vehiculos", icon: TruckIcon },
  { label: "Conductores", href: "/conductores", icon: UserGroupIcon },
  { label: "Reportes", href: "/reportes", icon: ChartIcon },
  { label: "Importar datos", href: "/importar-datos", icon: UploadIcon },
  { label: "Configuración", href: "/configuracion", icon: SettingsIcon },
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-800/80 bg-[#111827] px-5 py-6 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:w-72 lg:translate-x-0`}
      >
        <div className="flex items-center justify-between lg:justify-start">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] text-sm font-semibold text-white">
              TC
            </div>
            <div>
              <p className="text-base font-semibold text-white">TransControl AI</p>
              <p className="text-xs text-slate-400">Operaciones inteligentes</p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 space-y-2">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-950/70 lg:hidden"
          onClick={onClose}
          aria-label="Cerrar menú"
        />
      )}
    </>
  );
}

function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M6 9.5V21h12V9.5" />
    </svg>
  );
}

function RouteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M5 8h14" />
      <path d="M7 8V5h10v3" />
      <path d="M7 8v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8" />
    </svg>
  );
}

function TruckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M3 8h11v8H3z" />
      <path d="M14 10h3l2 2v4h-5" />
      <circle cx="7.5" cy="17" r="1.8" />
      <circle cx="16.5" cy="17" r="1.8" />
    </svg>
  );
}

function UserGroupIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M16 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      <path d="M4 19a4 4 0 0 1 8 0" />
      <path d="M14 19a3.5 3.5 0 0 1 6 0" />
    </svg>
  );
}

function ChartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M5 19V10" />
      <path d="M12 19V5" />
      <path d="M19 19v-7" />
    </svg>
  );
}

function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7 7 0 0 0-.1-1.1l2-1.6-2-3.5-2.4 1a7.1 7.1 0 0 0-1.9-1.1L14 2h-4l-.6 2.8a7.1 7.1 0 0 0-1.9 1.1l-2.4-1-2 3.5 2 1.6A7 7 0 0 0 5 12a7 7 0 0 0 .1 1.1l-2 1.6 2 3.5 2.4-1a7.1 7.1 0 0 0 1.9 1.1L10 22h4l.6-2.8a7.1 7.1 0 0 0 1.9-1.1l2.4 1 2-3.5-2-1.6c.1-.3.1-.7.1-1.1Z" />
    </svg>
  );
}

function UploadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}
