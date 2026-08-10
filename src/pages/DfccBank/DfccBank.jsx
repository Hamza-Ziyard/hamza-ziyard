import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import {
  Image as ImageIcon,
  ChevronUp,
  Check,
  Globe,
  Monitor,
  Cpu,
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
  Users,
  ShieldCheck,
  TrendingUp,
  LayoutGrid,
  FileCheck2,
  Sliders,
  ArrowRight
} from 'lucide-react';
import ContactModal from '../../components/ui/ContactModal';

const SECTIONS = [
  { id: 'the-ask', title: 'The Ask', num: '01' },
  { id: 'research-proposal', title: 'Research & Proposal', num: '02' },
  { id: 'getting-buy-in', title: 'Getting Buy-In', num: '03' },
  { id: 'constraints-scope', title: 'Constraints & Scope', num: '04' },
  { id: 'hardware-testing', title: 'Hardware Testing', num: '05' },
  { id: 'key-decisions', title: 'Key Design Decisions', num: '06' },
  { id: 'localization', title: 'Trilingual Localization', num: '07' },
  { id: 'outcome', title: 'Outcome & Impact', num: '08' },
  { id: 'closing', title: 'Closing', num: '09' },
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

export default function DfccBank() {
  const [activeSection, setActiveSection] = useState('the-ask');
  const [showNav, setShowNav] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const dropdownRef = useRef(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    document.title = "DFCC Bank ATM Redesign Case Study | Hamza Ziyard";
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('the-ask');
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
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-12 md:space-y-6">

        {/* Hero Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-[2000px] mx-auto rounded-2xl md:rounded-3xl overflow-hidden p-6 sm:p-10 flex flex-col items-center justify-center min-h-[380px] md:min-h-[480px]"
          >
            {/* Ambient Mesh Gradient Background Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-60">
              <div className="absolute -top-[20%] -left-[20%] w-[90%] h-[90%] bg-red-500/20 dark:bg-red-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
              <div className="absolute top-[20%] -right-[20%] w-[90%] h-[90%] bg-rose-500/20 dark:bg-rose-600/20 rounded-full blur-[130px]" style={{ animationDuration: '10s' }} />
              <div className="absolute -bottom-[20%] left-[10%] w-[90%] h-[90%] bg-amber-600/15 dark:bg-red-800/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '7s' }} />
            </div>

            {/* Main Hero Media */}
            <div className="relative z-10 w-full max-w-5xl pt-4 md:pt-8 pb-6 md:pb-8 flex flex-col items-center gap-6">
              <img
                src="https://assets.hamzaziyard.com/projects-for-fun/dfcc/dfcc-assets/hero.webp"
                alt="DFCC Bank ATM Redesign Final Screen Interface"
                loading="eager"
                className="w-full h-auto max-h-[600px] md:max-h-[750px] object-contain"
              />
            </div>
          </motion.div>

          {/* Header & Meta Information */}
          <div className="w-full max-w-[1440px] mx-auto mt-12 space-y-8">
              <h1 className="text-4xl lg:text-5xl leading-tight font-bold tracking-tight text-primary">
                DFCC Bank ATM Interface Redesign
              </h1>

            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-light">
              End-to-end redesign of DFCC Bank's nationwide ATM screen experience across two hardware models, localized into English, Sinhala, and Tamil.
            </p>

            <div className="flex flex-wrap justify-start gap-10 md:gap-16 pt-6 border-t border-border/50">
              <div className="space-y-1">
                <h4 className="text-sm text-text-secondary font-medium">Role</h4>
                <p className="text-lg font-bold text-primary">UI/UX Designer</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm text-text-secondary font-medium">Client</h4>
                <p className="text-lg font-bold text-primary">DFCC Bank</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm text-text-secondary font-medium">Timeline</h4>
                <p className="text-lg font-bold text-primary">05 months</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm text-text-secondary font-medium">Scope</h4>
                <p className="text-lg font-bold text-primary">2 Hardware Models • 3 Languages</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm text-text-secondary font-medium">Fleet Impact</h4>
                <p className="text-lg font-bold text-primary">150+ ATMs & CRMs Nationwide</p>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Minimal Pill Navigation */}
        <AnimatePresence>
          {showNav && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300"
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
                <span className="hidden md:block px-2.5 py-0.5 rounded-md bg-white/10 text-[11px] font-bold text-zinc-200 dark:bg-black/10 dark:text-zinc-800">
                  {currentSectionObj?.num || '01'} / {SECTIONS.length.toString().padStart(2, '0')}
                </span>
                <span className="text-xs sm:text-sm font-medium max-w-[150px] sm:max-w-[200px] truncate text-white dark:text-zinc-900">
                  {currentSectionObj?.title || 'The Ask'}
                </span>
                <ChevronUp
                  size={16}
                  className={clsx("text-zinc-400 transition-transform duration-300 group-hover:text-white dark:text-zinc-500 dark:group-hover:text-zinc-900", isDropdownOpen && "rotate-180")}
                />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Case Study Content Sections */}
        <main className="max-w-[1440px] mx-auto space-y-16 md:space-y-44 py-16">

          {/* Section 1: The Ask */}
          <motion.section
            id="the-ask"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8 scroll-mt-28"
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-7 rounded-full bg-primary shrink-0" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-primary tracking-tight">The Ask</h2>
            </div>

            <div className="space-y-6 text-lg text-text-secondary leading-relaxed font-light">
              <p>
                DFCC Bank approached me directly to improve the experience of their existing ATM interface. Their current system felt outdated and wasn't serving their multilingual customer base effectively.
              </p>
            </div>
          </motion.section>

          {/* Section 2: Research and Proposal */}
          <motion.section
            id="research-proposal"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8 scroll-mt-28"
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-7 rounded-full bg-primary shrink-0" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-primary tracking-tight">Research and Proposal</h2>
            </div>

            <div className="space-y-6 text-lg text-text-secondary leading-relaxed font-light">
              <p>
                Before proposing any direction, I visited real DFCC ATM sites to observe the existing interface firsthand and understand how customers were actually interacting with it. From there, I put together a proposal rather than jumping straight into full design work, giving DFCC a clear view of my thinking before any commitment was made.
              </p>
              <p>
                As part of that proposal, I used AI-generated imagery to simulate how screen concepts would hold up in harsh real-world conditions—sunny glare, dust, and other environmental factors ATMs are regularly exposed to. This helped communicate not just what the design looked like, but how it would actually perform in the field.
              </p>
            </div>

            {/* Design Language Direction & Influences Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Design Language Direction */}
              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-2 flex-col">
                <div className="space-y-4">
                  <Sliders size={36} className="text-primary" />
                  <h3 className="text-md font-semibold text-primary">Design Language Direction</h3>
                </div>
                <p className="text-text-secondary leading-relaxed font-light">
                  Clean, minimal, and modern interface with high contrast suited for outdoor ATM screens, reduced visual noise, and clear visual hierarchy across user flows.
                </p>
              </div>

              {/* Influences */}
              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-2 flex-col">
                <div className="space-y-4">
                  <Sparkles size={36} className="text-primary" />
                  <h3 className="text-md font-semibold text-primary">Influences</h3>
                </div>
                <p className="text-text-secondary leading-relaxed font-light">
                  Grounded in modern banking interfaces, contemporary system UI standards, and large-format kiosk design principles for instant readability.
                </p>
              </div>
            </div>

            {/* Design Principles (Core Concept) */}
            <div className="space-y-6 pt-6">
              <h3 className="text-xl md:text-2xl font-semibold text-primary tracking-tight">
                Design Principles (Core Concept)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-2 flex-col">
                  <div className="space-y-4">
                    <ShieldCheck size={36} className="text-primary" />
                    <h3 className="text-md font-semibold text-primary">Familiar, Not Disruptive</h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed font-light">
                    Preserve user muscle memory while dramatically improving visual clarity and ease of navigation.
                  </p>
                </div>

                <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-2 flex-col">
                  <div className="space-y-4">
                    <TrendingUp size={36} className="text-primary" />
                    <h3 className="text-md font-semibold text-primary">Clarity in All Conditions</h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed font-light">
                    Optimised for outdoor usage, screen glare, and varied lighting conditions across day and night.
                  </p>
                </div>

                <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-2 flex-col">
                  <div className="space-y-4">
                    <Layers size={36} className="text-primary" />
                    <h3 className="text-md font-semibold text-primary">Consistency at Scale</h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed font-light">
                    A unified visual system that works seamlessly across 700+ screens and multiple hardware models.
                  </p>
                </div>

                <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-2 flex-col">
                  <div className="space-y-4">
                    <CheckCircle2 size={36} className="text-primary" />
                    <h3 className="text-md font-semibold text-primary">Accessibility First</h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed font-light">
                    High contrast ratios, readable typography, and oversized tap targets for comfortable physical interaction.
                  </p>
                </div>
              </div>
            </div>

            {/* Mini Contact Banner for Research */}
            <div className="pt-2">
              <div className="w-full rounded-2xl bg-gray-100 dark:bg-zinc-900 p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left border border-gray-200 dark:border-zinc-800">
                <div className="space-y-1">
                  <h3 className="text-base md:text-lg font-semibold text-primary tracking-tight">
                    Want to explore the research photos & environment stress tests?
                  </h3>
                  <p className="text-text-secondary text-xs md:text-sm font-light leading-relaxed">
                    I'd love to share insights from site visits and AI environmental renders testing screen legibility under harsh glare.
                  </p>
                </div>

                <button
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center justify-center shrink-0 bg-[#1a1a1a] dark:bg-[#262626] text-white hover:opacity-90 transition-all font-medium text-xs md:text-sm px-5 py-2.5 rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-200 cursor-pointer"
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </motion.section>

          {/* Section 3: Getting Buy-In */}
          <motion.section
            id="getting-buy-in"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8 scroll-mt-28"
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-7 rounded-full bg-primary shrink-0" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-primary tracking-tight">Getting Buy-In</h2>
            </div>

            <div className="space-y-6 text-lg text-text-secondary leading-relaxed font-light">
              <p>
                DFCC responded positively to the proposal and brought me on to lead the redesign. From there, we expanded the collaboration, bringing in DFCC's marketing and technical teams to help shape and validate further variants. This cross-functional input helped refine the direction before locking in a final design language.
              </p>
            </div>

            {/* Getting Buy-In Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-4 flex-col">
                <div className="space-y-2">
                  <Users size={32} className="text-primary" />
                  <h3 className="text-md font-semibold text-primary">Cross-Functional Input</h3>
                </div>
                <p className="text-text-secondary leading-relaxed font-light text-sm">
                  Partnered directly with DFCC marketing, engineering, and ATM operations teams to align technical and brand goals.
                </p>
              </div>

              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-4 flex-col">
                <div className="space-y-2">
                  <LayoutGrid size={32} className="text-primary" />
                  <h3 className="text-md font-semibold text-primary">Variant Explorations</h3>
                </div>
                <p className="text-text-secondary leading-relaxed font-light text-sm">
                  Explored multiple screen layout directions and component arrangements before locking in the core design language.
                </p>
              </div>

              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-4 flex-col">
                <div className="space-y-2">
                  <FileCheck2 size={32} className="text-primary" />
                  <h3 className="text-md font-semibold text-primary">Executive Alignment</h3>
                </div>
                <p className="text-text-secondary leading-relaxed font-light text-sm">
                  Secured stakeholder buy-in early through tangible real-world simulations and environmental stress tests.
                </p>
              </div>
            </div>

            {/* Mini Banner for Variants */}
            <div className="pt-2">
              <div className="w-full rounded-2xl bg-gray-100 dark:bg-zinc-900 p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left border border-gray-200 dark:border-zinc-800">
                <div className="space-y-1">
                  <h3 className="text-base md:text-lg font-semibold text-primary tracking-tight">
                    Interested in seeing the exploratory design variants?
                  </h3>
                  <p className="text-text-secondary text-xs md:text-sm font-light leading-relaxed">
                    I can walk you through the design explorations and cross-functional feedback iterations.
                  </p>
                </div>

                <button
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center justify-center shrink-0 bg-[#1a1a1a] dark:bg-[#262626] text-white hover:opacity-90 transition-all font-medium text-xs md:text-sm px-5 py-2.5 rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-200 cursor-pointer"
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </motion.section>

          {/* Section 4: Constraints and Scope */}
          <motion.section
            id="constraints-scope"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8 scroll-mt-28"
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-7 rounded-full bg-primary shrink-0" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-primary tracking-tight">Constraints and Scope</h2>
            </div>

            <div className="space-y-6 text-lg text-text-secondary leading-relaxed font-light">
              <p>
                The project spanned two distinct ATM models, each requiring full localization across three languages. Every design decision had to work within DFCC's brand guidelines and the physical and technical limitations of real ATM hardware.
              </p>
            </div>

            {/* Scope Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-4 flex-col">
                <div className="space-y-2">
                  <Monitor size={32} className="text-primary" />
                  <h3 className="text-md font-semibold text-primary">2 Physical Hardware Models</h3>
                </div>
                <p className="text-text-secondary leading-relaxed font-light text-sm">
                  Adapted layout grids, button placements, and key resolution constraints for two separate physical ATM models.
                </p>
              </div>

              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-4 flex-col">
                <div className="space-y-2">
                  <Globe size={32} className="text-primary" />
                  <h3 className="text-md font-semibold text-primary">Trilingual Requirements</h3>
                </div>
                <p className="text-text-secondary leading-relaxed font-light text-sm">
                  Complete text flow and typography balance tuned for English, Sinhala, and Tamil languages nationwide.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 5: Testing on Real Hardware */}
          <motion.section
            id="hardware-testing"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8 scroll-mt-28"
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-7 rounded-full bg-primary shrink-0" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-primary tracking-tight">Testing on Real Hardware</h2>
            </div>

            <div className="space-y-6 text-lg text-text-secondary leading-relaxed font-light">
              <p>
                Once onboard, I moved beyond simulation and tested directly on physical ATMs the bank made available for this purpose. This followed an iterative loop: design a version, test it live on an ATM, identify what wasn't working, fix it, and test again. Each round sharpened the interface based on how it actually behaved on hardware, not just how it looked on screen.
              </p>
            </div>

            {/* Hardware Testing Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-4 flex-col">
                <div className="space-y-2">
                  <Cpu size={32} className="text-primary" />
                  <h3 className="text-md font-semibold text-primary">Physical Machine Testing</h3>
                </div>
                <p className="text-text-secondary leading-relaxed font-light text-sm">
                  Evaluated real screen rendering, touch sensitivity, and button tap boundaries on live hardware units.
                </p>
              </div>

              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-4 flex-col">
                <div className="space-y-2">
                  <Sliders size={32} className="text-primary" />
                  <h3 className="text-md font-semibold text-primary">Rapid Iteration Loop</h3>
                </div>
                <p className="text-text-secondary leading-relaxed font-light text-sm">
                  Design → Live ATM Test → Identify Friction → Refine → Retest cycle to eliminate usability issues.
                </p>
              </div>

              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-4 flex-col">
                <div className="space-y-2">
                  <ShieldCheck size={32} className="text-primary" />
                  <h3 className="text-md font-semibold text-primary">Hardware Validation</h3>
                </div>
                <p className="text-text-secondary leading-relaxed font-light text-sm">
                  Verified viewing angles, outdoor lighting performance, and contrast ratios directly on site.
                </p>
              </div>
            </div>

            {/* Live ATM Hardware Testing Image Showcase */}
            <figure className="space-y-3 pt-4">
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-red-500/20 dark:border-red-500/15 p-4 md:p-8 flex items-center justify-center bg-gradient-to-b from-red-50/40 via-rose-50/20 to-slate-50/60 dark:from-red-950/25 dark:via-rose-950/15 dark:to-zinc-950/40 backdrop-blur-xl">
                {/* Ambient Mesh Background Glow */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
                  <div className="absolute -top-[30%] -left-[20%] w-[80%] h-[80%] bg-red-400/20 dark:bg-red-600/20 rounded-full blur-[100px]" />
                  <div className="absolute -bottom-[30%] -right-[20%] w-[80%] h-[80%] bg-rose-500/20 dark:bg-rose-600/20 rounded-full blur-[100px]" />
                </div>
                <img
                  src="https://assets.hamzaziyard.com/projects-for-fun/dfcc/dfcc-assets/test.webp"
                  alt="On-site physical ATM testing with simulated test data"
                  loading="lazy"
                  className="relative z-10 w-full max-h-[750px] md:max-h-[900px] object-contain rounded-xl"
                />
              </div>
              <figcaption className="text-center text-text-secondary font-medium italic text-sm flex items-center justify-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                Note: On-site physical ATM testing shown with dummy / simulated test content for security and privacy.
              </figcaption>
            </figure>
          </motion.section>

          {/* Section 6: Key Design Decisions */}
          <motion.section
            id="key-decisions"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8 scroll-mt-28"
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-7 rounded-full bg-primary shrink-0" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-primary tracking-tight">Key Design Decisions</h2>
            </div>

            <div className="space-y-6 text-lg text-text-secondary leading-relaxed font-light">
              <p>
                Once the core design direction was locked, I focused on smaller, high-impact refinements. This included introducing icons and symbols in key sections to reduce reliance on text, and adding bank and service logos where quick recognition mattered more than reading, helping customers navigate faster with less cognitive load. These subtle layers were what elevated the interface from functional to genuinely easier to use.
              </p>
            </div>

            {/* Key Decisions Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-4 flex-col">
                <div className="space-y-2">
                  <Sparkles size={32} className="text-primary" />
                  <h3 className="text-md font-semibold text-primary">Iconography System</h3>
                </div>
                <p className="text-text-secondary leading-relaxed font-light text-sm">
                  Introduced universal icons and symbols alongside text labels to guide users visually and cut cognitive friction.
                </p>
              </div>

              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-4 flex-col">
                <div className="space-y-2">
                  <CheckCircle2 size={32} className="text-primary" />
                  <h3 className="text-md font-semibold text-primary">Instant Logo Recognition</h3>
                </div>
                <p className="text-text-secondary leading-relaxed font-light text-sm">
                  Integrated prominent bank and partner service logos where quick visual recognition speeds up user task completion.
                </p>
              </div>
            </div>

            {/* Key Design Decisions Showcase */}
            <figure className="space-y-3 pt-4">
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-red-500/20 dark:border-red-500/15 p-4 md:p-8 flex items-center justify-center bg-gradient-to-b from-red-50/40 via-rose-50/20 to-slate-50/60 dark:from-red-950/25 dark:via-rose-950/15 dark:to-zinc-950/40 backdrop-blur-xl">
                {/* Ambient Mesh Background Glow */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
                  <div className="absolute -top-[30%] -left-[20%] w-[80%] h-[80%] bg-red-400/20 dark:bg-red-600/20 rounded-full blur-[100px]" />
                  <div className="absolute -bottom-[30%] -right-[20%] w-[80%] h-[80%] bg-rose-500/20 dark:bg-rose-600/20 rounded-full blur-[100px]" />
                </div>
                <img
                  src="https://assets.hamzaziyard.com/projects-for-fun/dfcc/dfcc-assets/key-design-decisions.webp"
                  alt="DFCC Bank ATM Key Design Decisions Iconography & Logo System Showcase"
                  loading="lazy"
                  className="relative z-10 w-full max-h-[750px] md:max-h-[900px] object-contain rounded-xl"
                />
              </div>
              <figcaption className="text-center text-text-secondary font-medium italic text-sm">
                Custom iconography, fast action triggers, and integrated bank service logos
              </figcaption>
            </figure>
          </motion.section>

          {/* Section 7: Localization */}
          <motion.section
            id="localization"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8 scroll-mt-28"
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-7 rounded-full bg-primary shrink-0" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-primary tracking-tight">Localization</h2>
            </div>

            <div className="space-y-6 text-lg text-text-secondary leading-relaxed font-light">
              <p>
                The full interface was adapted across English, Sinhala, and Tamil, keeping the visual hierarchy and icon system consistent so the experience felt equally clear in all three languages.
              </p>
            </div>

            {/* Localization Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-4 flex-col">
                <h3 className="text-md font-semibold text-primary">English Interface</h3>
                <p className="text-text-secondary leading-relaxed font-light text-sm">
                  Clean typographic hierarchy and standardized banking terms for fast universal navigation.
                </p>
              </div>

              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-4 flex-col">
                <h3 className="text-md font-semibold text-primary">Sinhala Interface</h3>
                <p className="text-text-secondary leading-relaxed font-light text-sm">
                  Optimized Sinhala script font sizing and baseline alignment for high legibility on outdoor screens.
                </p>
              </div>

              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-4 flex-col">
                <h3 className="text-md font-semibold text-primary">Tamil Interface</h3>
                <p className="text-text-secondary leading-relaxed font-light text-sm">
                  Balanced Tamil letter spacing and tap boundary padding ensuring identical visual structure across views.
                </p>
              </div>
            </div>

            {/* Trilingual Localization Showcase */}
            <figure className="space-y-3 pt-4">
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-red-500/20 dark:border-red-500/15 p-4 md:p-8 flex items-center justify-center bg-gradient-to-b from-red-50/40 via-rose-50/20 to-slate-50/60 dark:from-red-950/25 dark:via-rose-950/15 dark:to-zinc-950/40 backdrop-blur-xl">
                {/* Ambient Mesh Background Glow */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
                  <div className="absolute -top-[30%] -left-[20%] w-[80%] h-[80%] bg-red-400/20 dark:bg-red-600/20 rounded-full blur-[100px]" />
                  <div className="absolute -bottom-[30%] -right-[20%] w-[80%] h-[80%] bg-rose-500/20 dark:bg-rose-600/20 rounded-full blur-[100px]" />
                </div>
                <img
                  src="https://assets.hamzaziyard.com/projects-for-fun/dfcc/dfcc-assets/localization.webp"
                  alt="DFCC Bank ATM Trilingual Localization across English, Sinhala, and Tamil"
                  loading="lazy"
                  className="relative z-10 w-full max-h-[750px] md:max-h-[900px] object-contain rounded-xl"
                />
              </div>
              <figcaption className="text-center text-text-secondary font-medium italic text-sm">
                Side-by-side localization across English, Sinhala, and Tamil languages
              </figcaption>
            </figure>
          </motion.section>

          {/* Section 8: Outcome */}
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
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-primary tracking-tight">Outcome</h2>
            </div>

            <div className="space-y-6 text-lg text-text-secondary leading-relaxed font-light">
              <p>
                The final design was well received by DFCC's team. Today, it runs live across DFCC's ATM and CRM network nationwide, used daily by both DFCC customers and customers from other banks through the shared network.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              {/* Metric 1: Machine Fleet */}
              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-8 flex-col">
                <h3 className="text-md font-semibold text-primary">Nationwide Fleet</h3>
                <span className="text-4xl md:text-5xl font-bold">
                  150+ <span className="text-xl md:text-2xl font-bold">ATMs & CRMs</span>
                </span>
                <p className="text-text-secondary leading-relaxed font-light">
                  Active across physical DFCC Bank ATMs and Cash Recycler Machines nationwide.
                </p>
              </div>

              {/* Metric 2: User Volume */}
              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-8 flex-col">
                <h3 className="text-md font-semibold text-primary">Daily Reach</h3>
                <span className="text-4xl md:text-5xl font-bold">
                  100k+ <span className="text-xl md:text-2xl font-bold">daily users</span>
                </span>
                <p className="text-text-secondary leading-relaxed font-light">
                  Serving DFCC account holders and shared interbank network customers daily.
                </p>
              </div>

              {/* Metric 3: System Scale */}
              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-8 flex-col">
                <h3 className="text-md font-semibold text-primary">System Scale</h3>
                <span className="text-4xl md:text-5xl font-bold">
                  700+ <span className="text-xl md:text-2xl font-bold">screens</span>
                </span>
                <p className="text-text-secondary leading-relaxed font-light">
                  Redesigned into a unified visual system across two distinct hardware models.
                </p>
              </div>

              {/* Metric 4: Localization */}
              <div className="p-8 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-8 flex-col">
                <h3 className="text-md font-semibold text-primary">Localization</h3>
                <span className="text-4xl md:text-5xl font-bold">
                  03 <span className="text-xl md:text-2xl font-bold">languages</span>
                </span>
                <p className="text-text-secondary leading-relaxed font-light">
                  Fully adapted across English, Sinhala, and Tamil with clear visual hierarchy.
                </p>
              </div>
            </div>

            {/* Single Contact Banner before Closing */}
            <div className="pt-4">
              <div className="w-full rounded-2xl bg-gray-100 dark:bg-zinc-900 p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left border border-gray-200 dark:border-zinc-800">
                <div className="space-y-1">
                  <h3 className="text-base md:text-lg font-semibold text-primary tracking-tight">
                    Interested in learning more about the DFCC Bank ATM redesign?
                  </h3>
                  <p className="text-text-secondary text-xs md:text-sm font-light leading-relaxed">
                    I'd love to chat about the hardware constraints, trilingual design process, and testing methodologies.
                  </p>
                </div>

                <button
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center justify-center shrink-0 bg-[#1a1a1a] dark:bg-[#262626] text-white hover:opacity-90 transition-all font-medium text-xs md:text-sm px-5 py-2.5 rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98] duration-200 cursor-pointer"
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </motion.section>

          {/* Section 9: Closing */}
          <motion.section
            id="closing"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8 scroll-mt-28"
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-7 rounded-full bg-primary shrink-0" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-primary tracking-tight">Closing</h2>
            </div>

            <div className="space-y-6 text-lg text-text-secondary leading-relaxed font-light">
              <p>
                What started as a proposal grounded in real site research is now a live system serving real customers across Sri Lanka every day, refined through direct testing on real hardware and trusted enough to become the new standard for DFCC's ATM network.
              </p>
            </div>
          </motion.section>

        </main>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} initialMessage="Hi Hamza, I'd like to talk about your DFCC Bank ATM design work!" />
    </div>
  );
}

function BuildingBankIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="21" width="18" height="2" />
      <rect x="3" y="10" width="18" height="2" />
      <path d="M12 2L3 7v3h18V7l-9-5z" />
      <path d="M6 12v7" />
      <path d="M10 12v7" />
      <path d="M14 12v7" />
      <path d="M18 12v7" />
    </svg>
  );
}
