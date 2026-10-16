
const features = [
  {
    number: "01",
    title: "Smart URL Shortening",
    description:
      "Turn long, complicated URLs into short, shareable links that are easy to manage.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI-Powered Safety Analysis",
    description:
      "Analyze submitted URLs with AI to identify potential risks and provide a safety assessment.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Click Tracking",
    description:
      "Track link engagement with click counts and understand how often your shortened URLs are visited.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-5 5" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Personal Dashboard",
    description:
      "Manage your shortened URLs from one place, with account-based access to your links.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
];

const technologies = [
  "React",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Google Gemini AI",
];

const About = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-200 dark:bg-slate-950">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(148 163 184 / 0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 65% 45% at 50% 0%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 45% at 50% 0%, black 40%, transparent 90%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-32 h-112 w-2xl -translate-x-1/2 rounded-full bg-teal-400/30 blur-[110px] dark:bg-teal-500/20"
      />

      <main className="relative px-4 py-16 sm:px-6 sm:py-24">
        {/* Hero */}
        <section className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-800/20 bg-teal-800/5 px-3.5 py-1.5 text-xs font-medium text-teal-800 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-300">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.64 5.64l2.12 2.12m8.48 8.48 2.12 2.12m0-12.72-2.12 2.12m-8.48 8.48-2.12 2.12" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            About Our Platform
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-6xl">
            Short links.
            <br />
            <span className="bg-linear-to-r from-teal-700 via-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-teal-300 dark:via-teal-200 dark:to-cyan-300">
              Smarter decisions.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
            We combine simple URL management with AI-powered safety analysis
            to help users make more informed decisions before sharing links.
          </p>
        </section>

        {/* Mission card */}
        <section className="mx-auto mt-16 max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-slate-300 bg-white/80 p-7 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 sm:p-10">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-400/15 blur-3xl"
            />

            <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
                  Our Mission
                </p>

                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
                  Make every link easier to manage and understand.
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                  Long URLs can be difficult to share and organize, while
                  unfamiliar links can raise security concerns. Our platform
                  brings link shortening, AI-assisted risk analysis and click
                  tracking together in one simple experience.
                </p>
              </div>

              <div className="rounded-2xl border border-teal-800/10 bg-teal-800/5 p-6 dark:border-teal-300/10 dark:bg-teal-300/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-800 text-white shadow-md shadow-teal-900/20 dark:bg-teal-300 dark:text-teal-950">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3 4 7v5c0 5 3.5 8 8 10 4.5-2 8-5 8-10V7l-8-4Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-slate-50">
                  Safety-aware linking
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Understand potential URL risks with an AI-generated
                  assessment before deciding whether to trust a link.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto mt-20 max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
              What We Offer
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
              Built for smarter link management
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              Useful tools that bring link management, insights and
              AI-assisted risk assessment into one place.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="group relative overflow-hidden rounded-2xl border border-slate-300 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/80 sm:p-7"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-teal-400/10 blur-2xl transition group-hover:bg-teal-400/20"
                />

                <div className="relative flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-800 text-white shadow-md shadow-teal-900/20 dark:bg-teal-300 dark:text-teal-950">
                    {feature.icon}
                  </div>

                  <span className="text-sm font-medium text-slate-400 dark:text-slate-600">
                    {feature.number}
                  </span>
                </div>

                <h3 className="relative mt-5 text-lg font-semibold text-slate-900 dark:text-slate-50">
                  {feature.title}
                </h3>

                <p className="relative mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Technology stack */}
        <section className="mx-auto mt-20 max-w-5xl">
          <div className="rounded-3xl border border-slate-300 bg-white/80 p-7 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 sm:p-10">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
                Under The Hood
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
                Powered by modern technology
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                Built with a modern full-stack architecture and AI
                integration for a responsive link management experience.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-xl border border-teal-800/15 bg-teal-800/5 px-4 py-2.5 text-sm font-medium text-teal-900 transition hover:border-teal-700/30 hover:bg-teal-800/10 dark:border-teal-300/15 dark:bg-teal-300/5 dark:text-teal-200 dark:hover:bg-teal-300/10"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Responsible AI note */}
        <section className="mx-auto mt-8 max-w-5xl">
          <div className="flex items-start gap-4 rounded-2xl border border-slate-300 bg-white/60 p-5 dark:border-slate-800 dark:bg-slate-900/50 sm:p-6">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-800/10 text-teal-800 dark:bg-teal-300/10 dark:text-teal-300">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4m0-4h.01" />
              </svg>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                A note on link safety
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                AI assessments can help identify potential risks, but they
                are not a guarantee that a URL is safe or malicious. Always
                use caution with unfamiliar links.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
