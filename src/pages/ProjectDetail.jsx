import { useParams, Navigate } from 'react-router-dom';
import projects from '../data/projects.json';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { useState, useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';

const LottieBlock = ({ url, height, caption }) => {
  const [animationData, setAnimationData] = useState(null);
  const lottieRef = useRef(null);
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else if (lottieRef.current) {
          lottieRef.current.pause();
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
    if (!url || !inView || animationData) return;
    if (typeof url === 'object') {
      setAnimationData(url);
      return;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Failed to load Lottie:", err));
  }, [url, inView, animationData]);

  useEffect(() => {
    if (inView && lottieRef.current) {
      lottieRef.current.play();
      lottieRef.current.setSpeed(0.8);
    }
  }, [inView, animationData]);

  if (!animationData) return <div ref={containerRef} className={`bg-neutral-100 rounded-2xl animate-pulse ${height || 'h-96'}`}></div>;

  return (
    <div className="space-y-4">
      <div ref={containerRef} className={`bg-neutral-50 rounded-2xl overflow-hidden flex items-center justify-center ${height || 'h-auto'}`}>
        <Lottie lottieRef={lottieRef} animationData={animationData} loop={true} autoplay={false} className="w-full h-full" />
      </div>
      {caption && <p className="text-sm text-neutral-400 font-medium text-center">{caption}</p>}
    </div>
  );
};

const InlineLottie = ({ animationData }) => {
  const lottieRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lottieRef.current?.play();
        } else {
          lottieRef.current?.pause();
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
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.8);
    }
  }, [animationData]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Lottie lottieRef={lottieRef} animationData={animationData} loop={true} autoplay={false} className="w-full h-full" />
    </div>
  );
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  if (!project) return <Navigate to="/" replace />;

  const sections = useMemo(() => {
    let baseSections = [];
    if (project && Array.isArray(project.sections)) {
      baseSections = project.sections.map(s => ({
        id: s.id || s.title.toLowerCase().replace(/\s+/g, '-'),
        label: s.title,
        enabled: true
      }));
    } else if (project) {
      // Legacy support (Only Redesign kept)
      baseSections = [
        { id: 'redesign', label: 'Redesign', enabled: project.sections?.redesign?.enabled }
      ].filter(s => s.enabled);
    }
    return baseSections;
  }, [project]);

  const [activeTab, setActiveTab] = useState(sections[0]?.id || '');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Adjust for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveTab(id);
    }
  };

  useEffect(() => {
    if (sections.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveTab(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-20% 0px -55% 0px',
          threshold: 0.1
        }
      );

      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });

      return () => observer.disconnect();
    }
  }, [sections]);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">

        {/* Project Header */}
        <section className="mb-16 mt-8 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-12 text-center md:text-left"
          >
            <div className="flex-1 space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <h1 className="text-5xl md:text-5xl font-bold tracking-tight text-neutral-900">{project.title}</h1>
              </div>
              <p className="text-xl text-neutral-500 max-w-7xl leading-relaxed font-light">{project.summary}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-12 pt-4">
                <div className="space-y-1">
                  <h4 className="text-sm text-neutral-500">Service</h4>
                  <p className="text-lg font-bold text-neutral-800">{project.type}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm text-neutral-500">Platforms</h4>
                  <p className="text-lg font-bold text-neutral-800">{project.platforms}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm text-neutral-500">Roles</h4>
                  <p className="text-lg font-bold text-neutral-800">{project.role}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm text-neutral-500">Tools</h4>
                  <div className="flex flex-wrap gap-2 pt-1 justify-center md:justify-start">
                    {project.tools.map(tool => (
                      <span key={tool} className="px-3 py-0.5 bg-neutral-100 border border-neutral-200 rounded-full text-xs font-bold text-neutral-700">{tool}</span>
                    ))}
                  </div>
                </div>
                {project.company && (
                  <div className="space-y-1">
                    <h4 className="text-sm text-neutral-500">Company</h4>
                    <p className="text-lg font-bold text-neutral-800">{project.company}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Project Hero Media (Moved from Overview section) */}
          {/* <motion.div 
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             className="relative aspect-video w-full rounded-3xl overflow-hidden bg-neutral-50 border border-neutral-100 flex items-center justify-center p-8 md:p-16"
           >
              {project.lottie ? (
                 typeof project.lottie === 'string' ? (
                   <LottieBlock url={project.lottie} height="h-full" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center">
                     <InlineLottie animationData={project.lottie} />
                   </div>
                 )
              ) : (
                <img src={project.coverImage} alt={project.title} className="w-full h-full object-contain" />
              )}
           </motion.div> */}
        </section>

        {/* Sticky Tab Navigation (Scroll Spy Style) */}
        {sections.length > 0 && (
          <div className="sticky top-0 z-50 py-4 bg-white/80 backdrop-blur-xl border-b border-neutral-200 mb-12">
            <div className="flex gap-2 overflow-x-auto p-1.5 no-scrollbar bg-neutral-100 border border-white/10 w-fit rounded-full">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={clsx(
                    "px-5 py-2 rounded-full text-md transition-all duration-300 cursor-pointer whitespace-nowrap",
                    activeTab === section.id
                      ? "bg-white text-black font-bold shadow-sm"
                      : "text-neutral-700 hover:bg-white/5 font-medium"
                  )}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className=" space-y-48 mb-64">
          {/* Dynamic & Legacy Sections */}
          {Array.isArray(project.sections) ? (
            project.sections.map((section) => {
              const sectionId = section.id || section.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <section key={sectionId} id={sectionId} className="scroll-mt-48 space-y-12">
                  <div className="flex items-center gap-3">
                    <span className="w-1 h-6 rounded-full bg-neutral-900"></span>
                    <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{section.title}</h2>
                  </div>
                  <div className="space-y-16">
                    {section.content && <p className="text-xl text-neutral-500 leading-relaxed max-w-4xl">{section.content}</p>}
                    {section.blocks?.map((block, idx) => {
                      if (block.type === 'text') {
                        return <p key={idx} className="text-xl text-neutral-500 leading-relaxed max-w-4xl">{block.content}</p>;
                      }
                      if (block.type === 'image') {
                        return (
                          <figure key={idx} className="space-y-4">
                            <img src={block.url} alt={block.caption || ''} loading="lazy" className={`rounded-2xl border border-neutral-100 shadow-sm ${block.width === 'full' ? 'w-full' : 'max-w-4xl'}`} />
                            {block.caption && <figcaption className="text-sm text-neutral-400 font-medium text-center">{block.caption}</figcaption>}
                          </figure>
                        );
                      }
                      if (block.type === 'grid') {
                        return (
                          <div key={idx} className={`grid gap-8 ${block.columns === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
                            {block.images.map((img, i) => (
                              <div key={i} className="space-y-2">
                                <div className="rounded-2xl overflow-hidden border border-neutral-100 shadow-sm bg-neutral-50">
                                  <img src={img.url} alt={img.caption || ''} loading="lazy" className="w-full h-auto object-cover transition-transform duration-700 hover:scale-[1.02]" />
                                </div>
                                {img.caption && <p className="text-sm text-neutral-400 text-center font-medium">{img.caption}</p>}
                              </div>
                            ))}
                          </div>
                        );
                      }
                      if (block.type === 'lottie') {
                        return <LottieBlock key={idx} url={block.url} height={block.height} caption={block.caption} />;
                      }
                      if (block.type === 'comparison') {
                        return (
                          <div key={idx} className="bg-neutral-900 p-8 md:p-12 rounded-3xl border border-white/5">
                            <p className="text-xl text-neutral-300 mb-12 max-w-3xl leading-relaxed">{block.content}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                <span className="inline-block px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold border border-rose-500/20">BEFORE</span>
                                <img src={block.beforeImage} loading="lazy" className="rounded-xl w-full grayscale opacity-60 border border-white/5" />
                              </div>
                              <div className="space-y-4">
                                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">AFTER</span>
                                <img src={block.afterImage} loading="lazy" className="rounded-xl w-full shadow-2xl border border-blue-500/10" />
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </section>
              );
            })
          ) : (
            <>
              {/* Legacy Redesign Fallback */}
              {project.sections?.redesign?.enabled && (
                <section id="redesign" className="scroll-mt-48 space-y-12">
                  <h2 className="text-3xl font-bold text-neutral-900 tracking-tight flex items-center gap-4">
                    <span className="w-2 h-8 bg-rose-500 rounded-full"></span>
                    Redesign Exploration
                  </h2>
                  <div className="bg-neutral-900 p-8 md:p-12 rounded-3xl border border-white/5">
                    <p className="text-xl text-neutral-300 mb-12 max-w-3xl leading-relaxed">{project.sections.redesign.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold border border-rose-500/20">BEFORE</span>
                        <img src={project.sections.redesign.beforeImage} loading="lazy" className="rounded-xl w-full grayscale opacity-60 border border-white/5" />
                      </div>
                      <div className="space-y-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">AFTER</span>
                        <img src={project.sections.redesign.afterImage} loading="lazy" className="rounded-xl w-full shadow-2xl border border-blue-500/10" />
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
