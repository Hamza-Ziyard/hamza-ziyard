import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import originalProjects from '../data/projects.json';
import companyWorkData from '../data/companyWork.json';
import ProjectCard from '../components/ui/ProjectCard';
import WhatIfPlaylistCard from '../components/ui/WhatIfPlaylistCard';
import HeroIntro from '../components/ui/HeroIntro';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [selectedCompany, setSelectedCompany] = useState('All companies');
  const [selectedType, setSelectedType] = useState('All types');
  useEffect(() => {
    document.title = "Hamza Ziyard | Product Designer & Creative Developer";
  }, []);

  const companyCards = useMemo(() => companyWorkData.map(company => ({
    id: company.companyId,
    title: company.companyName,
    company: company.companyName.trim(),
    type: company.companyType,
    role: company.role,
    timePeriod: company.timePeriod,
    summary: company.companyDescription,
    gradient: company.gradient || "bg-surface",
    coverImage: company.companyLogo,
    favicon: company.companyFavicon,
    isCompanyCard: true,
    width: company.width || "w-60",
    height: company.height || "h-80"
  })), []);

  const whatIfStackCard = useMemo(() => ({
    id: 'what-if-playlist-stack',
    title: 'What If Series',
    isWhatIfStack: true,
    company: 'What If Series',
    type: 'Case Study Series',
  }), []);

  const allProjects = useMemo(() => {
    const combined = [whatIfStackCard, ...originalProjects, ...companyCards];
    const preferredOrder = ['what-if-playlist-stack', 'pockomint', 'dfcc-bank', 'zafer-work', 'surge-work', 'vetstoria-work'];
    return combined.sort((a, b) => {
      const indexA = preferredOrder.indexOf(a.id);
      const indexB = preferredOrder.indexOf(b.id);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    });
  }, [companyCards, whatIfStackCard]);

  const companies = useMemo(() => ['All companies', ...new Set(allProjects.map(p => p.company).filter(Boolean))], [allProjects]);
  const types = useMemo(() => ['All types', ...new Set(allProjects.map(p => p.type).filter(Boolean))], [allProjects]);

  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      const matchCompany = selectedCompany === 'All companies' || project.company === selectedCompany;
      const matchType = selectedType === 'All types' || project.type === selectedType;
      return matchCompany && matchType;
    });
  }, [allProjects, selectedCompany, selectedType]);

  const columns = useMemo(() => {
    const cols = [[], [], []];
    filteredProjects.forEach((project, index) => {
      cols[index % 3].push({ ...project, filterIndex: index });
    });
    return cols;
  }, [filteredProjects]);

  return (
    <section className='pt-0 px-6 max-w-700 mx-auto'>

      {/* What If Series Promotional Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full lg:mb-4 xl:mb-8 flex justify-center"
      >
        <Link
          to="/what-if"
          className="group relative block w-full lg:w-4/5 xl:w-3/5 p-[3px] md:rounded-full rounded-3xl overflow-hidden shadow-xl"
        >
          {/* Subtle static border background ring */}
          <div className="absolute inset-0 md:rounded-full rounded-3xl bg-zinc-300 dark:bg-zinc-800" />

          {/* Animated Light Beam Traveling Around Outer Perimeter */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-[-200%] pointer-events-none bg-[conic-gradient(from_0deg,transparent_0_300deg,#18181b_340deg,#000000_360deg)] dark:bg-[conic-gradient(from_0deg,transparent_0_300deg,#ffffff_340deg,#f4f4f5_360deg)]"
          />

          {/* Banner Inner Content */}
          <div className="relative z-10 w-full h-full md:rounded-full rounded-3xl bg-zinc-900 dark:bg-gray-100 p-3 lg:p-4">
            <div className="relative flex flex-row items-center justify-between gap-6 overflow-hidden">
              {/* Left Content */}
              <div className="relative z-10 flex-1 text-left px-2 sm:pl-6">
                <h2 className="text-sm md:text-lg lg:text-xl font-semibold tracking-tight text-white dark:text-black text-center lg:text-left">
                  <span className="opacity-70">What If Series:</span>{" "}
                  <span className="inline md:hidden">Redesigning everyday apps with usability heuristics.</span>
                  <span className="hidden md:inline">A deep dive into everyday apps, questioning UX decisions and rebuilding them with usability heuristics.</span>
                </h2>
              </div>

              {/* Right Action / Button */}
              <div className="relative z-10 shrink-0">
                <span className="hidden lg:inline-flex items-center gap-2 px-5 py-3 rounded-full dark:bg-zinc-900 bg-zinc-100 text-black dark:text-white font-semibold text-sm shadow-md">
                  Explore
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      <HeroIntro />

      {/* Filter Bar */}
      {/* <div className="hidden lg:block w-fit mx-auto absolute inset-x-0 bottom-32 z-100 justify-center">
        <div className="flex gap-2 p-2 bg-surface/80 backdrop-blur-xl border border-border shadow-lg rounded-full">
          <div className="flex flex-col md:flex-row gap-2 items-start md:items-end">
            <div className="flex flex-col gap-2">
              <div className="relative">
                <select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="appearance-none bg-background text-primary text-sm rounded-full focus:ring-primary focus:border-primary block w-full md:w-56 p-3 pr-10 cursor-pointer hover:bg-surface transition-colors duration-200 outline-none font-medium"
                >
                  {companies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-secondary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="appearance-none bg-background text-primary text-sm rounded-full focus:ring-primary focus:border-primary block w-full md:w-64 p-3 pr-10 cursor-pointer hover:bg-surface transition-colors duration-200 outline-none font-medium"
                >
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-secondary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {(selectedCompany !== 'All companies' || selectedType !== 'All types') && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => { setSelectedCompany('All companies'); setSelectedType('All types'); }}
                className="text-xs font-bold px-2 text-primary hover:opacity-70 underline underline-offset-4 pb-4 transition-colors duration-200"
              >
                Clear filters
              </motion.button>
            )}
          </div>

        </div>
      </div> */}

      {/* Mobile view: direct sequential list (1 -> 2 -> 3 -> 4 -> 5) */}
      <div className="flex flex-col gap-4 lg:hidden">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                layout: { duration: 0.4 }
              }}
              className="w-full"
            >
              {project.isWhatIfStack ? (
                <WhatIfPlaylistCard />
              ) : (
                <ProjectCard project={project} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Desktop view: 3 masonry columns */}
      <div className="hidden lg:grid gap-8 items-start lg:grid-cols-2 xl:grid-cols-3">
        {columns.map((columnProjects, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4">
            <AnimatePresence>
              {columnProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    delay: project.filterIndex * 0.05,
                    layout: { duration: 0.4 }
                  }}
                  className="w-full"
                >
                  {project.isWhatIfStack ? (
                    <WhatIfPlaylistCard />
                  ) : (
                    <ProjectCard project={project} />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-32 text-center"
        >
          <p className="text-text-secondary text-lg">No projects found matching your filters.</p>
        </motion.div>
      )}
    </section>
  );
}

