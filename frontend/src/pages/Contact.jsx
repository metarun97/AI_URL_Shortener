
import { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Connect your contact API here before production use.
    toast.info("Contact form API is not connected yet.");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-200 dark:bg-slate-950">
      {/* Decorative dotted background */}
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

      {/* Teal glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-32 h-112 w-2xl -translate-x-1/2 rounded-full bg-teal-400/30 blur-[110px] dark:bg-teal-500/20"
      />

      <main className="relative px-4 py-16 sm:px-6 sm:py-24">
        {/* Heading */}
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
              <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
            </svg>
            Get In Touch
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-6xl">
            Let's start a
            <br />
            <span className="bg-linear-to-r from-teal-700 via-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-teal-300 dark:via-teal-200 dark:to-cyan-300">
              conversation.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
            Have a question, found an issue, or want to share feedback?
            We'd love to hear from you.
          </p>
        </section>

        {/* Contact content */}
        <section className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          {/* Left information panel */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-300 bg-white/80 p-7 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 sm:p-9">
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-teal-400/15 blur-3xl"
            />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
                Contact Information
              </p>

              <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-slate-50">
                How can we help?
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Send us your questions, suggestions, or feedback about
                the AI URL Shortener.
              </p>

              <div className="mt-9 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white dark:bg-teal-300 dark:text-teal-950">
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
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">
                      Email Support
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      Have a question or need help? Use the contact form
                      to send us a message.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white dark:bg-teal-300 dark:text-teal-950">
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
                      <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">
                      Security Feedback
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      Share feedback about URL risk assessments or
                      report unexpected behavior.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white dark:bg-teal-300 dark:text-teal-950">
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
                      <path d="m16 18 6-6-6-6" />
                      <path d="m8 6-6 6 6 6" />
                      <path d="m14 4-4 16" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-100">
                      Suggestions
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      Have an idea to improve the platform? Let us know.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-9 rounded-2xl border border-teal-800/10 bg-teal-800/5 p-5 dark:border-teal-300/10 dark:bg-teal-300/5">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Your feedback matters.
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Your suggestions can help make link management
                  simpler and more useful.
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-3xl border border-slate-300 bg-white/80 p-7 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 sm:p-9">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Send us a message
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Fill out the form below and tell us what's on your mind.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-teal-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={254}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-teal-300"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Subject
                </label>

                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-teal-300"
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="URL Safety Feedback">URL Safety Feedback</option>
                  <option value="Feature Suggestion">Feature Suggestion</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Tell us how we can help..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={3000}
                  className="w-full resize-y rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-teal-300"
                />

                <p className="mt-2 text-right text-xs text-slate-400">
                  {formData.message.length}/3000 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-800 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-900/15 transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-600/20 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-teal-300 dark:text-teal-950 dark:hover:bg-teal-200"
              >
                {isSubmitting ? "Sending..." : "Send Message"}

                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>

              <p className="text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
                Please do not include passwords or other sensitive
                information in your message.
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
