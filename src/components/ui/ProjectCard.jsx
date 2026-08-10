import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
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

  return (
    <Link
      to={project.link || (project.isCompanyCard ? `/work/${project.id}` : `/project/${project.id}`)}
      className={`group relative block w-full overflow-hidden rounded-lg ${project.gradient || 'bg-surface'} border py-10 px-5 md:py-14 lg:py-24 md:px-8 lg:px-10 border-border/50 transition-colors duration-300`}
    >
      {/* Media */}
      <div ref={containerRef} className="w-full h-52 md:h-64 lg:h-96 flex items-center justify-center">
        {isVideo ? (
          <div className="relative h-full aspect-[9/19.5] rounded-4xl p-1 md:p-1.5 bg-black border border-zinc-800/50 shadow-lg transition-transform duration-700 ease-out group-hover:scale-105">
            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-black flex items-center justify-center">
              <video
                src={project.coverImage.startsWith('http') ? project.coverImage : 'https://assets.hamzaziyard.com' + project.coverImage}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        ) : project.lottie ? (
          <div className="w-full max-h-24 md:max-h-36 lg:max-h-full max-w-[70%] lg:max-w-full flex justify-center items-center transition-transform duration-700 ease-out group-hover:scale-105">
            {animationData ? (
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop
                className={`w-32 md:w-44 lg:${project.width || 'w-full'} h-20 md:h-28 lg:${project.height || 'h-auto'} object-contain`}
              />
            ) : (
              <div className={`w-32 md:w-44 lg:${project.width || 'w-full'} h-20 md:h-28 lg:${project.height || 'h-96'} bg-surface/50 animate-pulse rounded-xl`}></div>
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
              isReducedFavicon
                ? 'w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24'
                : project.isCompanyCard
                ? 'w-48 md:w-56 lg:w-72 max-h-32 md:max-h-40 lg:max-h-48 object-contain'
                : project.id === 'dfcc-bank'
                ? 'w-auto max-w-full h-auto max-h-[220px] md:max-h-[300px] lg:max-h-[360px] object-contain border-black border-t-[6px] border-x-[6px]'
                : project.width === 'w-full'
                ? 'w-full h-full object-contain'
                : `w-32 md:w-44 lg:${project.width || 'w-60'} h-20 md:h-28 lg:${project.height || 'h-80'} object-contain`
            } transition-transform duration-700 ease-out group-hover:scale-105`}
          />
        )}
      </div>

      {/* Tags Info */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-2 transition-all duration-300">
        <div className="flex items-center flex-wrap gap-2 text-sm text-primary font-normal">
          {!project.isCompanyCard ? (
            <>
              <div className="px-3 py-1 bg-background/90 backdrop-blur-md border border-border/50 rounded-sm shadow-xl">{project.title}</div>
              <div className="px-3 py-1 bg-background/90 backdrop-blur-md border border-border/50 rounded-sm shadow-xl">{project.company}</div>
              <div className="px-3 py-1 bg-background/90 backdrop-blur-md border border-border/50 rounded-sm shadow-xl">{project.type}</div>
            </>
          ) : (
            <>
              <div className="px-3 py-1 bg-background/90 backdrop-blur-md border border-border/50 rounded-sm shadow-xl">{project.company}</div>
              <div className="px-3 py-1 bg-background/90 backdrop-blur-md border border-border/50 rounded-sm shadow-xl">{project.role}</div>
              <div className="px-3 py-1 bg-background/90 backdrop-blur-md border border-border/50 rounded-sm shadow-xl">{project.timePeriod}</div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
