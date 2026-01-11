import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import companyWorkData from '../data/companyWork.json';
import clsx from 'clsx';

// Lottie Component with fetch support (similar to ProjectDetail)
const LottieRenderer = ({ url, aspectRatio = "aspect-video" }) => {
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

  if (!animationData) return <div ref={containerRef} className={clsx("w-full bg-surface animate-pulse rounded-2xl", aspectRatio)} />;

  return (
    <div ref={containerRef} className={clsx("w-full flex items-center justify-center bg-surface rounded-2xl overflow-hidden border border-border/50", aspectRatio)}>
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
const MediaItem = ({ media, isWeb, onClick }) => {
  const isMobile = media.src.toLowerCase().includes('ios') || media.src.toLowerCase().includes('android');
  const aspectRatio = isWeb ? "aspect-video" : (isMobile ? "aspect-[9/19.5]" : "aspect-video");

  if (media.type === 'image') {
    return (
      <div
        onClick={onClick}
        className={clsx(
          "w-full overflow-hidden rounded-3xl md:rounded-4xl border-2 border-border shadow-sm bg-surface cursor-pointer group/media",
          isWeb && "!border-0 md:rounded-xl p-3"
        )}>
        <img
          src={'https://assets.hamzaziyard.com' + media.src}
          alt={media.caption || "Project media"}
          loading="lazy"
          className="w-full h-full object-contain "
          onLoad={(e) => {
            // Remove fixed aspect ratio once loaded if we want to allow natural height
            // But for now, keeping it fixed prevents layout shifts entirely
          }}
        />
      </div>
    );
  }

  if (media.type === 'video') {
    return (
      <div className={clsx("w-full overflow-hidden rounded-2xl border border-border/50 shadow-sm bg-black", aspectRatio)}>
        <video
          src={'https://assets.hamzaziyard.com' + media.src}
          className="w-full h-full object-contain"
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
    return <LottieRenderer url={'https://assets.hamzaziyard.com' + media.src} aspectRatio={aspectRatio} />;
  }

  return null;
};

// Media Carousel Component with Arrow Navigation
const MediaCarousel = ({ media, activeTab, onMediaClick }) => {
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
            <MediaItem media={mediaItem} isWeb={activeTab === 'Web' || activeTab === 'Website'} onClick={() => onMediaClick(idx, media)} />
            <p className="text-center text-text-secondary font-semibold mt-4 italic text-sm">{mediaItem.caption}</p>
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
            "p-3 rounded-full bg-background shadow-xl border border-border/50 text-primary pointer-events-auto hover:scale-110 active:scale-95 disabled:opacity-0 disabled:scale-90",
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
            "p-3 rounded-full bg-background shadow-xl border border-border/50 text-primary pointer-events-auto hover:scale-110 active:scale-95 disabled:opacity-0 disabled:scale-90",
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
            <MediaItem media={mediaItem} isWeb={activeTab === 'Web' || activeTab === 'Website'} onClick={() => onMediaClick(idx, media)} />
            <p className="text-center text-text-secondary font-semibold mt-4 italic text-sm">{mediaItem.caption}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Media Modal Component for Expanded View
const MediaModal = ({ isOpen, onClose, mediaList, initialIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [initialIndex, isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, mediaList]);

  if (!isOpen || !mediaList || mediaList.length === 0) return null;

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % mediaList.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl p-4 md:p-12"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 p-3 rounded-full bg-surface border border-border/50 text-primary hover:scale-110 active:scale-95 transition-all z-110"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>

      {/* Main Content */}
      <div className="relative w-full max-w-7xl flex-1 flex flex-col items-center justify-center gap-8" onClick={(e) => e.stopPropagation()}>

        {/* Navigation Arrows */}
        {mediaList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 lg:-left-20 top-1/2 -translate-y-1/2 p-4 rounded-full bg-surface border border-border/50 text-primary hover:scale-110 active:scale-95 transition-all z-110 hidden md:block"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 lg:-right-20 top-1/2 -translate-y-1/2 p-4 rounded-full bg-surface border border-border/50 text-primary hover:scale-110 active:scale-95 transition-all z-110 hidden md:block"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </>
        )}

        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex flex-col items-center justify-center p-4"
            >
              <div className="relative group/expanded">
                {mediaList[currentIndex].type === 'image' ? (
                  <img
                    src={'https://assets.hamzaziyard.com' + mediaList[currentIndex].src}
                    alt={mediaList[currentIndex].caption}
                    className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-border/50 bg-surface"
                    loading="lazy"
                  />
                ) : mediaList[currentIndex].type === 'video' ? (
                  <video
                    src={'https://assets.hamzaziyard.com' + mediaList[currentIndex].src}
                    className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-border/50 bg-black"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <div className="w-full max-w-3xl aspect-video">
                    <LottieRenderer url={'https://assets.hamzaziyard.com' + mediaList[currentIndex].src} />
                  </div>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <h3 className="text-xl font-bold text-primary mb-2 line-clamp-1">{mediaList[currentIndex].caption}</h3>
                <p className="text-text-secondary font-medium">{currentIndex + 1} / {mediaList.length}</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail Carousel */}
        {mediaList.length > 1 && (
          <div className="w-full max-w-4xl px-4 pb-4">
            <div className="flex gap-4 overflow-x-auto no-scrollbar py-4 justify-center">
              {mediaList.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={clsx(
                    "relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300",
                    currentIndex === idx
                      ? "border-primary scale-110 shadow-lg"
                      : "border-transparent opacity-40 hover:opacity-100"
                  )}
                >
                  {item.type === 'image' ? (
                    <img src={'https://assets.hamzaziyard.com' + item.src} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-surface flex items-center justify-center text-text-secondary text-xs uppercase font-bold">
                      {item.type}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
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
  const [modalState, setModalState] = useState({ isOpen: false, mediaList: [], initialIndex: 0 });

  const openModal = (index, list) => {
    setModalState({ isOpen: true, mediaList: list, initialIndex: index });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    if (companyData) {
      document.title = `${companyData.companyName} | Hamza Ziyard`;
    }
  }, [companyData]);

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

  // Removed redundant useEffect: activeProjectId is now handled by ScrollSpy

  // Enhanced Scroll Spy logic for both platforms and projects
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Skip updates if a manual scroll is in progress
        if (isScrollingRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.dataset.type === 'project') {
              setActiveProjectId(entry.target.id);
            } else if (entry.target.dataset.type === 'platform') {
              setActiveTab(entry.target.dataset.platform);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      }
    );

    tabs.forEach(tab => {
      const platformEl = document.getElementById(`platform-${tab}`);
      if (platformEl) observer.observe(platformEl);

      (projectsByPlatform[tab] || []).forEach(project => {
        const projectEl = document.getElementById(project.id);
        if (projectEl) observer.observe(projectEl);
      });
    });

    return () => observer.disconnect();
  }, [tabs, projectsByPlatform]);

  const scrollToProject = (id) => {
    const element = document.getElementById(id);
    if (element) {
      isScrollingRef.current = true;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveProjectId(id);

      // Release scroll lock after animation finishes
      setTimeout(() => { isScrollingRef.current = false; }, 800);
    }
  };

  const handleTabChange = (tab) => {
    const element = document.getElementById(`platform-${tab}`);
    if (element) {
      isScrollingRef.current = true;
      setActiveTab(tab);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Release scroll lock after animation finishes
      setTimeout(() => { isScrollingRef.current = false; }, 800);
    }
  };

  if (!companyData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-text-secondary">Company not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
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
            <div className="w-40 h-40 bg-surface/50 rounded-[2.5rem] border border-border/50 flex items-center justify-center overflow-hidden shrink-0 shadow-sm transition-shadow hover:shadow-md">
              <img src={'https://assets.hamzaziyard.com' + companyData.companyFavicon} alt={companyData.companyName} loading="lazy" className="w-24 h-24 object-contain" />
            </div>
            <div className="flex-1 space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <h1 className="text-4xl leading-relaxed lg:text-5xl md:text-5xl font-bold tracking-tight text-primary">{companyData.companyName}</h1>
              </div>
              <p className="text-base lg:text-xl text-text-secondary leading-relaxed font-light">{companyData.companyDescription}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-12 pt-4">
                <div className="space-y-1">
                  <h4 className="text-sm text-text-secondary">Service</h4>
                  <p className="text-lg font-bold text-primary">{companyData.companyType}</p>
                </div>
                {tabs.length > 0 && (
                  <div className="space-y-1">
                    <h4 className="text-sm text-text-secondary">Platforms</h4>
                    <p className="text-lg font-bold text-primary">{[...new Set(tabs.map(t => t === 'Website' ? 'Web' : t))].join(', ')}</p>
                  </div>
                )}
                <div className="space-y-1">
                  <h4 className="text-sm text-text-secondary">Role</h4>
                  <p className="text-lg font-bold text-primary">{companyData.role}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm text-text-secondary">Time period</h4>
                  <p className="text-lg font-bold text-primary">{companyData.timePeriod}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {tabs.length > 0 && (
          <>
            {/* Navigation Tabs (Primary Filter) - Only show if more than one tab exists */}
            {tabs.length > 1 && (
              <div className="sticky top-0 z-50 py-3 bg-background/90 backdrop-blur-xl border-b border-border/50">
                <div className="flex gap-2 overflow-x-auto p-1.5 no-scrollbar bg-surface border border-border/50 w-fit rounded-full">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={clsx(
                        "px-3 py-1.5 lg:px-5 lg:py-2 rounded-full text-sm lg:text-lg transition-all duration-300 cursor-pointer",
                        activeTab === tab
                          ? "bg-background text-primary font-bold shadow-sm"
                          : "text-text-secondary hover:bg-background/20 font-medium"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col xl:flex-row gap-8 xl:gap-16">

              {/* Side Navigation (Per Tab) */}
              <aside className="xl:w-72 shrink-0 pt-6 lg:pt-12 p-0">
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
                            : "text-text-secondary hover:text-primary"
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="truncate">{project.title}</span>
                          <span className="text-text-secondary/60 text-sm font-normal">{project.media?.length || 0}</span>
                        </div>
                      </button>
                    ))}
                    {currentProjects.length === 0 && (
                      <div className="px-5 py-8 text-sm text-text-secondary italic bg-surface rounded-2xl border border-dashed border-border text-center">
                        No projects for {activeTab}
                      </div>
                    )}
                  </nav>
                </div>
              </aside>

              {/* Main Content Area */}
              <main className="flex-1 mb-64 pt-0 xl:pt-14">
                <div className="space-y-64">
                  {tabs.map((tab) => (
                    <div
                      key={tab}
                      id={`platform-${tab}`}
                      data-type="platform"
                      data-platform={tab}
                      className="space-y-32 scroll-mt-32"
                    >
                      {projectsByPlatform[tab].map((project) => (
                        <section
                          key={project.id}
                          id={project.id}
                          data-type="project"
                          className="scroll-mt-32 space-y-16"
                        >
                          <div className="space-y-12">
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <span className="w-1 h-6 rounded-full bg-primary"></span>
                                <h2 className="text-3xl font-bold text-primary tracking-tight">{project.title}</h2>
                              </div>

                              <div className="flex flex-col mt-8">
                                {project.problemStatement && (
                                  <div className=" grid grid-cols-1 md:grid-cols-4  border border-border rounded-t-xl">
                                    <h4 className="font-semibold p-4 text-md text-text-secondary bg-surface rounded-tl-xl ">
                                      Problem statement :
                                    </h4>
                                    <p className="border-l border-border p-4 text-lg text-text-secondary leading-relaxed font-light col-span-3">{project.problemStatement}</p>
                                  </div>
                                )}
                                {project.solution && (
                                  <div className=" grid grid-cols-1 md:grid-cols-4 border border-t-0 border-border  rounded-b-xl">
                                    <h4 className="font-semibold p-4 text-md text-text-secondary bg-surface rounded-bl-xl">
                                      Solution :
                                    </h4>
                                    <p className="border-l border-border p-4 text-lg text-text-secondary leading-relaxed font-light col-span-3">{project.solution}</p>
                                  </div>
                                )}
                                {project.achievements && (
                                  <div className=" grid grid-cols-1 md:grid-cols-4 border border-border rounded-xl mt-4">
                                    <h4 className="font-semibold p-4 text-md text-text-secondary bg-surface rounded-bl-xl rounded-tl-xl">
                                      Impact & results :
                                    </h4>
                                    <p className="border-l border-border p-4 text-lg text-primary leading-relaxed font-bold italic col-span-3">"{project.achievements}"</p>
                                  </div>
                                )}
                                {project.task && (
                                  <div className=" grid grid-cols-1 md:grid-cols-4 border border-border rounded-xl mt-4">
                                    <h4 className="font-semibold p-4 text-md text-text-secondary bg-surface rounded-bl-xl rounded-tl-xl">
                                      Task :
                                    </h4>
                                    <p className="border-l border-border p-4 text-lg text-text-secondary leading-relaxed font-light col-span-3">{project.task}</p>
                                  </div>
                                )}
                              </div>
                            </div>

                            <MediaCarousel media={project.media} activeTab={tab} onMediaClick={openModal} />
                          </div>
                        </section>
                      ))}
                    </div>
                  ))}
                </div>
              </main>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        <MediaModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          mediaList={modalState.mediaList}
          initialIndex={modalState.initialIndex}
        />
      </AnimatePresence>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-60 p-4 bg-primary text-background rounded-full shadow-2xl border border-border/50 hover:scale-110 active:scale-95 transition-all group cursor-pointer"
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
