import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatIfCard({ project }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link
      to={`/what-if/${project.id}`}
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
            View Case Study
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Image Container */}
      <div className="relative block w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-900 border-10 border-white dark:border-zinc-800 transition-colors duration-300">
        <div className="w-full aspect-[16/9] flex items-center justify-center overflow-hidden">
          {(project.thumbnail || project.coverImage) ? (
            <img
              src={project.thumbnail || project.coverImage}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-surface p-6 text-center space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-primary/70">{project.part || 'Part 2'}</span>
              <p className="text-base font-bold text-primary">{project.coverTitle || project.title}</p>
            </div>
          )}
        </div>
      </div>

      {/* Info & Summary below card matching ProjectCard */}
      <div className="flex flex-col gap-2.5 px-4 pb-6">
        {/* Main headline text */}
        <h3 className="text-base md:text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {project.coverTitle || project.title || project.company || 'PROJECT'}
        </h3>

        {/* Part & Posted Date / Metadata */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {project.part || project.timePeriod || 'What If Series'} {project.postedDate ? `• ${project.postedDate}` : ''}
        </p>
      </div>
    </Link>
  );
}
