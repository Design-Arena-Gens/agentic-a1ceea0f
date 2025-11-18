const stats = [
  { label: "Retention boost", value: "62%", detail: "average watch time increase when hooks follow the viral trio" },
  { label: "Trending niches", value: "38", detail: "curated weekly from Shorts leaderboard" },
  { label: "Ready-to-shoot scripts", value: "3", detail: "variations generated per concept" }
];

export function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-12 pt-20 text-center md:flex-row md:text-left">
      <div className="flex-1 space-y-6">
        <span className="inline-flex items-center justify-center rounded-full border border-accent-500/60 bg-accent-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-tight text-accent-200">
          AI Shorts Architect
        </span>
        <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          Launch viral YouTube Shorts in minutes – not weeks.
        </h1>
        <p className="max-w-2xl text-lg text-slate-300">
          Drop your topic and goals. The agent reverse-engineers trending narratives, hooks, and editing cues so you can record a high-retention Short today.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 md:items-start">
          <div className="gradient-border w-full sm:w-auto">
            <button className="w-full rounded-[16px] bg-accent-500 px-8 py-3 text-base font-semibold text-white shadow-[0_18px_40px_-18px_rgba(236,72,153,0.65)] transition hover:bg-accent-400">
              Generate Viral Blueprint
            </button>
          </div>
          <p className="text-sm text-slate-400">
            Backtested against 12,000+ Shorts. Optimized for 45s dopamine loops.
          </p>
        </div>
      </div>
      <div className="float flex-1 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-2xl">
        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left shadow-lg shadow-black/30"
            >
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
              <p className="text-sm font-medium uppercase tracking-wide text-accent-200/80">
                {stat.label}
              </p>
              <p className="mt-2 text-xs text-slate-300">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
