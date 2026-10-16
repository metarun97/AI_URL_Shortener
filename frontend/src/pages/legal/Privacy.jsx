import { Link } from "react-router";


const Privacy = () => {
  const updatedDate = "October 16, 2026";

  const sections = [
    {
      title: "1. Information We Collect",
      content:
        "When you create an account or use AI URL Shortener, we may process information such as your name or email address if collected during registration, the URLs you submit, generated short links, click statistics, and information necessary to operate and secure the service.",
    },
    {
      title: "2. How We Use Your Information",
      content:
        "We use information to create and manage your account, generate short URLs, analyze submitted URLs for potential security risks, display click statistics, maintain the service, and investigate abuse or technical issues.",
    },
    {
      title: "3. URL Safety Analysis and AI",
      content:
        "When you submit a URL for safety analysis, relevant URL information may be sent to Google Gemini or another configured AI provider to generate a risk assessment. AI results can be inaccurate or incomplete and should not be treated as a guarantee that a URL is safe or malicious. Review the relevant provider's privacy terms for details about its data handling.",
    },
    {
      title: "4. Cookies and Authentication",
      content:
        "Our service may use an HTTP-only authentication cookie to keep you signed in. Authentication cookies help the application recognize your session. You can manage cookies through your browser, but disabling them may prevent some features from working correctly.",
    },
    {
      title: "5. Data Storage and Service Providers",
      content:
        "Information may be stored in our configured database, such as MongoDB Atlas, and processed by service providers needed to run the application. Depending on the deployed configuration, infrastructure, hosting, logging, or AI providers may process relevant technical or application data.",
    },
    {
      title: "6. Data Security",
      content:
        "We use reasonable measures intended to protect information and the service. However, no internet transmission or storage system can be guaranteed to be completely secure.",
    },
    {
      title: "7. Data Retention and Deletion",
      content:
        "Information may be retained for as long as necessary to provide the service, maintain security, meet applicable legal obligations, and resolve disputes. If you want to request access to or deletion of your account information, contact the service operator. Deletion may be subject to legal or operational requirements.",
    },
    {
      title: "8. Your Choices",
      content:
        "You can choose which URLs you submit and may stop using the service at any time. You can also manage browser cookies. Depending on applicable law and your circumstances, you may have additional rights regarding your personal information.",
    },
    {
      title: "9. Children's Privacy",
      content:
        "The service is not intended for children who are not permitted to use it under applicable law. If you believe a child has provided personal information inappropriately, contact the service operator.",
    },
    {
      title: "10. Changes to This Policy",
      content:
        "We may update this Privacy Policy as the service changes. Updates will be published on this page with a revised date.",
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
      <div className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-sm font-semibold text-teal-700 dark:text-teal-300">
            <span className="h-2 w-2 rounded-full bg-teal-500" />
            Your privacy matters
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Privacy{" "}
            <span className="text-teal-600 dark:text-teal-400">
              Policy
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
            Learn how AI URL Shortener handles information when you create
            short links, analyze URLs, and use your dashboard.
          </p>

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-500">
            Last updated: {updatedDate}
          </p>
        </div>

        {/* Intro */}
        <section className="mb-6 rounded-3xl border border-teal-500/20 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:bg-slate-900/70 dark:shadow-black/10 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-500/10 text-2xl">
              🔒
            </div>

            <div>
              <h2 className="text-xl font-bold">
                About this policy
              </h2>
              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                This policy explains the information that may be processed
                when you use our URL shortening and AI-based URL analysis
                features. Please make sure you understand how your submitted
                URLs and account information are handled before using the
                service.
              </p>
            </div>
          </div>
        </section>

        {/* Policy Sections */}
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
          <h2 className="text-xl font-bold">Questions about privacy?</h2>

          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
            If you have a question about how your information is handled,
            please get in touch through our contact page.
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

export default Privacy;
