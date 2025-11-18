"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Flame, LayoutDashboard, Sparkles, Waves } from "lucide-react";
import type { Blueprint, GenerationInput, PrimaryGoal } from "@/lib/generator";
import { buildBlueprint } from "@/lib/generator";
import { trendClusters, goalToAngle, durationBuckets } from "@/lib/trendData";

const goalOptions: { value: PrimaryGoal; label: string }[] = [
  { value: "retention", label: "Retention spike" },
  { value: "subscribers", label: "Subscriber growth" },
  { value: "monetization", label: "Monetization ready" },
  { value: "virality", label: "Go breakout" },
  { value: "authority", label: "Authority builder" },
];

const vibeOptions: { value: GenerationInput["vibe"]; label: string }[] = [
  { value: "high-energy", label: "High energy" },
  { value: "cinematic", label: "Cinematic" },
  { value: "mentor", label: "Mentor" },
  { value: "comedic", label: "Comedic" },
  { value: "contrarian", label: "Contrarian" },
];

const defaultState: GenerationInput = {
  topic: "AI automations for broke solopreneurs",
  audience: "Busy creators who burn out editing",
  goal: "retention",
  duration: "45",
  vibe: "high-energy",
  proofAsset: "Screen-recorded analytics showing 92% hold",
  blocker: "They think AI makes content feel soulless",
};

