import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import companyWorkData from '../data/companyWork.json';
import clsx from 'clsx';

// Lottie Component with fetch support (similar to ProjectDetail)
const LottieRenderer = ({ url }) => {
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
    }
  }, [inView, animationData]);

  if (!animationData) return <div ref={containerRef} className="w-full aspect-video bg-neutral-100 animate-pulse rounded-2xl" />;

  return (
    <div ref={containerRef} className="w-full aspect-video flex items-center justify-center bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={true}
        autoplay={false}
        className="w-full h-full"
      />
    </div>
  );
};

// Media Item Component
const MediaItem = ({ media, isWeb }) => {
  if (media.type === 'image') {
    return (
      <div className={clsx(
        "w-full overflow-hidden rounded-lg md:rounded-4xl border-2 border-neutral-300 shadow-sm bg-[#F5F3F3]",
        isWeb && "!border-0 md:rounded-xl p-3"
      )}>
        <img
          src={'https://assets.hamzaziyard.com' + media.src}
          alt=""
          loading="lazy"
          className="w-full h-auto object-contain"
        />
      </div>
    );
  }

  if (media.type === 'video') {
    return (
      <div className="w-full overflow-hidden rounded-2xl border border-neutral-100 shadow-sm bg-black">
        <video
          src={'https://assets.hamzaziyard.com' + media.src}
          className="w-full h-auto"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
      </div>
    );
  }

  if (media.type === 'lottie') {
    return <LottieRenderer url={'https://assets.hamzaziyard.com' + media.src} />;
  }

  return null;
};

