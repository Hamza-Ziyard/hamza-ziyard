import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import whatIfProjects from '../../data/whatIfProjects.json';

export default function WhatIfPlaylistCard() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Sort projects so the latest one is on top
  const sortedProjects = useMemo(() => {
    return [...whatIfProjects].sort((a, b) => {
      const dateA = a.postedDate ? new Date(a.postedDate).getTime() : 0;
      const dateB = b.postedDate ? new Date(b.postedDate).getTime() : 0;
      if (!isNaN(dateA) && !isNaN(dateB) && dateA !== dateB) {
        return dateB - dateA;
      }
      return whatIfProjects.indexOf(b) - whatIfProjects.indexOf(a);
    });
  }, []);

  // Get the latest featured top project and count
  const featured = sortedProjects[0] || {};
  const count = sortedProjects.length;

  return (
    <Link
      to="/what-if"
      className="group block w-full flex flex-col gap-3 relative cursor-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Floating Custom Cursor Pill */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="pointer-events-none absolute z-50 px-4 py-2 bg-black/90 dark:bg-white/95 backdrop-blur-md text-white dark:text-black font-semibold text-xs rounded-full shadow-xl whitespace-nowrap -translate-x-1/2 -translate-y-1/2 hidden md:block"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
            }}
          >
            View Series
          </motion.div>
        )}
      </AnimatePresence>

      {/* Playlist Stack Wrapper with layered top cards for YouTube Playlist feel */}
      <div className="relative w-full">
        {/* Layer 3 (Backmost top bar) */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-[86%] h-4 rounded-t-xl bg-zinc-300/80 dark:bg-zinc-800/80 border-t border-x border-zinc-300 dark:border-zinc-700/60 shadow-sm transition-transform duration-500 ease-out group-hover:-translate-y-1"
        />

        {/* Layer 2 (Middle stacked bar) */}
        <div
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-[93%] h-4 rounded-t-xl bg-zinc-200/90 dark:bg-zinc-800 border-t border-x border-zinc-300 dark:border-zinc-700/80 shadow-md transition-transform duration-500 ease-out group-hover:-translate-y-0.5"
        />

        {/* Layer 1 (Main Front Card) */}
        <div className="relative z-10 block w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-900 border-10 border-white dark:border-zinc-800 transition-colors duration-300 shadow-lg">
          <div className="w-full aspect-[16/9] flex items-center justify-center overflow-hidden relative">
            <img
              src={featured.thumbnail || featured.coverImage}
              alt="What If Series"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Bottom-right playlist badge like YouTube ("X case studies") */}
            <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-white font-semibold text-xs tracking-tight shadow-md border border-white/10">
              <Play size={12} className="fill-white" />
              <span>{count} {count === 1 ? 'case study' : 'case studies'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info & Summary below card matching YouTube playlist metadata */}
      <div className="flex flex-col gap-2.5 px-4 pb-6">
        <h3 className="text-base md:text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 transition-colors">
          What If Series
        </h3>

        <p className="text-md text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
          A deep dive into everyday apps, questioning core UX decisions and rebuilding them grounded in usability heuristics and cognitive research.
        </p>

        <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5 group-hover:underline underline-offset-4">
          View full series →
        </p>
      </div>
    </Link>
  );
}
