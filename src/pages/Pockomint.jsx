import { useEffect } from 'react';
import { motion } from 'framer-motion';

const ImagePlaceholder = ({ label, description, aspectRatio = "aspect-video" }) => (
  <div className={`w-full ${aspectRatio} rounded-2xl md:rounded-3xl bg-surface border-2 border-dashed border-border/70 flex flex-col items-center justify-center p-6 text-center space-y-3 shadow-inner transition-colors hover:border-primary/40 group`}>
    <div className="w-12 h-12 rounded-2xl bg-background border border-border/60 flex items-center justify-center text-text-secondary group-hover:text-primary group-hover:scale-110 transition-all shadow-sm">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    </div>
    <div className="space-y-1 max-w-md">
      <p className="text-sm font-semibold text-primary">{label}</p>
      {description && <p className="text-xs text-text-secondary font-light">{description}</p>}
    </div>
  </div>
);

export default function Pockomint() {
  useEffect(() => {
    document.title = "Pockomint Case Study | Hamza Ziyard";
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-16 space-y-16 md:space-y-24">

        {/* Hero Section */}
        <section className="space-y-12">
          {/* Main Hero Container Card (pajelly.io/aby style) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full rounded-3xl md:rounded-[36px] bg-surface/80 border border-border/60 overflow-hidden p-6 sm:p-12 md:p-16 flex items-center justify-center"
          >
            {/* Subtle Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

            {/* Centered Phone Showcase */}
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px]">
              {/* Subtle Black Phone Frame */}
              <div className="relative rounded-[40px] sm:rounded-[48px] p-2 bg-black border border-zinc-800/80 shadow-2xl">
                <div className="relative aspect-[9/19.5] w-full rounded-[30px] sm:rounded-[38px] overflow-hidden bg-black flex items-center justify-center border border-zinc-900">
                  <video
                    src="https://assets.hamzaziyard.com/projects-for-fun/pockomint/hero.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover rounded-[30px] sm:rounded-[38px]"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Title, Subtitle & Metadata Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <h1 className="text-4xl leading-tight md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
                Pockomint
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-light">
                Designing and building a native iOS app that makes people actually want to track their money
              </p>
            </div>

            <div className="flex flex-wrap justify-start gap-10 md:gap-16 pt-6 border-t border-border/50">
              <div className="space-y-1">
                <h4 className="text-sm text-text-secondary font-medium">Role</h4>
                <p className="text-lg font-bold text-primary">UI/UX Design + SwiftUI Development</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm text-text-secondary font-medium">Platform</h4>
                <p className="text-lg font-bold text-primary">iOS (iPhone & iPad)</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm text-text-secondary font-medium">Timeline</h4>
                <p className="text-lg font-bold text-primary">Concept to App Store launch, including TestFlight beta</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section: The Hook */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-primary shrink-0" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight">The Hook</h2>
          </div>

          <div className="space-y-6 text-lg md:text-xl text-text-secondary leading-relaxed font-light">
            <p>
              Most expense trackers try to disappear. They auto-pull your bank data, quietly log it, and hope you never have to think about money. Pockomint does the opposite. It's built on a simple bet: people build better financial habits when they show up daily, not when an algorithm does it for them.
            </p>
            <p>
              This case study covers how I designed and built Pockomint end to end, from identifying the gap in existing expense trackers, to designing a mascot that carries the brand's meaning without shouting it, to shipping a fully native iOS experience with measurable improvements through beta testing.
            </p>
          </div>

          <figure className="space-y-3 pt-4">
            <div className="overflow-hidden rounded-2xl md:rounded-3xl border border-border/60 bg-surface">
              <img
                src="/pockomint-assets/The Hook.webp"
                alt="Pockomint habit-focused expense tracking interface"
                loading="lazy"
                className="w-full h-auto object-contain"
              />
            </div>
            <figcaption className="text-center text-text-secondary font-medium italic text-sm">
              Core interface built around deliberate daily check-ins
            </figcaption>
          </figure>
        </motion.section>

        {/* Section: The Problem */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-primary shrink-0" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight">The Problem</h2>
          </div>

          <div className="space-y-6 text-lg md:text-xl text-text-secondary leading-relaxed font-light">
            <p>
              Before designing anything, I researched the existing expense tracker landscape to find where these apps were actually failing people.
            </p>
            <p>
              Most competitors lean on automation. They connect to your bank or email, pull transactions automatically, and build your expense picture for you. It sounds convenient, but it creates a quiet trust problem. When the sync misses something or categorizes it wrong, users open the app, see a number that looks fine, and don't realize they've actually overspent. The automation that was supposed to help ends up hiding the truth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 flex space-y-2 flex-col">
              <div className="space-y-4">
                <div className="text-red-500">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m15 9-6 6" />
                    <path d="m9 9 6 6" />
                  </svg>
                </div>
                <h3 className="text-md font-semibold text-primary">
                  Over-Reliance on Passive Automation
                </h3>
              </div>
              <p className="text-text-secondary leading-relaxed font-light">
                Auto-syncing bank data creates a quiet trust problem. When syncs miss transactions or categorize wrong, users assume numbers are fine and overspend without realizing.
              </p>
            </div>

            <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 flex space-y-2 flex-col">
              <div className="space-y-4">
                <div className="text-red-500">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m15 9-6 6" />
                    <path d="m9 9 6 6" />
                  </svg>
                </div>
                <h3 className="text-md font-semibold text-primary">
                  No True Custom Budget Cycles
                </h3>
              </div>
              <p className="text-text-secondary leading-relaxed font-light">
                Most apps offer fixed monthly, quarterly, or biweekly cycles. None let you define a cycle that starts on, say, the 25th, matching an actual salary date. Everyone's income doesn't reset on the 1st.
              </p>
            </div>

            <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 flex space-y-2 flex-col">
              <div className="space-y-4">
                <div className="text-red-500">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m15 9-6 6" />
                    <path d="m9 9 6 6" />
                  </svg>
                </div>
                <h3 className="text-md font-semibold text-primary">
                  No Expense Templates
                </h3>
              </div>
              <p className="text-text-secondary leading-relaxed font-light">
                Recurring expenses had to be re-entered manually every time, in every app I looked at.
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
            Pockomint was designed to close all three gaps at once, with a daily, deliberate check-in model instead of a passive automated one.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <figure className="space-y-3">
              <div className="overflow-hidden rounded-2xl md:rounded-3xl border border-border/60 bg-surface p-3 md:p-4 flex items-center justify-center relative">
                <div className="absolute top-4 left-4 z-10 text-emerald-500">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="16 9 10.5 15 8 12.5" />
                  </svg>
                </div>
                <img
                  src="/pockomint-assets/Add Expense.webp"
                  alt="Deliberate Check-in Add Expense UI"
                  loading="lazy"
                  className="max-h-[480px] md:max-h-[540px] w-full object-contain"
                />
              </div>
              <figcaption className="text-center text-text-secondary font-medium italic text-sm">
                Deliberate daily check-ins
              </figcaption>
            </figure>

            <figure className="space-y-3">
              <div className="overflow-hidden rounded-2xl md:rounded-3xl border border-border/60 bg-surface p-3 md:p-4 flex items-center justify-center relative">
                <div className="absolute top-4 left-4 z-10 text-emerald-500">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="16 9 10.5 15 8 12.5" />
                  </svg>
                </div>
                <img
                  src="/pockomint-assets/Calender Cycles.webp"
                  alt="Custom Budget Cycles UI"
                  loading="lazy"
                  className="max-h-[480px] md:max-h-[540px] w-full object-contain"
                />
              </div>
              <figcaption className="text-center text-text-secondary font-medium italic text-sm">
                Custom salary budget cycles
              </figcaption>
            </figure>

            <figure className="space-y-3">
              <div className="overflow-hidden rounded-2xl md:rounded-3xl border border-border/60 bg-surface p-3 md:p-4 flex items-center justify-center relative">
                <div className="absolute top-4 left-4 z-10 text-emerald-500">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="16 9 10.5 15 8 12.5" />
                  </svg>
                </div>
                <img
                  src="/pockomint-assets/Template.webp"
                  alt="One-Tap Expense Templates UI"
                  loading="lazy"
                  className="max-h-[480px] md:max-h-[540px] w-full object-contain"
                />
              </div>
              <figcaption className="text-center text-text-secondary font-medium italic text-sm">
                One-tap expense templates
              </figcaption>
            </figure>
          </div>
        </motion.section>

        {/* Section: The Design Approach: Habit, Not Automation */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-primary shrink-0" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
              The Design Approach: Habit, Not Automation
            </h2>
          </div>

          <div className="space-y-6 text-lg md:text-xl text-text-secondary leading-relaxed font-light">
            <p>
              Instead of building around automation, I designed Pockomint around a small daily ritual. The app gently notifies users to log their spending each day, and gamifies that consistency with XP, streaks, badges, and levels. For users who don't want the game layer, a Simple Mode toggle strips it back to a clean, no-frills tracker.
            </p>
            <p>
              This meant the core design challenge wasn't "how do we minimize taps to enter an expense," it was "how do we make a daily habit feel rewarding instead of like a chore." That single framing shaped everything downstream, including the mascot.
            </p>
          </div>

          <figure className="space-y-3 pt-4">
            <div className="overflow-hidden rounded-2xl md:rounded-3xl border border-border/60 bg-surface p-2 md:p-4 flex items-center justify-center">
              <img
                src="/pockomint-assets/Daily Habit.webp"
                alt="Daily Habit Loop"
                loading="lazy"
                className="w-full max-h-[750px] md:max-h-[900px] object-contain"
              />
            </div>
            <figcaption className="text-center text-text-secondary font-medium italic text-sm">
              Gamified daily habit loop
            </figcaption>
          </figure>
        </motion.section>

        {/* Section: Meet Pocko */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-primary shrink-0" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
              Meet Pocko: Designing a Mascot with a Hidden Meaning
            </h2>
          </div>

          <div className="space-y-6 text-lg md:text-xl text-text-secondary leading-relaxed font-light">
            <p>
              Early in the project, the team agreed quickly that the mascot should be based on a coin. It made sense: the app is about money, and a coin is instantly legible as a finance symbol. Rather than exploring unrelated directions, we committed to the coin concept early and spent our iteration time refining <em>how</em> that coin became a character, working through multiple stylistic variants before landing on the final design.
            </p>
            <p>
              The result is Pocko, a mascot built directly from Pockomint's own app icon.
            </p>
            <p>
              What makes Pocko work is the layering. At a glance, most people just see a warm, friendly character; they don't consciously register it as a coin at all. But look closer, and the shape, color, and form all trace back to the coin the whole brand is built on. Pocko is designed to read as approachable first and financial second, which is exactly the tone the app needed. Money apps can feel cold and clinical. Pocko makes Pockomint feel like something you'd actually want to open every day.
            </p>
          </div>

          <div className="pt-4">
            <ImagePlaceholder label="[Image Placeholder: Pocko Character Development & Iteration Sheet]" description="Evolution of Pocko from initial app icon coin concepts to final character expressions and states" />
          </div>
        </motion.section>

        {/* Section: Native iOS Components */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-primary shrink-0" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
              Native iOS Components: Design Discipline as a Strategy
            </h2>
          </div>

          <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
            As a two-person team, every design decision had to also be a velocity decision. I made an early call to build Pockomint entirely on native iOS components rather than custom UI, and it paid off in three concrete ways:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Point 1 */}
            <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 flex space-y-2 flex-col">
              <div className="space-y-4">
                <div className="text-primary">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-md font-semibold text-primary">Instant trust and familiarity</h3>
              </div>
              <p className="text-text-secondary leading-relaxed font-light">
                iOS users already know how to use Apple's native patterns. Designing within that system meant Pockomint felt like a natural part of the ecosystem from the first launch, not like a third-party app trying to prove itself.
              </p>
            </div>

            {/* Point 2 */}
            <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 flex space-y-2 flex-col">
              <div className="space-y-4">
                <div className="text-primary">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="4" r="2" />
                    <path d="m18 9-6 1-6-1" />
                    <path d="M12 10v10" />
                    <path d="m8 14 4-2 4 2" />
                  </svg>
                </div>
                <h3 className="text-md font-semibold text-primary">Accessibility came built in</h3>
              </div>
              <p className="text-text-secondary leading-relaxed font-light">
                Apple's native components carry years of accessibility testing and refinement. By designing within that system rather than around it, Pockomint inherited a tested, solid accessibility foundation instead of us having to rebuild those guarantees from scratch.
              </p>
            </div>

            {/* Point 3 */}
            <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 flex space-y-2 flex-col">
              <div className="space-y-4">
                <div className="text-primary">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <h3 className="text-md font-semibold text-primary">Speed of iteration</h3>
              </div>
              <p className="text-text-secondary leading-relaxed font-light">
                This turned out to be the biggest win. When beta feedback came in asking for new variants or adjustments, we weren't fighting a custom design system. Because everything was built on native primitives, we could design, build, and ship feedback-driven changes fast.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <ImagePlaceholder label="[Image Placeholder: Native iOS UI Components & SwiftUI Layouts]" description="Showcase of native HIG component usage, SwiftUI view architecture, and light/dark mode compliance" />
          </div>
        </motion.section>

        {/* Section: Designing for Personalization */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-primary shrink-0" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
              Designing for Personalization
            </h2>
          </div>

          <div className="space-y-8">
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
              Not every user wants the same app, so I designed Pockomint to bend around individual preferences rather than forcing one fixed layout on everyone.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-6 rounded-2xl border border-gray-300 space-y-3">
                <div className="text-primary">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary">Home View</h3>
                <p className="text-sm text-text-secondary font-light leading-relaxed">Customize what matters most right when you launch.</p>
              </div>

              <div className="p-6 rounded-2xl border border-gray-300 space-y-3">
                <div className="text-primary">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" x2="18" y1="20" y2="10" />
                    <line x1="12" x2="12" y1="20" y2="4" />
                    <line x1="6" x2="6" y1="20" y2="14" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary">Analytics</h3>
                <p className="text-sm text-text-secondary font-light leading-relaxed">Focus on breakdowns and insights you actually care about.</p>
              </div>

              <div className="p-6 rounded-2xl border border-gray-300 space-y-3">
                <div className="text-primary">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                    <path d="M8 14h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 18h.01" />
                    <path d="M12 18h.01" />
                    <path d="M16 18h.01" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary">Monthly & Daily Views</h3>
                <p className="text-sm text-text-secondary font-light leading-relaxed">Toggle seamlessly between monthly breakdowns and day-to-day entries.</p>
              </div>

              <div className="p-6 rounded-2xl border border-gray-300 space-y-3">
                <div className="text-primary">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.71 1.7-1.63 0-.44-.18-.85-.46-1.16-.27-.31-.44-.73-.44-1.21 0-.92.78-1.7 1.7-1.7h2.2c2.65 0 4.8-2.15 4.8-4.8 0-5.25-4.48-9.5-9.7-9.5Z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary">Themes & Icons</h3>
                <p className="text-sm text-text-secondary font-light leading-relaxed">Shape color schemes and icons so the app feels uniquely yours.</p>
              </div>
            </div>

            <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
              Designing for this kind of flexibility is harder than designing a single fixed flow. Every customizable surface has to hold together visually no matter what combination a user picks, which meant building with a consistent underlying system rather than one-off screens. It's a detail that's easy to overlook, but it's what makes the app feel considered rather than generic.
            </p>
          </div>

          <div className="pt-4">
            <ImagePlaceholder label="[Image Placeholder: Customization & Personalization Showcase]" description="Home view customization, analytics filtering, custom categories, and theme/icon variants" />
          </div>
        </motion.section>

        {/* Section: Validating the Design */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-primary shrink-0" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
              Validating the Design: Beta Testing on TestFlight
            </h2>
          </div>

          <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
            Pockomint went through structured beta testing using Apple's TestFlight, gathering real feedback across iPhone and iPad from build to build.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Metric 1 */}
            <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 flex space-y-8 flex-col">
              <h3 className="text-md font-semibold text-primary ">Bug Report Reduction</h3>
              <span className="text-4xl md:text-5xl font-bold">
                ↓ 80%
              </span>
              <p className="text-text-secondary leading-relaxed font-light">
                Reported issues dropped sharply between beta build 1 and build 5.
              </p>
            </div>

            {/* Metric 2 */}
            <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 flex space-y-8 flex-col">
              <h3 className="text-md font-semibold text-primary ">App Size Optimization</h3>
              <span className="text-4xl md:text-5xl font-bold">
                80 → 30<span className="text-2xl md:text-3xl font-bold"> MB</span>
              </span>
              <p className=" text-text-secondary leading-relaxed font-light">
                Binary size cut by over 60% without sacrificing features or assets.
              </p>
            </div>

            {/* Metric 3 */}
            <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 flex space-y-8 flex-col">
              <h3 className="text-md font-semibold text-primary ">TestFlight Iterations</h3>
              <span className="text-4xl md:text-5xl font-bold">
                05 <span className="text-2xl md:text-3xl font-bold"> builds</span>
              </span>
              <p className="text-text-secondary leading-relaxed font-light">
                Direct beta UX feedback shaped iPad layouts and UI performance.
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
            This cycle of shipping, collecting real feedback, and iterating quickly is what the native-first foundation was built to support, and it's what let a two-person team ship a polished, accessible product on a tight timeline.
          </p>

          <div className="pt-4">
            <ImagePlaceholder label="[Image Placeholder: TestFlight Beta Feedback & Metrics]" description="Visual representation of TestFlight metrics, iPad layout refinements, and performance build progress" />
          </div>
        </motion.section>

        {/* Section: Beyond the Screen */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-primary shrink-0" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
              Beyond the Screen: Learning App Store Connect
            </h2>
          </div>

          <div className="space-y-6 text-lg md:text-xl text-text-secondary leading-relaxed font-light">
            <p>
              Designing the app was only half the job, getting it in front of people well was the other half. Working solo on the release side of Pockomint meant learning App Store Connect from the ground up: how builds move through review, how versioning and release notes work, and how the whole submission pipeline fits together.
            </p>
            <p>
              The more interesting design challenge turned out to be the App Store presence itself. The preview screenshots and video aren't just documentation, they're the first real impression of the product, often before someone ever opens the app. I treated that page as its own design surface: choosing which screens actually sell the daily habit loop and the Pocko mascot at a glance, sequencing screenshots so they tell a mini story rather than just showing features in order, and making sure the visual language matched the in-app experience so there's no disconnect between the promise and the product.
            </p>
            <p>
              It reframed how I think about design work generally. A great interface can still underperform if the moment someone decides to download it is designed poorly. That handoff between marketing surface and product experience became something I now think about from day one, not as an afterthought at launch.
            </p>
          </div>

          <div className="pt-4">
            <ImagePlaceholder label="[Image Placeholder: App Store Connect & Storefront Assets]" description="App Store screenshots sequence, preview video poster, and product page layout" />
          </div>
        </motion.section>

        {/* Section: Outcome */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-primary shrink-0" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight">Outcome</h2>
          </div>

          <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
            Pockomint launched on the App Store as a fully native iOS app, achieving:
          </p>

          <ul className="space-y-4">
            {[
              "A gamified daily habit loop (XP, streaks, badges, levels) alongside a Simple Mode for users who prefer a minimal experience",
              "Two features not found in researched competitor apps: expense templates and fully custom budget cycles",
              "A custom mascot, Pocko, designed to carry brand meaning without overwhelming the interface",
              "A native-first design system that delivered built-in accessibility and fast, feedback-driven iteration",
              "Measurable quality improvements through beta testing, including a major reduction in build-over-build bugs and app size cut roughly in half"
            ].map((point, index) => (
              <li key={index} className="flex items-start gap-4 text-base md:text-lg text-text-secondary font-light">
                <span className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="pt-6">
            <ImagePlaceholder label="[Image Placeholder: App Store Launch & Final Product Showcase]" description="Hero gallery of final iPhone & iPad App Store screenshots showcasing Pockomint in action" />
          </div>

          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-text-secondary italic">
              Design and SwiftUI development by Hamza Ziyard. Available on the App Store for iPhone and iPad.
            </p>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
