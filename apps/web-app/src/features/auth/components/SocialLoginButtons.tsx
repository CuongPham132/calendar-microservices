export function SocialLoginButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button type="button" disabled className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-400 cursor-not-allowed">Google</button>
      <button type="button" disabled className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-400 cursor-not-allowed">GitHub</button>
    </div>
  );
}