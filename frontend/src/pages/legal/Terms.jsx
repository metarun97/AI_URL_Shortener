import { Link } from "react-router";


const Terms = () => {
  const updatedDate = "October 16, 2026";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing or using AI URL Shortener, you agree to these Terms of Service. If you do not agree, please discontinue using the service.",
    },
    {
      title: "2. Using the Service",
      content:
        "AI URL Shortener allows users to create shortened links, review AI-generated URL risk assessments, and view available click statistics. Features may change as the application develops.",
    },
    {
      title: "3. Account Responsibilities",
      content:
        "If you create an account, you are responsible for providing accurate registration information and taking reasonable steps to protect your login credentials. You should notify the service operator if you suspect unauthorized access to your account.",
    },
    {
      title: "4. Acceptable Use",
      content:
        "You must not use the service to distribute phishing links, facilitate fraud, spread malware, violate another person's rights, engage in unlawful activity, or abuse the service. Do not attempt to bypass security measures, interfere with the application, or access another user's private data without authorization.",
    },
    {
      title: "5. Shortened URLs and Third-Party Websites",
      content:
        "A shortened URL may redirect you to a website operated by a third party. We do not control the content, availability, security, or privacy practices of external websites. Check a destination carefully before opening it or providing information.",
    },
    {
      title: "6. AI Risk Assessments",
      content:
        "AI-generated safety assessments are informational and may be incomplete, incorrect, or outdated. A low-risk result does not guarantee that a URL is safe, and a high-risk result does not independently prove malicious intent. You remain responsible for evaluating links and deciding whether to open them.",
    },
    {
      title: "7. Click Statistics",
      content:
        "Click counts and related statistics are provided for informational purposes. Counts may be affected by repeated visits, automated traffic, caching, technical failures, or other measurement limitations. We do not guarantee that statistics will always be complete or exact.",
    },
    {
      title: "8. Availability and Changes",
      content:
        "We aim to keep the service useful and available, but we do not guarantee uninterrupted operation. Features, limits, or availability may change, and maintenance or technical problems may temporarily affect access.",
    },
    {
      title: "9. Intellectual Property",
      content:
        "The application's design, branding, and original software components may be protected by applicable intellectual property laws. These Terms do not transfer ownership of those materials to you. You remain responsible for ensuring you have the rights needed to submit or share content through the service.",
    },
    {
      title: "10. Disclaimer and Limitation of Liability",
      content:
        "To the extent permitted by applicable law, the service is provided on an as-available basis without a guarantee that every feature or AI assessment will be accurate, secure, or uninterrupted. Nothing in these Terms excludes liability that cannot legally be excluded under applicable law.",
    },
    {
      title: "11. Suspension and Termination",
      content:
        "Access may be restricted where reasonably necessary to address suspected abuse, security risks, unlawful activity, or a violation of these Terms, subject to applicable law and the service's actual capabilities.",
    },
    {
      title: "12. Changes to These Terms",
      content:
        "These Terms may be updated as the application evolves. The latest version will be published on this page with an updated date. Continued use after an update may be subject to the revised Terms, as permitted by applicable law.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-sm font-semibold text-teal-700 dark:text-teal-300">
            <span className="h-2 w-2 rounded-full bg-teal-500" />
            Clear and responsible use
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Terms of{" "}
            <span className="text-teal-600 dark:text-teal-400">
              Service
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
            These terms explain the responsibilities and conditions that
            apply when you use AI URL Shortener.
          </p>

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-500">
            Last updated: {updatedDate}
          </p>
        </div>

        {/* Intro */}
        <section className="mb-6 rounded-3xl border border-teal-500/20 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:bg-slate-900/70 dark:shadow-black/10 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-500/10 text-2xl">
              📋
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Use the service responsibly
              </h2>

              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                These terms are intended to help users understand how the
                service works and what is expected when creating, sharing,
                or opening shortened links.
              </p>
            </div>
          </div>
        </section>

        {/* Terms Sections */}
        <div className="space-y-5">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-colors hover:border-teal-500/30 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/10 sm:p-8"
            >
              <h2 className="text-lg font-bold tracking-tight sm:text-xl">
                {section.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        {/* Contact */}
        <section className="mt-8 rounded-3xl border border-teal-500/20 bg-linear-to-br from-teal-500/10 to-cyan-500/5 p-6 sm:p-8">
          <h2 className="text-xl font-bold">Need clarification?</h2>

          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
            If you have questions about these terms or how the service
            works, please contact us.
          </p>

          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-500"
          >
            Contact us <span aria-hidden="true">→</span>
          </Link>
        </section>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="text-sm font-medium text-teal-700 transition hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Terms;
