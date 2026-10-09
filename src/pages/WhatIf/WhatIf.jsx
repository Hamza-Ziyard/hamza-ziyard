import { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Share } from 'lucide-react';
import whatIfProjects from '../../data/whatIfProjects.json';

export default function WhatIf() {
  const [copied, setCopied] = useState(false);

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

  const firstProject = projects[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-500 mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
        
        {/* Left Sidebar (2/5): YouTube Playlist Hero Card & Details with full height styling */}
        <aside className="w-full lg:w-1/4 shrink-0 lg:sticky lg:top-24">
          <div className="relative rounded-xl overflow-hidden p-5 md:p-6 xl:p-7 bg-linear-to-t from-gray-100 via-gray-100/90 to-gray-200/80 dark:from-zinc-900 dark:via-zinc-900/95 dark:to-zinc-950 border border-border flex flex-col justify-between lg:min-h-[calc(100vh-8rem)]">
            <div>
              {/* Profile Pic Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-6 p-1 bg-white dark:bg-zinc-800 border border-border shadow-sm">
                <div className="w-full h-full rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center overflow-hidden">
                  <img
                    src="/my-memoji/me.png"
                    alt="Hamza Ziyard"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Playlist Title */}
              <h1 className="text-xl xl:text-2xl font-bold tracking-tight text-text-primary mb-3 leading-tight">
                What If I Redesigned Everyday Apps
              </h1>

              {/* Metadata / Creator Info */}
              <div className="text-xs sm:text-sm text-text-secondary font-medium mb-4">
                <span>By Hamza Ziyard • {projects.length} {projects.length === 1 ? 'case study' : 'case studies'}</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                An independent conceptual redesign series exploring core flows grounded in usability heuristics and cognitive research, created purely for educational and study purposes.
              </p>

              {/* Share Button placed below description */}
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 bg-[#1a1a1a] dark:bg-[#262626] text-white hover:opacity-90 transition-all font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full hover:scale-105 duration-200 cursor-pointer relative"
                  title="Share playlist"
                  aria-label="Share playlist"
                >
                  <Share size={14} />
                  <span>Share</span>
                  <AnimatePresence>
                    {copied && (
                      <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: -28 }}
                        exit={{ opacity: 0 }}
                        className="absolute left-1/2 -translate-x-1/2 px-2.5 py-1 text-[11px] bg-black text-white dark:bg-white dark:text-black rounded-md shadow-lg whitespace-nowrap font-semibold pointer-events-none"
                      >
                        Link copied!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Right List (3/5): YouTube Playlist Video Items */}
        <div className="w-full lg:w-3/4 space-y-2 pb-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <Link
                to={`/what-if/${project.id}`}
                className={`group flex items-start gap-6 p-0 md:p-2 xl:p-4 hover:bg-black/5 hover:rounded-xl dark:hover:bg-white/5 transition-colors bg-border-100 ${index !== projects.length - 1 ? 'border-b border-border lg:pb-8!' : ''}`}
              >

                {/* Thumbnail */}
                <div className="relative w-40 sm:w-48 md:w-64 aspect-video rounded-md overflow-hidden shrink-0 bg-gray-100 dark:bg-zinc-900 border-4 sm:border-6 border-white dark:border-zinc-800 shadow-sm transition-colors duration-300">
                  <img
                    src={project.thumbnail || project.coverImage}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {project.part && (
                    <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-black/80 text-white backdrop-blur-xs">
                      {project.part}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 py-2 space-y-1.5">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-text-primary group-hover:text-blue-500 transition-colors leading-snug line-clamp-1">
                    {project.title || project.coverTitle}
                  </h2>

                  {project.summary && (
                    <p className="text-xs lg:text-sm text-text-secondary leading-relaxed line-clamp-1 sm:line-clamp-2">
                      {project.summary}
                    </p>
                  )}



                  <p className="text-xs lg:text-sm text-text-secondary font-medium">
                    Hamza Ziyard
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