export function ShortsAgent() {
  const [form, setForm] = useState<GenerationInput>(defaultState);
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const trendHighlights = useMemo(() => {
    return trendClusters.slice(0, 3);
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Slight delay for UX delight
    setTimeout(() => {
      const result = buildBlueprint(form);
      setBlueprint(result);
      setIsGenerating(false);
    }, 280);
  };

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-8 px-6 pb-24 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
      <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/5/80 p-6 shadow-[0_20px_45px_-28px_rgba(59,130,246,0.45)] backdrop-blur">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-200/80">Blueprint inputs</p>
          <h2 className="text-2xl font-semibold text-white">Describe the Short you want</h2>
          <p className="text-sm text-slate-300">
            Blend your angle with the trend highlights. The agent fuses them into a retention-optimized script.
          </p>
        </header>

        <div className="space-y-6 text-sm">
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-wide text-slate-300">Topic</span>
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-400/40"
              value={form.topic}
              onChange={(event) => setForm((prev) => ({ ...prev, topic: event.target.value }))}
              placeholder="What is the Short about?"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-wide text-slate-300">Audience snapshot</span>
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-400/40"
              value={form.audience}
              onChange={(event) => setForm((prev) => ({ ...prev, audience: event.target.value }))}
              placeholder="Who is watching?"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-wide text-slate-300">Primary goal</span>
            <select
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-400/40"
              value={form.goal}
              onChange={(event) => setForm((prev) => ({ ...prev, goal: event.target.value as PrimaryGoal }))}
            >
              {goalOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-900 text-sm text-white">
                  {option.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-400">{goalToAngle[form.goal]}</p>
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-wide text-slate-300">Delivery vibe</span>
            <div className="grid grid-cols-2 gap-2">
              {vibeOptions.map((option) => {
                const isActive = form.vibe === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, vibe: option.value }))}
                    className={`rounded-xl border px-4 py-3 text-left text-xs font-semibold transition ${
                      isActive
                        ? "border-accent-400 bg-accent-500/20 text-white"
                        : "border-white/10 bg-slate-900/60 text-slate-300 hover:border-accent-400/60"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-wide text-slate-300">Duration focus</span>
            <div className="flex items-center gap-3">
              {["30", "45", "60"].map((value) => {
                const isActive = form.duration === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, duration: value as GenerationInput["duration"] }))}
                    className={`flex-1 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "border-accent-400 bg-accent-500/20 text-white"
                        : "border-white/10 bg-slate-900/60 text-slate-300 hover:border-accent-400/60"
                    }`}
                  >
                    {value}s
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-400">{durationBuckets[form.duration]}</p>
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-wide text-slate-300">Proof or asset</span>
            <textarea
              className="h-20 w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-400/40"
              value={form.proofAsset ?? ""}
              onChange={(event) => setForm((prev) => ({ ...prev, proofAsset: event.target.value }))}
              placeholder="Analytics screenshot, testimonial, before/after..."
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-wide text-slate-300">Biggest blocker</span>
            <textarea
              className="h-20 w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-400/40"
              value={form.blocker ?? ""}
              onChange={(event) => setForm((prev) => ({ ...prev, blocker: event.target.value }))}
              placeholder="What's stopping people right now?"
            />
          </label>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !form.topic.trim() || !form.audience.trim()}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent-600 via-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_-22px_rgba(236,72,153,0.8)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Sparkles className="h-4 w-4" />
            {isGenerating ? "Crafting blueprint…" : "Generate viral blueprint"}
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 text-xs text-slate-300">
          <p className="font-semibold text-slate-100">Pulse tracker</p>
          <ul className="mt-2 space-y-2">
            {trendHighlights.map((trend) => (
              <li key={trend.niche} className="flex items-start gap-3">
                <Flame className="mt-0.5 h-4 w-4 text-accent-400" />
                <div>
                  <p className="font-medium text-white">{trend.niche}</p>
                  <p className="text-slate-400">{trend.angle}</p>
                  <p className="text-[11px] text-slate-500">{trend.dataPoint}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="space-y-6">
        {!blueprint ? (
          <EmptyState />
        ) : (
          <BlueprintView blueprint={blueprint} />
        )}
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-slate-900/20 p-12 text-center text-slate-300">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/20 text-accent-200">
        <Waves className="h-7 w-7" />
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-white">Feed the agent your angle</h3>
      <p className="mt-3 max-w-md text-sm text-slate-400">
        Describe the hook, goal, and vibe. You&apos;ll get a Shorts blueprint tailored to your audience with hooks, beats, delivery cues, and remix ideas.
      </p>
    </div>
  );
}

function BlueprintView({ blueprint }: { blueprint: Blueprint }) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-transparent p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-accent-200/80">Viral concept</p>
            <h2 className="text-3xl font-semibold text-white">{blueprint.conceptName}</h2>
          </div>
          <div className="gradient-border">
            <div className="rounded-[16px] bg-slate-950/60 px-5 py-3 text-xs text-slate-200">
              {blueprint.positioning}
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {blueprint.metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs uppercase text-slate-400">{metric.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
              <p className="mt-2 text-xs text-slate-400">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/60 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            <Sparkles className="h-5 w-5 text-accent-300" />
            Hook matrix
          </h3>
          <ul className="space-y-3 text-sm text-slate-200">
            {blueprint.hookOptions.map((hook) => (
              <li key={hook} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                {hook}
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm text-accent-200">
            Opening shot: {blueprint.coldOpen}
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/60 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            <LayoutDashboard className="h-5 w-5 text-accent-300" />
            Beat timeline
          </h3>
          <p className="text-xs uppercase tracking-wide text-slate-400">{blueprint.pacingMap}</p>
          <ul className="space-y-3 text-sm text-slate-200">
            {blueprint.scriptBeats.map((beat) => (
              <li key={beat.marker} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-accent-200/80">
                  <span>{beat.headline}</span>
                  <span>{beat.marker}</span>
                </div>
                <p className="mt-2 text-slate-200">{beat.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/60 p-6 text-sm text-slate-200">
          <h3 className="text-lg font-semibold text-white">Delivery engine</h3>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Visual direction</p>
            <ul className="mt-2 space-y-2">
              {blueprint.visualDirection.map((item) => (
                <li key={item} className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Sound cadence</p>
            <p className="mt-1 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-accent-200">
              {blueprint.soundDirection}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Retention moves</p>
            <ul className="mt-2 space-y-2">
              {blueprint.retentionMoves.map((move) => (
                <li key={move} className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2">
                  {move}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/60 p-6 text-sm text-slate-200">
          <h3 className="text-lg font-semibold text-white">Launch assets</h3>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Caption copy</p>
            <p className="mt-2 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-slate-200">
              {blueprint.caption}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Thumbnail prompt</p>
            <p className="mt-2 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-slate-200">
              {blueprint.thumbnailPrompt}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Proof to flash</p>
            <p className="mt-2 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-slate-200">
              {blueprint.proofAsset}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">CTA</p>
            <p className="mt-2 rounded-xl border border-accent-400/30 bg-accent-500/10 px-4 py-3 text-accent-100">
              {blueprint.callToAction}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 text-sm text-slate-200">
          <h3 className="text-lg font-semibold text-white">Hashtag mix</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {blueprint.hashtags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 text-sm text-slate-200">
          <h3 className="text-lg font-semibold text-white">Remix play</h3>
          <p className="mt-2 text-slate-200">{blueprint.remixIdea}</p>
          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent-200"
            onClick={() => navigator?.clipboard?.writeText(blueprint.remixIdea)}
          >
            Copy remix idea <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
