import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import {
  Image as ImageIcon,
  XCircle,
  CheckCircle2,
  ShieldCheck,
  Accessibility,
  Zap,
  LayoutGrid,
  BarChart3,
  Calendar,
  Palette,
  ChevronUp,
  Check,
  Sparkles,
  Code2,
  Cpu,
  Layers
} from 'lucide-react';

const SECTIONS = [
  { id: 'the-hook', title: 'The Hook', num: '01' },
  { id: 'the-problem', title: 'The Problem', num: '02' },
  { id: 'design-approach', title: 'The Design Approach', num: '03' },
  { id: 'meet-pocko', title: 'Meet Pocko', num: '04' },
  { id: 'native-ios', title: 'Native iOS Components', num: '05' },
  { id: 'designing-personalization', title: 'Personalization', num: '06' },
  { id: 'validating-design', title: 'Validating the Design', num: '07' },
  { id: 'building-without-swift', title: 'Building With AI', num: '08' },
  { id: 'beyond-screen', title: 'Beyond the Screen', num: '09' },
  { id: 'outcome', title: 'Outcome', num: '10' },
];

const ImagePlaceholder = ({ label, description, aspectRatio = "aspect-video" }) => (
  <div className={`w-full ${aspectRatio} rounded-2xl md:rounded-3xl bg-surface border-2 border-dashed border-border/70 flex flex-col items-center justify-center p-6 text-center space-y-3 shadow-inner transition-colors hover:border-primary/40 group`}>
    <div className="w-12 h-12 rounded-2xl bg-background border border-border/60 flex items-center justify-center text-text-secondary group-hover:text-primary group-hover:scale-110 transition-all shadow-sm">
      <ImageIcon size={24} />
    </div>
    <div className="space-y-1 max-w-md">
      <p className="text-sm font-semibold text-primary">{label}</p>
      {description && <p className="text-xs text-text-secondary font-light">{description}</p>}
    </div>
  </div>
);