// Media Carousel Component with Arrow Navigation
const MediaCarousel = ({ media, activeTab }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 20);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [media]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  if (activeTab === 'Website') {
    return (
      <div className="w-full">
        {media?.slice(0, 1).map((mediaItem, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <MediaItem media={mediaItem} isWeb={activeTab === 'Web' || activeTab === 'Website'} />
            <p className="text-center text-neutral-500 font-semibold mt-4 italic text-sm">{mediaItem.caption}</p>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="group relative">
      {/* Arrows */}
      <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10 transition-all duration-300 pointer-events-none">
        <button
          onClick={() => scroll('left')}
          disabled={!showLeftArrow}
          className={clsx(
            "p-3 rounded-full bg-white shadow-xl border border-neutral-100 pointer-events-auto hover:scale-110 active:scale-95 disabled:opacity-0 disabled:scale-90",
            !showLeftArrow && "invisible"
          )}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      </div>

      <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10 transition-all duration-300 pointer-events-none">
        <button
          onClick={() => scroll('right')}
          disabled={!showRightArrow}
          className={clsx(
            "p-3 rounded-full bg-white shadow-xl border border-neutral-100 pointer-events-auto hover:scale-110 active:scale-95 disabled:opacity-0 disabled:scale-90",
            !showRightArrow && "invisible"
          )}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>

      {/* Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
      >
        {media?.map((mediaItem, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className={clsx(
              "shrink-0 snap-start",
              activeTab === 'Web'
                ? "lg:w-[calc((100%-1.5rem)/2)] w-[calc((100%-1.5rem)/1)]"
                : "xl:w-[calc((100%-6rem)/6)] lg:w-[calc((100%-6rem)/5)] md:w-[calc((100%-6rem)/3)] w-[calc((100%-6rem)/2)]"
            )}
          >
            <MediaItem media={mediaItem} isWeb={activeTab === 'Web' || activeTab === 'Website'} />
            <p className="text-center text-neutral-500 font-semibold mt-4 italic text-sm">{mediaItem.caption}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function ProjectDetailWork() {
  const { id } = useParams();
  const navigate = useNavigate();
  const companyData = useMemo(() => {
    return companyWorkData.find(c => c.companyId === id) || companyWorkData[0];
  }, [id]);

  const [activeProjectId, setActiveProjectId] = useState('');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const projectsByPlatform = companyData?.projects || {};

  const tabs = useMemo(() => {
    const allPossibleTabs = ['Web', 'iOS', 'Android', 'Website'];
    return allPossibleTabs.filter(tab => projectsByPlatform[tab] && projectsByPlatform[tab].length > 0);
  }, [projectsByPlatform]);

  const [activeTab, setActiveTab] = useState(tabs[0] || 'Web');

  const currentProjects = useMemo(() => {
    return projectsByPlatform[activeTab] || [];
  }, [activeTab, projectsByPlatform]);

  useEffect(() => {
    if (tabs.length > 0 && !tabs.includes(activeTab)) {
      setActiveTab(tabs[0]);
    }
  }, [tabs, activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentProjects.length > 0) {
      setActiveProjectId(currentProjects[0].id);
    } else {
      setActiveProjectId('');
    }
  }, [currentProjects]);

  // Scroll Spy logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveProjectId(entry.target.id);
          }
        });
      },
      {
        // Creates a narrow trigger band near the top of the screen (around 150px down)
        // This ensures the update happens exactly when the project title hits the focus area
        rootMargin: '-150px 0px -80% 0px',
        threshold: 0
      }
    );

    currentProjects.forEach((project) => {
      const element = document.getElementById(project.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [currentProjects, activeTab]);

  const scrollToProject = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Adjust for header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveProjectId(id);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (!companyData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-500">Company not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-12">

        {/* Back Button */}
        {/* <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 px-6 pr-10 py-2 border border-neutral-200 rounded-full text-neutral-500 hover:text-black transition-colors mb-4 -ml-4"
        >
          <div className="p-2 rounded-full group-hover:bg-neutral-100 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="font-medium">Exit</span>
        </motion.button> */}

        {/* Company Header */}
        <section className="mb-16 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-12 text-center md:text-left"
          >
            <div className="w-40 h-40 bg-neutral-50 rounded-[2.5rem] border border-neutral-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm transition-shadow hover:shadow-md">
              <img src={'https://assets.hamzaziyard.com' + companyData.companyFavicon} alt={companyData.companyName} loading="lazy" className="w-24 h-24 object-contain" />
            </div>
            <div className="flex-1 space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <h1 className="text-5xl md:text-5xl font-bold tracking-tight text-neutral-900">{companyData.companyName}</h1>
              </div>
              <p className="text-lg text-neutral-500 leading-relaxed font-light">{companyData.companyDescription}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-12 pt-4">
                <div className="space-y-1">
                  <h4 className="text-sm text-neutral-500">Service</h4>
                  <p className="text-lg font-bold text-neutral-800">{companyData.companyType}</p>
                </div>
                {tabs.length > 0 && (
                  <div className="space-y-1">
                    <h4 className="text-sm text-neutral-500">Platforms</h4>
                    <p className="text-lg font-bold text-neutral-800">{[...new Set(tabs.map(t => t === 'Website' ? 'Web' : t))].join(', ')}</p>
                  </div>
                )}
                <div className="space-y-1">
                  <h4 className="text-sm text-neutral-500">Role</h4>
                  <p className="text-lg font-bold text-neutral-800">{companyData.role}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm text-neutral-500">Time period</h4>
                  <p className="text-lg font-bold text-neutral-800">{companyData.timePeriod}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {tabs.length > 0 && (
          <>
            {/* Navigation Tabs (Primary Filter) */}
            <div className="sticky top-0 z-50 py-3 bg-white/80 backdrop-blur-xl border-b border-neutral-200">
              <div className="flex gap-2 overflow-x-auto p-1.5 no-scrollbar bg-neutral-100 border border-white/10 w-fit rounded-full">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={clsx(
                      "px-5 py-2 rounded-full text-md transition-all duration-300 cursor-pointer",
                      activeTab === tab
                        ? "bg-white text-black font-bold"
                        : "text-neutral-700 hover:bg-white/5 font-medium"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 xl:gap-16">

              {/* Side Navigation (Per Tab) */}
              <aside className="xl:w-72 shrink-0 pt-12 p-0">
                <div className="xl:sticky xl:top-24">
                  <nav className="flex xl:flex-col overflow-x-auto xl:overflow-x-visible pb-4 xl:pb-0 gap-1.5 no-scrollbar">
                    {currentProjects.map((project) => (
                      <button
                        key={project.id}
                        onClick={() => scrollToProject(project.id)}
                        className={clsx(
                          "shrink-0 text-left px-4 py-2 rounded-2xl text-base font-medium transition-all duration-300 group cursor-pointer",
                          activeProjectId === project.id
                            ? "text-blue-500"
                            : "text-neutral-700 hover:text-neutral-800"
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="truncate">{project.title}</span>
                          <span className="text-neutral-400 text-sm font-normal">{project.media?.length || 0}</span>
                        </div>
                      </button>
                    ))}
                    {currentProjects.length === 0 && (
                      <div className="px-5 py-8 text-sm text-neutral-400 italic bg-neutral-50 rounded-2xl border border-dashed border-neutral-200 text-center">
                        No projects for {activeTab}
                      </div>
                    )}
                  </nav>
                </div>
              </aside>

              {/* Main Content Area */}
              <main className="flex-1 space-y-48 mb-64 pt-0 xl:pt-14">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-32"
                  >
                    {currentProjects.map((project) => (
                      <section
                        key={project.id}
                        id={project.id}
                        className="scroll-mt-32 space-y-16"
                      >
                        <div className="space-y-12">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <span className="w-1 h-6 rounded-full bg-neutral-900"></span>
                              <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">{project.title}</h2>
                            </div>

                            <div className="flex flex-col mt-8">
                              {project.problemStatement && (
                                <div className=" grid grid-cols-1 md:grid-cols-4  border border-neutral-200 rounded-t-xl">
                                  <h4 className="font-semibold p-4 text-md text-neutral-600 bg-neutral-50  rounded-tl-xl">
                                    Problem statement :
                                  </h4>
                                  <p className="border-l border-neutral-200 p-4 text-lg text-neutral-600 leading-relaxed font-light col-span-3">{project.problemStatement}</p>
                                </div>
                              )}
                              {project.solution && (
                                <div className=" grid grid-cols-1 md:grid-cols-4 border border-t-0 border-neutral-200  rounded-b-xl">
                                  <h4 className="font-semibold p-4 text-md text-neutral-600 bg-neutral-50 rounded-bl-xl">
                                    Solution :
                                  </h4>
                                  <p className="border-l border-neutral-200 p-4 text-lg text-neutral-600 leading-relaxed font-light col-span-3">{project.solution}</p>
                                </div>
                              )}
                              {project.achievements && (
                                <div className=" grid grid-cols-1 md:grid-cols-4 border border-neutral-200 rounded-xl mt-4">
                                  <h4 className="font-semibold p-4 text-md text-neutral-600 bg-neutral-50  rounded-bl-xl rounded-tl-xl">
                                    Impact & results :
                                  </h4>
                                  <p className="border-l border-neutral-200 p-4 text-lg text-neutral-600 leading-relaxed font-bold italic col-span-3">"{project.achievements}"</p>
                                </div>

                              )}
                              {project.task && (
                                <div className=" grid grid-cols-1 md:grid-cols-4 border border-neutral-200 rounded-xl mt-4">
                                  <h4 className="font-semibold p-4 text-md text-neutral-600 bg-neutral-50  rounded-bl-xl rounded-tl-xl">
                                    Task :
                                  </h4>
                                  <p className="border-l border-neutral-200 p-4 text-lg text-neutral-600 leading-relaxed font-light col-span-3">{project.task}</p>
                                </div>

                              )}
                            </div>
                          </div>

                          <MediaCarousel media={project.media} activeTab={activeTab} />
                        </div>
                      </section>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </main>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-60 p-4 bg-black text-white rounded-full shadow-2xl border border-neutral-100 hover:scale-110 active:scale-95 transition-all group cursor-pointer"
            aria-label="Back to top"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=""
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
