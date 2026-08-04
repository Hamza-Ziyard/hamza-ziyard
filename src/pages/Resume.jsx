import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Resume() {
  useEffect(() => {
    document.title = "Resume | Hamza Ziyard";
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
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
      className="max-w-4xl mx-4 lg:mx-auto py-16 px-6 sm:px-12 border border-border rounded-2xl mt-4 shadow-lg bg-background"
    >
      {/* Header */}
      <div className="text-center mb-10 border-b border-border pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-3 tracking-tight">
          Hamza Ziyard
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-sm md:text-base text-text-secondary mb-6">
          <a href="tel:+94776145330" className="hover:text-text-primary transition-colors">
            +94 776145330
          </a>
          <span>•</span>
          <a
            href="mailto:hamzaziyard.ux@gmail.com"
            className="hover:text-text-primary transition-colors"
          >
            hamzaziyard.ux@gmail.com
          </a>
          <span>•</span>
          <a
            href="https://linkedin.com/in/hamza-ziyard"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            linkedin.com/in/hamza-ziyard
          </a>
          <span>•</span>
          <a
            href="/"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            www.hamzaziyard.com
          </a>
        </div>

        {/* Download PDF Button at top */}
        <div className="flex justify-center">
          <a
            href="https://assets.hamzaziyard.com/CV/resume/Hamza%20Ziyard-CV.pdf"
            download="Hamza_Ziyard_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-background hover:opacity-90 transition-all rounded-md font-bold text-sm shadow-md"
          >
            <span>Download PDF Resume</span>
          </a>
        </div>
      </div>

      <div className="space-y-10">
        {/* Intro */}
        <motion.section variants={itemVariants}>
          <p className="text-base leading-relaxed text-text-secondary">
            UI/UX Designer with 4+ years of experience across product design, accessibility, and multilingual interface design. Experienced in leading design system initiatives, running stakeholder-driven redesigns, and using AI-assisted workflows to speed up design-to-development handoff. Comfortable collaborating with engineering teams on Agile delivery and contributing to accessibility and performance NFRs.
          </p>
        </motion.section>

        {/* Skills */}
        <motion.section variants={itemVariants}>
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#5169F6] dark:text-[#7C8FFF] mb-4">
            SKILLS
          </h2>
          <div className="space-y-2 text-sm md:text-base leading-relaxed">
            <p>
              <span className="font-bold text-text-primary">Core UX & Research:</span>{" "}
              <span className="text-text-secondary">
                User research, Usability testing, Wireframing, Prototyping (interactive), Information architecture, User flows / journey mapping, Heuristic evaluation, Data-driven design / analytics understanding, Multilingual Design
              </span>
            </p>
            <p>
              <span className="font-bold text-text-primary">Design:</span>{" "}
              <span className="text-text-secondary">
                Figma, Sketch, Adobe XD, Canva
              </span>
            </p>
            <p>
              <span className="font-bold text-text-primary">Design Systems and Libraries:</span>{" "}
              <span className="text-text-secondary">
                Component libraries, iOS HCI guidelines, Android Material Design guidelines
              </span>
            </p>
            <p>
              <span className="font-bold text-text-primary">Web & No-Code Tools:</span>{" "}
              <span className="text-text-secondary">
                Webflow, Framer, WordPress
              </span>
            </p>
            <p>
              <span className="font-bold text-text-primary">Programming Languages:</span>{" "}
              <span className="text-text-secondary">
                HTML, CSS, Javascript
              </span>
            </p>
            <p>
              <span className="font-bold text-text-primary">AI tools:</span>{" "}
              <span className="text-text-secondary">
                ChatGPT, Gemini, Claude, Github Co-pilot, Prompt Engineering
              </span>
            </p>
            <p>
              <span className="font-bold text-text-primary">Working knowledge of:</span>{" "}
              <span className="text-text-secondary">
                React JS, Next JS, Swift, and related front-end frameworks
              </span>
            </p>
          </div>
        </motion.section>

        {/* Work Experience */}
        <motion.section variants={itemVariants}>
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#5169F6] dark:text-[#7C8FFF] mb-6">
            WORK EXPERIENCE
          </h2>

          <div className="space-y-8">
            {/* Self-Employed (Current) */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-baseline mb-1">
                <h3 className="font-bold text-text-primary text-base md:text-lg">
                  Self-Employed
                </h3>
                <span className="text-sm font-bold text-text-primary sm:text-right">
                  01/2026 - Present
                </span>
              </div>
              <p className="font-semibold text-sm md:text-base text-text-primary mb-3">
                UI/UX Designer and UI Developer • Freelancer
              </p>
              <ul className="space-y-2 list-disc list-inside text-sm md:text-base text-text-secondary leading-relaxed">
                <li>Redesigned the ATM interface for DFCC Bank, delivering a multilingual version across Sinhala, Tamil, and English to serve a broader customer base</li>
                <li>Designed and built Pockomint, a native iOS expense tracking app, from concept through a pre-launch beta, gathering direct user feedback that informed iterative design refinements</li>
                <li>Partnered with a development team to turn a SaaS inventory concept into a build-ready prototype, closing usability gaps through direct stakeholder feedback</li>
                <li>Used AI tools including GitHub Copilot to accelerate design and development iteration within Agile sprint cycles</li>
              </ul>
            </div>

            {/* Zafer */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-baseline mb-1">
                <h3 className="font-bold text-text-primary text-base md:text-lg">
                  Zafer
                </h3>
                <div className="text-sm font-bold text-text-primary sm:text-right">
                  <span>Colombo, Sri Lanka • </span>
                  <span>03/2024 - 12/2025</span>
                </div>
              </div>
              <p className="font-semibold text-sm md:text-base text-text-primary mb-3">
                UI/UX Designer • Full-time
              </p>
              <ul className="space-y-2 list-disc list-inside text-sm md:text-base text-text-secondary leading-relaxed">
                <li>Introduced separate iOS and Android design systems aligned to Apple HIG and Material Design, reducing design debt for future contributors</li>
                <li>Led a full UI redesign after diagnosing usability and engagement gaps through direct stakeholder and client feedback sessions</li>
                <li>Ran feedback sessions with stakeholders and clients to surface usability and engagement gaps, then translated findings into a full UI redesign</li>
                <li>Implemented WCAG 2.1 accessibility standards across the product, closing gaps that would otherwise have blocked compliance</li>
                <li>Restructured the design-to-development handoff workflow, cutting back-and-forth between design and engineering teams</li>
                <li>Delivered an enterprise-grade white-label application in close partnership with a cross-functional team of around twenty across Android, iOS, and web, participating in Agile ceremonies and sprint reviews to translate ambiguous enterprise requirements into scalable, developer-ready designs</li>
                <li>Extended the design system to support multilingual interfaces across English and Arabic, maintaining visual consistency across multiple features and screens</li>
                <li>Authored a company-wide design guideline to keep future work consistent as the team scaled</li>
                <li>Used Google Analytics to prioritize usability fixes based on real user behavior across freelance projects</li>
              </ul>
            </div>

            {/* Self-Employed (2023 - 2024) */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-baseline mb-1">
                <h3 className="font-bold text-text-primary text-base md:text-lg">
                  Self-Employed
                </h3>
                <span className="text-sm font-bold text-text-primary sm:text-right">
                  10/2023 - 02/2024
                </span>
              </div>
              <p className="font-semibold text-sm md:text-base text-text-primary mb-3">
                UI/UX Designer and UI Developer • Freelancer
              </p>
              <ul className="space-y-2 list-disc list-inside text-sm md:text-base text-text-secondary leading-relaxed">
                <li>Led UI design and front end direction for a wedding planning platform, working closely with developers and product managers to bring user flows to life</li>
                <li>Designed and developed a startup company's main website in Webflow, owning the project from concept through launch</li>
                <li>Built and deployed a WordPress website for a coding education client based on a provided design</li>
              </ul>
            </div>

            {/* Surge Global */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-baseline mb-1">
                <h3 className="font-bold text-text-primary text-xl font-bold text-text-primary text-base md:text-lg">
                  Surge Global
                </h3>
                <div className="text-sm font-bold text-text-primary sm:text-right">
                  <span>Colombo, Sri Lanka • </span>
                  <span>07/2022 - 12/2022</span>
                </div>
              </div>
              <p className="font-semibold text-sm md:text-base text-text-primary mb-3">
                UI/UX Intern • Full-time
              </p>
              <ul className="space-y-2 list-disc list-inside text-sm md:text-base text-text-secondary leading-relaxed">
                <li>Built user journeys, sitemaps, and prototypes from scratch to bring structure to early-stage, undefined UX flows.</li>
                <li>Translated client branding goals into concrete UI components and prototypes, closing the gap between brand direction and usable design.</li>
                <li>Designed a full dating app experience end-to-end, from low-fidelity concepts through high-fidelity prototypes, to explore the product's viability.</li>
              </ul>
            </div>

            {/* Vetstoria */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-baseline mb-1">
                <h3 className="font-bold text-text-primary text-base md:text-lg">
                  Vetstoria
                </h3>
                <div className="text-sm font-bold text-text-primary sm:text-right">
                  <span>Colombo, Sri Lanka • </span>
                  <span>07/2021 - 06/2022</span>
                </div>
              </div>
              <p className="font-semibold text-sm md:text-base text-text-primary mb-3">
                Web Development Intern • Full-time
              </p>
              <ul className="space-y-2 list-disc list-inside text-sm md:text-base text-text-secondary leading-relaxed">
                <li>Designed customer acquisition landing pages aimed at improving retention, using conversion-focused layout and messaging decisions.</li>
                <li>Built proof-of-concept applications to test and validate new feature ideas before committing engineering resources.</li>
                <li>Contributed to branding improvements through structured design sprints.</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Education */}
        <motion.section variants={itemVariants}>
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#5169F6] dark:text-[#7C8FFF] mb-6">
            EDUCATION
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-baseline mb-1">
                <h3 className="font-bold text-text-primary text-base md:text-lg">
                  B.Sc. (Hons) in Computer Science
                </h3>
                <span className="text-sm font-bold text-text-primary sm:text-right">
                  08/2019 - 08/2023
                </span>
              </div>
              <p className="text-sm md:text-base text-text-secondary">
                University of Westminster
              </p>
              <p className="text-sm md:text-base text-text-secondary mt-1">
                First Class Honors with Industrial Experience
              </p>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row justify-between items-baseline mb-1">
                <h3 className="font-bold text-text-primary text-base md:text-lg">
                  A/L & O/L
                </h3>
                <div className="text-sm font-bold text-text-primary sm:text-right">
                  <span>Sri Lanka • </span>
                  <span>02/2009 - 09/2019</span>
                </div>
              </div>
              <p className="text-sm md:text-base text-text-secondary">
                Zahira College
              </p>
              <p className="text-sm md:text-base text-text-secondary mt-1">
                Physical Science for A/L
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}