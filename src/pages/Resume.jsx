import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Resume() {
  useEffect(() => {
    document.title = "Resume | Hamza Ziyard";
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-5xl mx-auto py-12 px-6 sm:px-12 my-6 text-text-primary font-sans"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start pb-12 mb-12 border-b border-border gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-1">
            Hamza Ziyard
          </h1>
          <p className="text-text-secondary font-medium text-base">
            UI/UX Designer & UI Developer
          </p>
        </div>

        <div className="flex flex-col text-xs md:text-sm text-text-secondary space-y-1 md:text-right">
          <a
            href="https://linkedin.com/in/hamza-ziyard"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors underline decoration-border underline-offset-4"
          >
            linkedin.com/in/hamza-ziyard
          </a>
          <a
            href="mailto:hamzaziyard.ux@gmail.com"
            className="hover:text-text-primary transition-colors"
          >
            hamzaziyard.ux@gmail.com
          </a>
          <a
            href="tel:+94776145330"
            className="hover:text-text-primary transition-colors"
          >
            +94 77 614 5330
          </a>
          <div className="pt-2">
            <a
              href="https://assets.hamzaziyard.com/CV/resume/Hamza%20Ziyard-CV.pdf"
              download="Hamza_Ziyard_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-semibold px-3 py-1.5 rounded bg-zinc-900 dark:bg-white dark:text-black text-white hover:bg-primary hover:text-background transition-all"
            >
              Download PDF CV
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="space-y-12">
        {/* EXPERIENCE SECTION */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 ">
          <div className="md:col-span-3">
            <h2 className="text-xs uppercase tracking-wide font-semibold text-text-secondary sticky top-24">
              EXPERIENCE
            </h2>
          </div>

          <div className="md:col-span-9 space-y-8">
            {/* Self-Employed Current */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
              <div className="md:col-span-5">
                <h3 className="font-bold text-text-primary text-base">Self-Employed</h3>
                <p className="text-xs font-medium text-text-secondary">UI/UX Designer & UI Developer</p>
                <p className="text-xs text-text-secondary/70 mt-0.5">01/2026 – Present</p>
              </div>
              <div className="md:col-span-7">
                <p className="text-sm text-text-secondary leading-relaxed">
                  Redesigned <span className="font-semibold text-text-primary">700+ ATM screens</span> across <span className="font-semibold text-text-primary">150+ DFCC Bank ATMs</span> into a trilingual interface. Designed <span className="font-semibold text-text-primary">Pockomint</span> (iOS expense tracker) achieving <span className="font-semibold text-text-primary">90% UI/UX satisfaction</span> in beta. Prototyped a <span className="font-semibold text-text-primary">50+ screen SaaS inventory system</span> using AI-driven workflows.
                </p>
              </div>
            </div>

            {/* Zafer */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
              <div className="md:col-span-5">
                <h3 className="font-bold text-text-primary text-base">Zafer</h3>
                <p className="text-xs font-medium text-text-secondary">UI/UX Designer</p>
                <p className="text-xs text-text-secondary/70 mt-0.5">03/2024 – 12/2025</p>
              </div>
              <div className="md:col-span-7">
                <p className="text-sm text-text-secondary leading-relaxed">
                  Established Apple HIG & Material Design systems—consolidating color styles from <span className="font-semibold text-text-primary">450+ to 45</span> and mobile styles from <span className="font-semibold text-text-primary">250+ to 45</span>, <span className="font-semibold text-text-primary">tripling delivery efficiency</span> and cutting feature design turnaround time by <span className="font-semibold text-text-primary">75%</span>. Resolved <span className="font-semibold text-text-primary">80% of usability issues</span> and enforced WCAG 2.1 across an enterprise white-label app for <span className="font-semibold text-text-primary">20+ team members</span>.
                </p>
              </div>
            </div>

            {/* Freelance 2023-2024 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
              <div className="md:col-span-5">
                <h3 className="font-bold text-text-primary text-base">Self-Employed</h3>
                <p className="text-xs font-medium text-text-secondary">UI/UX Designer & Developer</p>
                <p className="text-xs text-text-secondary/70 mt-0.5">10/2023 – 02/2024</p>
              </div>
              <div className="md:col-span-7">
                <p className="text-sm text-text-secondary leading-relaxed">
                  Designed and developed <span className="font-semibold text-text-primary">50+ screens</span> across vendor and customer portals for a wedding platform. Built and launched startup websites on <span className="font-semibold text-text-primary">Webflow</span> and client web solutions on <span className="font-semibold text-text-primary">WordPress</span>.
                </p>
              </div>
            </div>

            {/* Surge Global */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
              <div className="md:col-span-5">
                <h3 className="font-bold text-text-primary text-base">Surge Global</h3>
                <p className="text-xs font-medium text-text-secondary">UI/UX Intern</p>
                <p className="text-xs text-text-secondary/70 mt-0.5">07/2022 – 12/2022</p>
              </div>
              <div className="md:col-span-7">
                <p className="text-sm text-text-secondary leading-relaxed">
                  Delivered <span className="font-semibold text-text-primary">6 full project concepts</span> complete with user journeys, sitemaps, and base UI systems, translating client branding into high-fidelity prototypes.
                </p>
              </div>
            </div>

            {/* Vetstoria */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
              <div className="md:col-span-5">
                <h3 className="font-bold text-text-primary text-base">Vetstoria</h3>
                <p className="text-xs font-medium text-text-secondary">Web Development Intern</p>
                <p className="text-xs text-text-secondary/70 mt-0.5">07/2021 – 06/2022</p>
              </div>
              <div className="md:col-span-7">
                <p className="text-sm text-text-secondary leading-relaxed">
                  Designed conversion landing pages that drive long-term clinic registration growth, with core components still actively serving the main platform. Built proof-of-concept web apps to validate feature ideas in structured design sprints.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* EDUCATION SECTION */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 pt-6 border-t border-border">
          <div className="md:col-span-3">
            <h2 className="text-xs uppercase tracking-wide font-semibold text-text-secondary">
              EDUCATION
            </h2>
          </div>

          <div className="md:col-span-9 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
              <div className="md:col-span-5">
                <h3 className="font-bold text-text-primary text-base">University of Westminster</h3>
                <p className="text-xs text-text-secondary/70">2019 – 2023</p>
              </div>
              <div className="md:col-span-7">
                <p className="text-sm font-semibold text-text-primary">B.Sc. (Hons) in Computer Science</p>
                <p className="text-sm text-text-secondary">First Class Honors with Industrial Experience</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
              <div className="md:col-span-5">
                <h3 className="font-bold text-text-primary text-base">Zahira College</h3>
                <p className="text-xs text-text-secondary/70">2009 – 2019</p>
              </div>
              <div className="md:col-span-7">
                <p className="text-sm font-semibold text-text-primary">GCE A/L & O/L</p>
                <p className="text-sm text-text-secondary">Physical Science Stream</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SKILLS SECTION */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 pt-6 border-t border-border">
          <div className="md:col-span-3">
            <h2 className="text-xs uppercase tracking-wide font-semibold text-text-secondary">
              SKILLS
            </h2>
          </div>

          <div className="md:col-span-9 space-y-3">
            <div>
              <span className="font-bold text-sm text-text-primary">UX & Research: </span>
              <span className="text-sm text-text-secondary">
                User Research, Usability Testing, Wireframing, Prototyping, Info Architecture, Multilingual Design, Heuristic Evaluation
              </span>
            </div>

            <div>
              <span className="font-bold text-sm text-text-primary">Design & Systems: </span>
              <span className="text-sm text-text-secondary">
                Figma, Sketch, Adobe XD, Apple HIG, Material Design, Design Tokens, Component Libraries
              </span>
            </div>

            <div>
              <span className="font-bold text-sm text-text-primary">Web & Tech: </span>
              <span className="text-sm text-text-secondary">
                HTML/CSS, JavaScript, React, Webflow, Framer, WordPress, Swift (Working knowledge)
              </span>
            </div>

            <div>
              <span className="font-bold text-sm text-text-primary">AI & Workflows: </span>
              <span className="text-sm text-text-secondary">
                GitHub Copilot, ChatGPT, Claude, Prompt Engineering, Agile/Scrum Handoff
              </span>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}