import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function ProjectCard({ project }) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const lottieRef = useRef(null);
  const [animationData, setAnimationData] = useState(null);
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView && project.lottie && typeof project.lottie === 'string') {
      fetch(project.lottie)
        .then(res => res.json())
        .then(data => setAnimationData(data))
        .catch(err => console.error("Failed to load Lottie for card:", err));
    } else if (project.lottie && typeof project.lottie === 'object') {
      setAnimationData(project.lottie);
    }
  }, [inView, project.lottie]);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.6);
    }
  }, [animationData]);

  const isSurge = project.id?.includes('surge') || project.company?.toLowerCase().includes('surge');
  const isReducedFavicon = isDarkMode && project.isCompanyCard && project.favicon && !isSurge;

  const isVideo = project.isVideo || (typeof project.coverImage === 'string' && project.coverImage.endsWith('.mp4'));

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const hoverLabel = !project.isCompanyCard ? 'View Case Study' : 'View Work';

  return (
    <Link
      to={project.link || (project.isCompanyCard ? `/work/${project.id}` : `/project/${project.id}`)}
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
            {hoverLabel}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Image Container */}
      <div className="relative block w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-900 border-10 border-white dark:border-zinc-800 transition-colors duration-300">
        {/* Media */}
        <div ref={containerRef} className="w-full aspect-[16/9] flex items-center justify-center overflow-hidden p-3 md:p-4">
          {isVideo ? (
            <div className="relative h-[85%] aspect-[9/19.5] rounded-2xl p-0.5 md:p-1 bg-black border border-zinc-800/50 shadow-lg transition-transform duration-700 ease-out">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
                <video
                  src={project.coverImage.startsWith('http') ? project.coverImage : 'https://assets.hamzaziyard.com' + project.coverImage}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          ) : project.lottie ? (
            <div className="w-full h-full flex justify-center items-center transition-transform duration-700 ease-out group-hover:scale-105">
              {animationData ? (
                <Lottie
                  lottieRef={lottieRef}
                  animationData={animationData}
                  loop
                  className="w-full h-full max-h-28 md:max-h-32 object-contain"
                />
              ) : (
                <div className="w-28 md:w-36 h-20 md:h-24 bg-gray-100 dark:bg-zinc-900 animate-pulse rounded-xl"></div>
              )}
            </div>
          ) : (
            <img
              src={
                project.coverImage.startsWith('http') || project.coverImage.startsWith('/dfcc-assets')
                  ? project.coverImage
                  : 'https://assets.hamzaziyard.com' + (isDarkMode && project.isCompanyCard && project.favicon ? project.favicon : project.coverImage)
              }
              alt={project.title}
              loading="lazy"
              className={`${
                project.fullBleed
                  ? 'w-full h-full object-cover'
                  : isReducedFavicon
                  ? 'w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain'
                  : project.isCompanyCard
                  ? 'max-w-[36%] max-h-[36%] object-contain'
                  : project.id === 'dfcc-bank'
                  ? 'h-[75%] w-auto object-contain drop-shadow-md rounded-t-lg'
                  : 'max-w-[65%] max-h-[65%] object-contain'
              } transition-transform duration-700 ease-out group-hover:scale-105`}
            />
          )}
        </div>
      </div>

      {/* Info & Summary below card */}
      <div className="flex flex-col gap-2.5 px-4 pb-6">
        {/* Main headline text */}
        <h3 className="text-base md:text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {!project.isCompanyCard ? (
            `${project.coverTitle || project.title || project.company || 'PROJECT'}`
          ) : (
            `${project.company || 'COMPANY'}`
          )}
        </h3>
        {/* Subtitle / Metadata */}
        <p className="text-md text-zinc-500 dark:text-zinc-400">
          {project.summary || project.title || project.company}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {!project.isCompanyCard ? (
            `${project.type ? ` ${project.type}` : ''} ${project.timePeriod ? `• ${project.timePeriod}` : ''}`
          ) : (
            `${project.role ? `${project.role}` : ''} ${project.timePeriod ? `• ${project.timePeriod}` : ''}`
          )}
        </p>
      </div>
    </Link>
  );
}
