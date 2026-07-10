type NoticeProps = {
  type: "success" | "error";
  title: string;
  message: string;
};

export function Notice({ type, title, message }: NoticeProps) {
  const toneClasses = {
    success: "border-emerald-500/60 bg-emerald-500/10 text-emerald-300",
    error: "border-rose-500/60 bg-rose-500/10 text-rose-300",
  };

  return (
    <div className={`rounded-2xl border px-4 py-3 ${toneClasses[type]}`} role="status">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm opacity-90">{message}</p>
    </div>
  );
}
