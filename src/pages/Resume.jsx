import { motion } from "framer-motion";

export default function Resume() {
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
      className="max-w-5xl mx-auto py-20 px-6 sm:px-10 border border-border rounded-2xl mt-4 shadow-lg"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b border-border pb-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-2">
            Hamza Ziyard
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-text-primary">
            UI/UX Designer
          </p>
        </div>
        <div className="mt-6 md:mt-0 md:text-right space-y-1 text-text-secondary text-sm md:text-base">
          <p>
            <a href="tel:+94776145330" className="hover:text-text-primary transition-colors">
              +94 776145330
            </a>
          </p>
          <p>
            <a
              href="mailto:hamzaziyard.ux@gmail.com"
              className="hover:text-text-primary transition-colors"
            >
              hamzaziyard.ux@gmail.com
            </a>
          </p>
          <p>
            <a
              href="https://linkedin.com/in/hamza-ziyard"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors"
            >
              linkedin.com/in/hamza-ziyard
            </a>
          </p>
          <p>
            <a
              href="/"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors"
            >
              www.hamzaziyard.com
            </a>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Intro */}
          <motion.section variants={itemVariants}>
            <p className="text-base leading-relaxed text-text-secondary">
              UI/UX Designer with 4+ years of experience in product design, accessibility, and
              interactive prototyping. Proven ability to improve user engagement, streamline user
              journeys, and collaborate with cross-functional teams to deliver high-quality
              digital experiences.
            </p>
          </motion.section>

          {/* Work Experience */}
          <motion.section variants={itemVariants}>
            <h2 className="text-sm uppercase tracking-widest font-bold text-[#5169F6] dark:text-[#7C8FFF] mb-5">
              Work Experience
            </h2>

            <div className="space-y-12">
              {/* Zafer */}
              <div className="group">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
                  <h3 className="font-bold text-text-primary text-xl">
                    Zafer • Colombo, Sri Lanka
                  </h3>
                  <span className="text-base font-bold text-text-primary sm:text-right">
                    03/2024 - Present
                  </span>
                </div>
                <p className="font-medium text-base text-text-secondary mb-4">
                  UI/UX Designer • Full-time
                </p>
                <ul className="space-y-3 list-none text-sm md:text-base text-text-secondary">
                  <li className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                    <span>Introduced AI-driven design solutions, integrating modern AI design trends into the product experience.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                    <span>Introduced platform-specific UI design practices by creating separate design systems for iOS and Android, aligned with respective HCI principles, Apple Human Interface Guidelines, and Material Design standards.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                    <span>Redesigned the main product UI to elevate overall usability and engagement.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                    <span>Implemented WCAG 2.1 standards to significantly improve product accessibility.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                    <span>Led the website's UI overhaul, improving design-to-development collaboration and workflow.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                    <span>Delivered an enterprise-ready white-label application in close partnership with development teams.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                    <span>Streamlined user journeys through detailed interactive Figma prototypes.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                    <span>Introduced a scalable, future-ready design guideline for the company to support consistency among current and upcoming designers.</span>
                  </li>
                </ul>
              </div>

              {/* Surge Global */}
              <div className="group">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
                  <h3 className="font-bold text-text-primary text-xl">
                    Surge Global • Colombo, Sri Lanka
                  </h3>
                  <span className="text-base font-bold text-text-primary sm:text-right">
                    07/2022 - 12/2022
                  </span>
                </div>
                <p className="font-medium text-base text-text-secondary mb-4">
                  UI/UX Intern • Full-time
                </p>
                <ul className="space-y-3 list-none text-sm md:text-base text-text-secondary">
                  <li className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                    <span>Created user journeys, sitemaps, and prototypes to support clear and effective UX flows.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                    <span>Enhanced client branding by developing detailed UI components and design prototypes.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                    <span>Designed a complete dating app experience, delivering both low-fidelity and high-fidelity prototypes.</span>
                  </li>
                </ul>
              </div>

              {/* Vetstoria */}
              <div className="group">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
                  <h3 className="font-bold text-text-primary text-xl">
                    Vetstoria • Colombo, Sri Lanka
                  </h3>
                  <span className="text-base font-bold text-text-primary sm:text-right">
                    07/2021 - 07/2022
                  </span>
                </div>
                <p className="font-medium text-base text-text-secondary mb-4">
                  Web Development Intern • Full-time
                </p>
                <ul className="space-y-3 list-none text-sm md:text-base text-text-secondary">
                  <li className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                    <span>Designed customer acquisition landing pages to support improved user retention.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                    <span>Developed proof-of-concept applications to explore and validate new feature ideas.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                    <span>Contributed to branding improvements through structured design sprints.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-12">
          {/* Skills */}
          <motion.section variants={itemVariants}>
            <h2 className="text-sm uppercase tracking-widest font-bold text-[#5169F6] dark:text-[#7C8FFF] mb-5">
              Skills
            </h2>
            <div className="space-y-5">
              <div className="flex gap-3 text-base leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                <p>
                  <span className="font-bold text-text-primary">Core UX & Research:</span>
                  <span className="text-text-secondary ml-1">
                    User research, Usability testing, Wireframing, Prototyping (interactive),
                    Information architecture, User flows / journey mapping, Heuristic evaluation,
                    Data-driven design / analytics understanding
                  </span>
                </p>
              </div>
              <div className="flex gap-3 text-base leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                <p>
                  <span className="font-bold text-text-primary">Design:</span>
                  <span className="text-text-secondary ml-1">
                    Figma, Sketch, Adobe XD, Canva
                  </span>
                </p>
              </div>
              <div className="flex gap-3 text-base leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                <p>
                  <span className="font-bold text-text-primary">Design Systems:</span>
                  <span className="text-text-secondary ml-1">
                    Design systems, iOS HCI guidelines, Android Material Design guidelines
                  </span>
                </p>
              </div>
              <div className="flex gap-3 text-base leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                <p>
                  <span className="font-bold text-text-primary">Web & No-Code Tools:</span>
                  <span className="text-text-secondary ml-1">
                    Webflow, Framer, WordPress
                  </span>
                </p>
              </div>
              <div className="flex gap-3 text-base leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                <p>
                  <span className="font-bold text-text-primary">Programming Languages:</span>
                  <span className="text-text-secondary ml-1">
                    HTML, CSS, Javascript
                  </span>
                </p>
              </div>
              <div className="flex gap-3 text-base leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                <p>
                  <span className="font-bold text-text-primary">AI tools:</span>
                  <span className="text-text-secondary ml-1">
                    ChatGPT, Gemini, Claude
                  </span>
                </p>
              </div>
            </div>
          </motion.section>

          {/* Education */}
          <motion.section variants={itemVariants}>
            <h2 className="text-sm uppercase tracking-widest font-bold text-[#5169F6] dark:text-[#7C8FFF] mb-5">
              Education
            </h2>
            <div className="space-y-8">
              <div>
                  <h3 className="font-bold text-text-primary text-xl">
                  B.Sc. (Hons) in Computer Science
                </h3>
                <p className="font-bold text-base text-text-secondary mt-1">
                  University of Westminster
                </p>
                <p className="font-bold text-base text-text-secondary mt-1">
                  08/2019 - 08/2023
                </p>
                <p className="textbase text-text-secondary mt-2">
                  First Class Honors with Industrial Experience
                </p>
              </div>

              <div>
                <h3 className="font-bold text-text-primary text-xl pt-4">
                  A/L & O/L
                </h3>
                <p className="font-bold text-base text-text-secondary mt-1">
                  Zahira College
                </p>
                <p className="font-bold text-base text-text-secondary mt-1">
                  02/2009 - 09/2019
                </p>
                <p className="text-base text-text-secondary mt-2">
                  Physical Science for A/L
                </p>
              </div>
            </div>
          </motion.section>

          {/* Download Button */}
          <div className="pt-4">
            <a
              href="https://assets.hamzaziyard.com/CV/resume/Hamza%20Ziyard-CV.pdf"
              download="Hamza_Ziyard_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center px-6 py-4 bg-primary text-background hover:opacity-90 transition-all rounded-sm font-bold text-sm  shadow-sm"
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}