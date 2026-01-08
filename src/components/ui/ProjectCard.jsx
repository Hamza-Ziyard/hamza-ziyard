import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function ProjectCard({ project }) {
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

  return (
    <Link
      to={project.isCompanyCard ? `/work/${project.id}` : `/project/${project.id}`}
      className={`group relative block w-full overflow-hidden rounded-lg ${project.gradient || 'bg-neutral-50'} border py-24 px-10 border-white/5`}
    >
      {/* Media */}
      <div ref={containerRef} className="w-full flex justify-center">
        {project.lottie ? (
          <div className="w-full transition-transform duration-700 ease-out group-hover:scale-105">
            {animationData ? (
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop
                className={`${project.width || 'w-full'} ${project.height || 'h-auto'}`}
              />
            ) : (
              <div className={`${project.width || 'w-full'} ${project.height || 'h-96'} bg-neutral-100/50 animate-pulse rounded-xl`}></div>
            )}
          </div>
        ) : (
          <img
            src={'https://assets.hamzaziyard.com' + project.coverImage}
            alt={project.title}
            loading="lazy"
            className={`${project.width || 'w-full'} ${project.height || 'h-auto'} object-contain transition-transform duration-700 ease-out group-hover:scale-105`}
          />
        )}
      </div>

      {/* Reveal Overlay */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
        <div className="flex items-center flex-wrap gap-4 text-lg text-black font-normal">
          {!project.isCompanyCard ? (
            <>
              <div className="px-3 py-1 bg-white rounded-sm shadow-[0_0px_20px_rgba(0,0,0,0.15)]">{project.title}</div>
              <div className="px-3 py-1 bg-white rounded-sm shadow-[0_0px_20px_rgba(0,0,0,0.15)]">{project.company}</div>
              <div className="px-3 py-1 bg-white rounded-sm shadow-[0_0px_20px_rgba(0,0,0,0.15)]">{project.type}</div>
            </>
          ) : (
            <>
              <div className="px-3 py-1 bg-white rounded-sm shadow-[0_0px_20px_rgba(0,0,0,0.15)]">{project.company}</div>
              <div className="px-3 py-1 bg-white rounded-sm shadow-[0_0px_20px_rgba(0,0,0,0.15)]">{project.role}</div>
              <div className="px-3 py-1 bg-white rounded-sm shadow-[0_0px_20px_rgba(0,0,0,0.15)]">{project.timePeriod}</div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
