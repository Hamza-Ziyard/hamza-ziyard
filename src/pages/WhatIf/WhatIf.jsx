import { useMemo, useEffect } from 'react';
import whatIfProjects from '../../data/whatIfProjects.json';
import WhatIfCard from '../../components/ui/WhatIfCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatIf() {
  useEffect(() => {
    document.title = "What If? | Hamza Ziyard";
  }, []);

  const projects = useMemo(() => {
    return [...whatIfProjects].sort((a, b) => {
      const dateA = a.postedDate ? new Date(a.postedDate).getTime() : 0;
      const dateB = b.postedDate ? new Date(b.postedDate).getTime() : 0;
      if (!isNaN(dateA) && !isNaN(dateB) && dateA !== dateB) {
        return dateB - dateA;
      }
      return whatIfProjects.indexOf(b) - whatIfProjects.indexOf(a);
    });
  }, []);

  return (
    <section className="pt-0 px-4 md:px-6 max-w-700 mx-auto">
      {/* YouTube Channel Style Banner & Profile Header */}
      <motion.div
        className="w-full max-w-7xl mx-auto pt-1 pb-10 md:pb-12"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Cover Banner Image */}
        {/* <div className="w-full aspect-[4/1] min-h-[140px] max-h-[220px] md:max-h-[260px] rounded-2xl md:rounded-3xl overflow-hidden relative border border-border bg-gray-100 dark:bg-zinc-900">
          <img
            src="https://assets.hamzaziyard.com/projects-for-fun/What%20If%20Series/Redesigned%20Banner.webp"
            alt="What If Series Banner"
            className="w-full h-full object-cover"
          />
        </div> */}

        {/* Channel Details Section */}
        <div className="flex flex-col md:flex-row items-start sm:items-center gap-5 md:gap-7 pt-5 px-1 md:px-3">
          {/* Avatar with memoji */}
          <div className="relative shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full p-1 bg-background border border-border shadow-sm">
            <div className="w-full h-full rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
              <img
                src="/my-memoji/me.png"
                alt="Profile Memoji"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info Column */}
          <div className="flex-1 space-y-2.5 pt-1">
            {/* Channel Name & Verified Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl lg:text-4xl font-bold tracking-tight text-text-primary">
                What If I Redesigned Apps
              </h1>
            </div>

            {/* Handle, Subscribers, Videos Stats */}
            <div className="flex items-center gap-2 text-xs sm:text-lg lg:text-xl text-text-secondary flex-wrap font-medium">
              <span>{projects.length} {projects.length === 1 ? 'case study' : 'case studies'}</span>
            </div>

            {/* Description without more button */}
            <div className="text-xs sm:text-lg lg:text-xl text-text-secondary leading-relaxed">
              <p>
                An independent conceptual redesign series exploring core flows grounded in usability heuristics and cognitive research, created purely for educational and study purposes.
              </p>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Separator */}
      <hr className="border-t border-border max-w-7xl mx-auto mb-10 md:mb-12" />

      {/* 2 column grid with vertical scroll */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-7xl mx-auto">
        <AnimatePresence>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                layout: { duration: 0.4 },
              }}
              className="w-full"
            >
              <WhatIfCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