export default function Pockomint() {
  const [activeSection, setActiveSection] = useState('the-hook');
  const [showNav, setShowNav] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    document.title = "Pockomint Case Study | Hamza Ziyard";
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle floating navigation bar visibility when scrolled past hero section
      const heroElement = document.getElementById('the-hook');
      if (heroElement) {
        setShowNav(window.scrollY >= heroElement.offsetTop - 300);
      } else {
        setShowNav(window.scrollY > 300);
      }

      if (isScrollingRef.current) return;
      const sectionElements = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 250;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el.offsetTop <= scrollPosition) {
          setActiveSection(el.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      isScrollingRef.current = true;
      setActiveSection(id);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const activeSectionIdx = SECTIONS.findIndex(s => s.id === activeSection);
  const currentSectionObj = SECTIONS[activeSectionIdx >= 0 ? activeSectionIdx : 0];

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-16 space-y-12 md:space-y-16">

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
              <div className="flex items-center gap-4 md:gap-5">
                <img
                  src="/pockomint-assets/Light_Logo.webp"
                  alt="Pockomint Logo"
                  className="w-12 h-12 md:w-16 md:h-16 block dark:hidden object-contain rounded-2xl shadow-sm border border-border/40"
                />
                <img
                  src="/pockomint-assets/Dark_Logo.webp"
                  alt="Pockomint Logo"
                  className="w-12 h-12 md:w-16 md:h-16  hidden dark:block object-contain rounded-2xl shadow-sm border border-border/40"
                />
                <h1 className="text-4xl leading-tight md:text-5xl font-bold tracking-tight text-primary">
                  Pockomint
                </h1>
              </div>
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

        {/* Floating Minimal Pill Navigation with Section Counter & Dropdown Popover */}
        <AnimatePresence>
          {showNav && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50"
            >
              {/* Dropdown Popover Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-72 max-h-80 overflow-y-auto no-scrollbar bg-zinc-900/95 text-white border border-white/15 dark:bg-zinc-100/95 dark:text-zinc-900 dark:border-zinc-300 p-2 rounded-2xl shadow-2xl backdrop-blur-2xl space-y-1"
                  >
                    {SECTIONS.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => {
                          scrollToSection(section.id);
                          setIsDropdownOpen(false);
                        }}
                        className={clsx(
                          "w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-between cursor-pointer",
                          activeSection === section.id
                            ? "bg-white text-black dark:bg-zinc-900 dark:text-white font-semibold shadow-sm"
                            : "text-zinc-300 hover:text-white hover:bg-white/10 dark:text-zinc-700 dark:hover:text-zinc-900 dark:hover:bg-black/5"
                        )}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className={clsx("text-[11px]", activeSection === section.id ? "text-black/60 dark:text-white/60" : "text-zinc-500 dark:text-zinc-400")}>
                            {section.num}
                          </span>
                          <span className="truncate">{section.title}</span>
                        </div>
                        {activeSection === section.id && <Check size={14} className="shrink-0 text-black dark:text-white" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Floating Trigger Pill */}
              <button
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className="bg-zinc-900/95 hover:bg-zinc-900 text-white border border-white/15 dark:bg-zinc-100/95 dark:hover:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-300 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-2xl flex items-center gap-3 cursor-pointer group transition-all active:scale-95"
              >
                <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-[11px] font-bold text-zinc-200 dark:bg-black/10 dark:text-zinc-800">
                  {currentSectionObj?.num || '01'} / 10
                </span>
                <span className="text-xs sm:text-sm font-medium max-w-[150px] sm:max-w-[200px] truncate text-white dark:text-zinc-900">
                  {currentSectionObj?.title || 'The Hook'}
                </span>
                <ChevronUp
                  size={16}
                  className={clsx("text-zinc-400 transition-transform duration-300 group-hover:text-white dark:text-zinc-500 dark:group-hover:text-zinc-900", isDropdownOpen && "rotate-180")}
                />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Case Study Sections Container */}
        <main className="space-y-16 md:space-y-24">

            {/* Section 1: The Hook */}
            <motion.section
              id="the-hook"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-8 scroll-mt-28"
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

            {/* Section 2: The Problem */}
            <motion.section
              id="the-problem"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-8 scroll-mt-28"
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
                <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-2 flex-col">
                  <div className="space-y-4">
                    <XCircle size={36} className="text-red-500" />
                    <h3 className="text-md font-semibold text-primary">
                      Over-Reliance on Passive Automation
                    </h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed font-light">
                    Auto-syncing bank data creates a quiet trust problem. When syncs miss transactions or categorize wrong, users assume numbers are fine and overspend without realizing.
                  </p>
                </div>

                <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-2 flex-col">
                  <div className="space-y-4">
                    <XCircle size={36} className="text-red-500" />
                    <h3 className="text-md font-semibold text-primary">
                      No True Custom Budget Cycles
                    </h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed font-light">
                    Most apps offer fixed monthly, quarterly, or biweekly cycles. None let you define a cycle that starts on, say, the 25th, matching an actual salary date. Everyone's income doesn't reset on the 1st.
                  </p>
                </div>

                <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-2 flex-col">
                  <div className="space-y-4">
                    <XCircle size={36} className="text-red-500" />
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
                      <CheckCircle2 size={36} />
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
                      <CheckCircle2 size={36} />
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
                      <CheckCircle2 size={36} />
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

            {/* Section 3: The Design Approach */}
            <motion.section
              id="design-approach"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-8 scroll-mt-28"
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

            {/* Section 4: Meet Pocko */}
            <motion.section
              id="meet-pocko"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-8 scroll-mt-28"
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

              <figure className="space-y-3 pt-4">
                <div className="overflow-hidden rounded-2xl md:rounded-3xl border border-border/60 bg-surface p-3 md:p-4 flex items-center justify-center relative">
                  <div className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-md border border-border/60 rounded-full px-3.5 py-1.5 text-xs text-text-secondary shadow-sm">
                    Illustrations drawn by{' '}
                    <a
                      href="https://www.linkedin.com/in/chamudirw/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-primary font-medium text-blue-500"
                    >
                      Chamdi RW
                    </a>
                  </div>
                  <img
                    src="/pockomint-assets/pocko.webp"
                    alt="Pocko character development and expressions"
                    loading="lazy"
                    className="w-full max-h-[750px] md:max-h-[900px] object-contain"
                  />
                </div>
                <figcaption className="text-center text-text-secondary font-medium italic text-sm">
                  Evolution of Pocko character expressions and states
                </figcaption>
              </figure>
            </motion.section>

            {/* Section 5: Native iOS Components */}
            <motion.section
              id="native-ios"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-8 scroll-mt-28"
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
                <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-2 flex-col">
                  <div className="space-y-4">
                    <ShieldCheck size={36} className="text-primary" />
                    <h3 className="text-md font-semibold text-primary">Instant trust and familiarity</h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed font-light">
                    iOS users already know how to use Apple's native patterns. Designing within that system meant Pockomint felt like a natural part of the ecosystem from the first launch, not like a third-party app trying to prove itself.
                  </p>
                </div>

                {/* Point 2 */}
                <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-2 flex-col">
                  <div className="space-y-4">
                    <Accessibility size={36} className="text-primary" />
                    <h3 className="text-md font-semibold text-primary">Accessibility came built in</h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed font-light">
                    Apple's native components carry years of accessibility testing and refinement. By designing within that system rather than around it, Pockomint inherited a tested, solid accessibility foundation instead of us having to rebuild those guarantees from scratch.
                  </p>
                </div>

                {/* Point 3 */}
                <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-2 flex-col">
                  <div className="space-y-4">
                    <Zap size={36} className="text-primary" />
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

            {/* Section 6: Designing for Personalization */}
            <motion.section
              id="designing-personalization"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-8 scroll-mt-28"
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
                  <div className="p-6 rounded-2xl border border-gray-300 dark:border-zinc-800 space-y-3">
                    <LayoutGrid size={28} className="text-primary" />
                    <h3 className="font-semibold text-primary">Home View</h3>
                    <p className="text-sm text-text-secondary font-light leading-relaxed">Customize what matters most right when you launch.</p>
                  </div>

                  <div className="p-6 rounded-2xl border border-gray-300 dark:border-zinc-800 space-y-3">
                    <BarChart3 size={28} className="text-primary" />
                    <h3 className="font-semibold text-primary">Analytics</h3>
                    <p className="text-sm text-text-secondary font-light leading-relaxed">Focus on breakdowns and insights you actually care about.</p>
                  </div>

                  <div className="p-6 rounded-2xl border border-gray-300 dark:border-zinc-800 space-y-3">
                    <Calendar size={28} className="text-primary" />
                    <h3 className="font-semibold text-primary">Monthly & Daily Views</h3>
                    <p className="text-sm text-text-secondary font-light leading-relaxed">Toggle seamlessly between monthly breakdowns and day-to-day entries.</p>
                  </div>

                  <div className="p-6 rounded-2xl border border-gray-300 dark:border-zinc-800 space-y-3">
                    <Palette size={28} className="text-primary" />
                    <h3 className="font-semibold text-primary">Themes & Icons</h3>
                    <p className="text-sm text-text-secondary font-light leading-relaxed">Shape color schemes and icons so the app feels uniquely yours.</p>
                  </div>
                </div>

                <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
                  Designing for this kind of flexibility is harder than designing a single fixed flow. Every customizable surface has to hold together visually no matter what combination a user picks, which meant building with a consistent underlying system rather than one-off screens. It's a detail that's easy to overlook, but it's what makes the app feel considered rather than generic.
                </p>
              </div>

              <figure className="space-y-3 pt-4">
                <div className="overflow-hidden rounded-2xl md:rounded-3xl border border-border/60 bg-surface p-3 md:p-4 flex items-center justify-center">
                  <img
                    src="/pockomint-assets/App Customization.webp"
                    alt="App customization and personalization showcase"
                    loading="lazy"
                    className="w-full max-h-[750px] md:max-h-[900px] object-contain"
                  />
                </div>
                <figcaption className="text-center text-text-secondary font-medium italic text-sm">
                  Home view, themes, icons, and layout customization options
                </figcaption>
              </figure>
            </motion.section>

            {/* Section 7: Validating the Design */}
            <motion.section
              id="validating-design"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-8 scroll-mt-28"
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
                <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-8 flex-col">
                  <h3 className="text-md font-semibold text-primary">Bug Report Reduction</h3>
                  <span className="text-4xl md:text-5xl font-bold">
                    ↓ 80%
                  </span>
                  <p className="text-text-secondary leading-relaxed font-light">
                    Reported issues dropped sharply between beta build 1 and build 5.
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-8 flex-col">
                  <h3 className="text-md font-semibold text-primary">App Size Optimization</h3>
                  <span className="text-4xl md:text-5xl font-bold">
                    80 → 40<span className="text-2xl md:text-3xl font-bold"> MB</span>
                  </span>
                  <p className="text-text-secondary leading-relaxed font-light">
                    Binary size cut by over 50% without sacrificing features or assets.
                  </p>
                </div>

                {/* Metric 3 */}
                <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-8 flex-col">
                  <h3 className="text-md font-semibold text-primary">TestFlight Iterations</h3>
                  <span className="text-4xl md:text-5xl font-bold">
                    05 <span className="text-2xl md:text-3xl font-bold">builds</span>
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

            {/* Section 8: Building Without a Swift Background */}
            <motion.section
              id="building-without-swift"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-8 scroll-mt-28"
            >
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-7 rounded-full bg-primary shrink-0" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
                  Building Without a Swift Background (AI as a learning tool)
                </h2>
              </div>

              <div className="space-y-6 text-lg md:text-xl text-text-secondary leading-relaxed font-light">
                <p>
                  I came into Pockomint as a designer, not an engineer, and Swift wasn't a language I already knew. Rather than treating that as a blocker, I used it as an opportunity to close the gap between design and implementation myself, learning Swift and SwiftUI hands-on while building the actual product, using AI as a learning accelerator alongside that practice.
                </p>
                <p>
                  AI acted like a patient tutor throughout, explaining SwiftUI concepts, native component behavior, and Swift syntax in the context of the actual screens I was building, rather than through abstract tutorials disconnected from the real work. That meant every concept I learned was immediately applied and tested inside a real, shipping product, which sped up the learning curve considerably compared to learning the language in isolation first.
                </p>
              </div>

              {/* Tool Logos Showcase (Home page HeroIntro style) */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-16 pt-4 pb-2">
                {[
                  {
                    name: 'SwiftUI',
                    label: 'Native Framework',
                    icon: <img src="/my-memoji/logo/swiftui-256x256_2x.png" alt="SwiftUI" className="w-full h-full object-contain p-1.5" />
                  },
                  {
                    name: 'Claude',
                    label: 'AI Tutor & Architecture',
                    icon: <img src="/my-memoji/logo/Claude_Symbol_0.svg" alt="Claude" className="w-full h-full object-contain p-1.5" />
                  },
                  {
                    name: 'ChatGPT',
                    label: 'Researching',
                    icon: <img src="/my-memoji/logo/ChatGPT_Logo_0.svg" alt="ChatGPT" className="w-full h-full object-contain p-1.5 invert dark:invert-0" />
                  },
                  {
                    name: 'Mobbin',
                    label: 'UI Patterns & Research',
                    icon: <img src="/my-memoji/logo/Mobbin.svg" alt="Mobbin" className="w-full h-full object-contain p-1.5 invert dark:invert-0" />
                  },
                  {
                    name: 'Antigravity',
                    label: 'AI Pair Programmer',
                    icon: <img src="/my-memoji/logo/Google-Antigravity-Icon-Full-Color.png" alt="Antigravity" className="w-full h-full object-contain p-1.5" />
                  },
                  {
                    name: 'Figma',
                    label: 'UI & Design System',
                    icon: <img src="/my-memoji/logo/Figma_Symbol_0.svg" alt="Figma" className="w-full h-full object-contain p-1.5" />
                  },
                ].map((tool) => (
                  <div key={tool.name} className="flex flex-col items-center gap-4 group relative">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer transition-all bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800"
                    >
                      <div className="w-full h-full flex items-center justify-center p-2">
                        {tool.icon}
                      </div>
                    </motion.div>
                    <div className="text-center">
                      <p className="font-semibold text-primary">{tool.name}</p>
                      <p className="text-sm text-text-secondary font-light hidden sm:block">{tool.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
                <p>
                  The point wasn't to skip learning Swift, it was to learn it faster and more practically by building with it from day one. Closing the gap between design and implementation myself, rather than handing off specs and hoping the build matched intent, is a big part of why Pockomint feels as considered in code as it does in Figma.
                </p>
              </div>
            </motion.section>

            {/* Section 9: Beyond the Screen */}
            <motion.section
              id="beyond-screen"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-8 scroll-mt-28"
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

              {/* iPhone App Store Showcase */}
              <figure className="space-y-3 pt-4">
                <div className="overflow-hidden rounded-2xl md:rounded-3xl border border-border/60 p-4 md:p-8 flex items-center justify-center bg-[linear-gradient(to_bottom,rgb(236,228,255),rgb(249,249,249))] dark:bg-[linear-gradient(to_bottom,rgb(28,22,46),rgb(0,0,0))]">
                  <img
                    src="/pockomint-assets/app ss ios.webp"
                    alt="Pockomint iPhone App Store screenshots showcase"
                    loading="lazy"
                    className="w-full max-h-[750px] md:max-h-[900px] object-contain"
                  />
                </div>
                <figcaption className="text-center text-text-secondary font-medium italic text-sm">
                  iPhone App Store Connect screenshots and storefront sequence
                </figcaption>
              </figure>

              {/* iPad App Store Showcase */}
              <figure className="space-y-3 pt-4">
                <div className="overflow-hidden rounded-2xl md:rounded-3xl border border-border/60 p-4 md:p-8 flex items-center justify-center bg-[linear-gradient(to_bottom,rgb(236,228,255),rgb(249,249,249))] dark:bg-[linear-gradient(to_bottom,rgb(28,22,46),rgb(0,0,0))]">
                  <img
                    src="/pockomint-assets/app ss ipad.webp"
                    alt="Pockomint iPad App Store screenshots showcase"
                    loading="lazy"
                    className="w-full max-h-[750px] md:max-h-[900px] object-contain"
                  />
                </div>
                <figcaption className="text-center text-text-secondary font-medium italic text-sm">
                  iPad App Store Connect screenshots and storefront sequence
                </figcaption>
              </figure>
            </motion.section>

            {/* Section 9: Outcome */}
            <motion.section
              id="outcome"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-8 scroll-mt-28"
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

            </motion.section>

          </main>

      </div>
    </div>
  );
}
