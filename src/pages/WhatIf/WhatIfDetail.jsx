import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { ArrowLeft, Image as ImageIcon, Info, ChevronUp, Check } from 'lucide-react';
import whatIfProjects from '../../data/whatIfProjects.json';
import ProjectCard from '../../components/ui/ProjectCard';

const ImagePlaceholder = ({ label, description, aspectRatio = "aspect-video" }) => (
  <div className={`w-full ${aspectRatio} rounded-2xl md:rounded-3xl bg-surface border-2 border-dashed border-border/70 flex flex-col items-center justify-center p-6 text-center space-y-3 shadow-inner transition-colors hover:border-primary/40 group`}>
    <div className="w-12 h-12 rounded-2xl bg-background border border-border/60 flex items-center justify-center text-text-secondary group-hover:text-primary group-hover:scale-110 transition-all shadow-sm">
      <ImageIcon size={24} />
    </div>
    <div className="space-y-1 max-w-md">
      <p className="text-sm font-semibold text-primary">{label}</p>
      {description && <p className="text-xs text-text-secondary font-light">{description}</p>}
    </div>
  </div>
);



export default function WhatIfDetail() {
  const { id } = useParams();
  const project = whatIfProjects.find((p) => p.id === id);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Hamza Ziyard`;
    }
  }, [project]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 500);
      setShowNav(window.pageYOffset > 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const otherCaseStudies = useMemo(() => {
    return whatIfProjects
      .filter((p) => p.id !== id)
      .map((p) => ({
        id: p.id,
        title: p.coverTitle || p.title,
        coverTitle: p.coverTitle,
        company: p.company || 'What If Series',
        type: p.type || 'What If Series',
        timePeriod: p.part || p.timePeriod,
        summary: p.summary,
        coverImage: p.thumbnail || p.coverImage,
        link: `/what-if/${p.id}`,
        fullBleed: true,
      }));
  }, [id]);

  const sections = useMemo(() => {
    if (!project || !Array.isArray(project.sections)) return [];
    return project.sections.map((s) => ({
      id: s.id,
      label: s.label || s.title,
    }));
  }, [project]);

  const [activeTab, setActiveTab] = useState(sections[0]?.id || '');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      isScrollingRef.current = true;
      const offset = 120; // Adjust for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveTab(sectionId);
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  };

  useEffect(() => {
    if (sections.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (isScrollingRef.current) return;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveTab(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-20% 0px -55% 0px',
          threshold: 0.1,
        }
      );

      sections.forEach(({ id: sectionId }) => {
        const element = document.getElementById(sectionId);
        if (element) observer.observe(element);
      });

      return () => observer.disconnect();
    }
  }, [sections]);

  const activeSectionIdx = sections.findIndex((s) => s.id === activeTab);
  const currentSectionObj = sections[activeSectionIdx >= 0 ? activeSectionIdx : 0];

  if (!project) return <Navigate to="/what-if" replace />;

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">

        {/* Project Header */}
        <section className="mb-16 mt-4 space-y-12">
          
          {/* Hero Cover Image on Top */}
          <div className="w-full">
            {project.coverImage ? (
              <figure className="space-y-4">
                <img 
                  src={project.coverImage} 
                  alt={project.title}
                  loading="eager"
                  className="w-full rounded-2xl md:rounded-3xl border border-border/50 shadow-sm object-cover"
                />
              </figure>
            ) : (
              <ImagePlaceholder 
                label="Hero Redesign Overview Image" 
                description="Main before/after or interface showcase for Lanka Metro redesign"
                aspectRatio="aspect-video md:aspect-[21/9]"
              />
            )}
          </div>

          {/* Title, Subtitle, & Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-left"
          >
            {project.byline && (
              <p className="text-sm md:text-base font-medium text-text-secondary">
                {project.byline}
              </p>
            )}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
              {project.title}
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed font-light pt-2">
              {project.summary}
            </p>
            {project.method && (
              <p className="text-base md:text-lg text-text-secondary leading-relaxed pt-2">
                <strong className="font-bold text-primary mr-2">Method:</strong>
                {project.method}
              </p>
            )}
          </motion.div>
        </section>

        {/* Floating Minimal Pill Navigation with Dropdown Popover (Mobile only - Pockomint style) */}
        <AnimatePresence>
          {showNav && sections.length > 0 && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300"
            >
              {/* Dropdown Popover Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-72 max-h-80 overflow-y-auto no-scrollbar bg-zinc-900/95 text-white border border-white/15 dark:bg-zinc-100/95 dark:text-zinc-900 dark:border-zinc-300 p-2 rounded-2xl shadow-2xl backdrop-blur-2xl space-y-1"
                  >
                    {sections.map((section, idx) => (
                      <button
                        key={section.id}
                        onClick={() => {
                          scrollToSection(section.id);
                          setIsDropdownOpen(false);
                        }}
                        className={clsx(
                          "w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-between cursor-pointer",
                          activeTab === section.id
                            ? "bg-white text-black dark:bg-zinc-900 dark:text-white font-semibold shadow-sm"
                            : "text-zinc-300 hover:text-white hover:bg-white/10 dark:text-zinc-700 dark:hover:text-zinc-900 dark:hover:bg-black/5"
                        )}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className={clsx("text-[11px]", activeTab === section.id ? "text-black/60 dark:text-white/60" : "text-zinc-500 dark:text-zinc-400")}>
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="truncate">{section.label}</span>
                        </div>
                        {activeTab === section.id && <Check size={14} className="shrink-0 text-black dark:text-white" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Floating Trigger Pill */}
              <button
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className="bg-zinc-900/95 hover:bg-zinc-900 text-white border border-white/15 dark:bg-zinc-100/95 dark:hover:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-300 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-2xl flex items-center gap-3 cursor-pointer group transition-all active:scale-95"
              >
                <span className="px-2 py-0.5 rounded-md bg-white/10 text-[11px] font-bold text-zinc-200 dark:bg-black/10 dark:text-zinc-800">
                  {String(activeSectionIdx >= 0 ? activeSectionIdx + 1 : 1).padStart(2, '0')} / {sections.length.toString().padStart(2, '0')}
                </span>
                <span className="text-xs sm:text-sm font-medium max-w-[150px] sm:max-w-[200px] truncate text-white dark:text-zinc-900">
                  {currentSectionObj?.label || 'Overview'}
                </span>
                <ChevronUp
                  size={16}
                  className={clsx("text-zinc-400 transition-transform duration-300 group-hover:text-white dark:text-zinc-500 dark:group-hover:text-zinc-900", isDropdownOpen && "rotate-180")}
                />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="space-y-48 mb-64">
          {project.sections?.map((section) => {
            if (section.id === 'reflection') {
              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-48 space-y-12"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-1 h-6 rounded-full bg-primary"></span>
                    <h2 className="text-2xl font-bold text-primary tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {typeof section.reflection === 'string' &&
                      section.reflection.split('\n\n').map((block, bIdx) => {
                        const lines = block.split('\n');
                        const isList = lines.some((l) => l.trim().startsWith('•') || l.trim().startsWith('-'));
                        if (isList) {
                          const nonBulletHeader = !lines[0].trim().startsWith('•') && !lines[0].trim().startsWith('-') ? lines[0] : null;
                          const bulletLines = lines.filter((l) => l.trim().startsWith('•') || l.trim().startsWith('-'));
                          return (
                            <div key={bIdx} className="space-y-3">
                              {nonBulletHeader && (
                                <p className="text-xl font-medium text-primary">
                                  {nonBulletHeader}
                                </p>
                              )}
                              <ul className="space-y-2 list-disc pl-6 text-xl text-text-secondary leading-relaxed font-light">
                                {bulletLines.map((line, lIdx) => {
                                  const text = line.replace(/^[•\-]\s*/, '');
                                  return <li key={lIdx}>{text}</li>;
                                })}
                              </ul>
                            </div>
                          );
                        }
                        return (
                          <p key={bIdx} className="text-xl text-text-secondary leading-relaxed">
                            {block}
                          </p>
                        );
                      })}
                  </div>
                </section>
              );
            }

            return (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-48 space-y-12"
              >
                {/* Section Title with Primary Vertical Bar */}
                <div className="flex items-center gap-3">
                  <span className="w-1 h-6 rounded-full bg-primary"></span>
                  <h2 className="text-2xl font-bold text-primary tracking-tight">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-16">
                  {/* Images if present (e.g. [Image: V1 ...] [Image: V2 ...]) */}
                  {section.images && (
                    <div className={clsx(
                      "grid gap-6",
                      section.images.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                    )}>
                      {section.images.map((img, idx) => (
                        <div key={idx} className="space-y-2">
                          {img.url ? (
                            <img
                              src={img.url}
                              alt={img.label}
                              className="w-full rounded-2xl border border-border/50 shadow-sm object-cover"
                            />
                          ) : (
                            <ImagePlaceholder label={img.label} />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Single Image if present */}
                  {section.image && (
                    <figure className="space-y-4">
                      <img 
                        src={section.image} 
                        alt={section.imageCaption || section.title}
                        loading="lazy"
                        className="w-full rounded-2xl border border-border/50 shadow-sm"
                      />
                      {section.imageCaption && (
                        <figcaption className="text-sm text-text-secondary font-medium text-center">
                          {section.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                  )}

                  {/* Section Text */}
                  {section.text && (
                    <div className="space-y-4">
                      <p className="text-xl text-text-secondary leading-relaxed whitespace-pre-line">
                        {section.text}
                      </p>
                    </div>
                  )}

                  {/* Problem & Why it matters Sub-section */}
                  {section.problem && (
                    <div className="space-y-4">
                      {/* Problem Statement */}
                      <p className="text-xl text-text-secondary leading-relaxed">
                        <strong className="font-bold text-primary mr-2">
                          {section.problem.label || "Problem:"}
                        </strong>
                        {section.problem.text}
                      </p>

                      {/* Why it matters */}
                      {section.whyItMatters && (
                        <p className="text-xl text-text-secondary leading-relaxed">
                          <strong className="font-bold text-primary mr-2">Why it matters:</strong>
                          {section.whyItMatters.citation && (
                            <em className="italic mr-1.5 text-primary">{section.whyItMatters.citation}</em>
                          )}
                          {section.whyItMatters.text}
                        </p>
                      )}

                      {/* Problem Image (e.g. Old Journey Flow) */}
                      {section.problemImage && (
                        <figure className="space-y-4 pt-4">
                          <img 
                            src={section.problemImage} 
                            alt={section.problemImageCaption || section.title}
                            loading="lazy"
                            className="w-full rounded-2xl border border-border/50 shadow-sm"
                          />
                          {section.problemImageCaption && (
                            <figcaption className="text-sm text-text-secondary font-medium text-center">
                              {section.problemImageCaption}
                            </figcaption>
                          )}
                        </figure>
                      )}
                    </div>
                  )}

                  {/* Fix & New Features Sub-section */}
                  {section.fix && (
                    <div className="space-y-4">
                      {/* Fix Statement */}
                      <p className="text-xl text-text-secondary leading-relaxed">
                        <strong className="font-bold text-primary mr-2">
                          {section.fix.label || "Fix:"}
                        </strong>
                        {section.fix.text}
                      </p>

                      {/* New Feature if present (e.g. Mark as Boarded) */}
                      {section.newFeature && (
                        <p className="text-xl text-text-secondary leading-relaxed">
                          <strong className="font-bold text-primary mr-2">
                            {section.newFeature.label}
                          </strong>
                          {section.newFeature.text}
                        </p>
                      )}

                      {/* Fix Image / Proposed Solution Image */}
                      {section.fixImage !== undefined && (
                        <figure className="space-y-4 pt-4">
                          {section.fixImage ? (
                            <img 
                              src={section.fixImage} 
                              alt={section.fixImageCaption || section.title}
                              loading="lazy"
                              className="w-full rounded-2xl border border-border/50 shadow-sm"
                            />
                          ) : (
                            <ImagePlaceholder 
                              label={section.fixImageCaption || `${section.title} - Solution Overview`}
                              description="Redesigned interface showcase"
                            />
                          )}
                          {section.fixImageCaption && (
                            <figcaption className="text-sm text-text-secondary font-medium text-center">
                              {section.fixImageCaption}
                            </figcaption>
                          )}
                        </figure>
                      )}
                    </div>
                  )}

                  {/* Figure Legend Table (Styled as in ProjectDetailWork) */}
                  {section.legend && (
                    <div className="pt-6 space-y-6">
                      {section.legend.image !== undefined && (
                        <figure className="space-y-4">
                          {section.legend.image ? (
                            <img 
                              src={section.legend.image} 
                              alt={section.legend.imageCaption || section.legend.title}
                              loading="lazy"
                              className="w-full rounded-2xl border border-border/50 shadow-sm"
                            />
                          ) : (
                            <ImagePlaceholder 
                              label={section.legend.imageCaption || section.legend.title}
                              description="Numbered callout and UI element annotations"
                            />
                          )}
                          {section.legend.imageCaption && (
                            <figcaption className="text-sm text-text-secondary font-medium text-center">
                              {section.legend.imageCaption}
                            </figcaption>
                          )}
                        </figure>
                      )}
                      <h4 className="text-base md:text-lg font-bold text-primary">
                        {section.legend.title}
                      </h4>
                      <div className="flex flex-col border border-border rounded-xl overflow-hidden">
                        {section.legend.items.map((item, idx) => (
                          <div 
                            key={idx} 
                            className={clsx(
                              "grid grid-cols-1 md:grid-cols-4",
                              idx > 0 && "border-t border-border"
                            )}
                          >
                            <div className="p-4 bg-surface flex items-center gap-4 md:col-span-1">
                              <span className="w-8 h-8 rounded-full bg-black text-white border border-border flex items-center justify-center text-md font-bold shrink-0">
                                {idx + 1}
                              </span>
                              <h5 className="font-semibold text-sm md:text-base text-primary">
                                {item.element}
                              </h5>
                            </div>
                            <div className="border-t md:border-t-0 md:border-l border-border p-4 text-sm md:text-base text-text-secondary leading-relaxed font-light md:col-span-3 flex items-center">
                              <p>{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stage Comparison Table (Stage, V1, V2, Biggest Change) */}
                  {section.stageTable && (
                    <div className="pt-6 space-y-4">
                      {section.stageTable.title && (
                        <h4 className="text-base md:text-lg font-bold text-primary">
                          {section.stageTable.title}
                        </h4>
                      )}
                      <div className="border border-border rounded-2xl overflow-hidden shadow-sm">
                        {/* Table Header */}
                        <div className="hidden md:grid md:grid-cols-12 bg-surface border-b border-border text-md font-semibold text-text-secondary">
                          <div className="p-4 md:col-span-3">Stage</div>
                          <div className="p-4 md:col-span-3 border-l border-border">V1 (Original)</div>
                          <div className="p-4 md:col-span-3 border-l border-border text-primary font-bold">V2 (Redesign)</div>
                          <div className="p-4 md:col-span-3 border-l border-border">Biggest Change</div>
                        </div>

                        {/* Table Rows */}
                        <div className="divide-y divide-border">
                          {section.stageTable.rows.map((row, rIdx) => (
                            <div
                              key={rIdx}
                              className="grid grid-cols-1 md:grid-cols-12 hover:bg-surface/40 transition-colors"
                            >
                              {/* Stage Column */}
                              <div className="p-4 md:col-span-3 bg-surface/30 md:bg-transparent flex flex-col justify-center">
                                <span className="text-xs font-semibold text-text-secondary md:hidden mb-1">
                                  Stage
                                </span>
                                <h5 className="font-bold text-sm md:text-base text-primary">
                                  {row.stage}
                                </h5>
                                {row.screens && (
                                  <span className="text-xs text-text-secondary font-light mt-1">
                                    {row.screens}
                                  </span>
                                )}
                              </div>

                              {/* V1 Column */}
                              <div className="p-4 md:col-span-3 border-t md:border-t-0 md:border-l border-border flex flex-col justify-center text-sm md:text-base text-text-secondary leading-relaxed font-light">
                                <span className="text-xs font-semibold text-red-500/80 md:hidden mb-1">
                                  V1 (Original)
                                </span>
                                <p>{row.v1}</p>
                              </div>

                              {/* V2 Column */}
                              <div className="p-4 md:col-span-3 border-t md:border-t-0 md:border-l border-border flex flex-col justify-center text-sm md:text-base text-primary leading-relaxed font-normal bg-primary/[0.02] md:bg-transparent">
                                <span className="text-xs font-semibold text-emerald-500/90 md:hidden mb-1">
                                  V2 (Redesign)
                                </span>
                                <p>{row.v2}</p>
                              </div>

                              {/* Biggest Change Column */}
                              <div className="p-4 md:col-span-3 border-t md:border-t-0 md:border-l border-border flex flex-col justify-center text-sm md:text-base text-text-secondary leading-relaxed font-light bg-surface/20 md:bg-transparent">
                                <span className="text-xs font-semibold text-text-secondary md:hidden mb-1">
                                  Biggest Change
                                </span>
                                <div className="flex items-start gap-1.5">
                                  <span className="font-medium text-primary">{row.biggestChange}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Comparison Table (for Wallet section - Styled as in ProjectDetailWork) */}
                  {section.comparisonTable && (
                    <div className="pt-6 space-y-4">
                      <h4 className="text-base md:text-lg font-bold text-primary">
                        Key Wallet Changes
                      </h4>
                      <div className="flex flex-col border border-border rounded-xl overflow-hidden">
                        {/* Kept Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4">
                          <div className="font-semibold p-4 text-sm md:text-base text-primary bg-surface flex items-center">
                            <span>Kept in Redesign</span>
                          </div>
                          <div className="border-t md:border-t-0 md:border-l border-border p-4 text-sm md:text-base text-text-secondary leading-relaxed font-light md:col-span-3">
                            <ul className="space-y-1.5 list-disc pl-5">
                              {section.comparisonTable.kept.map((item, kIdx) => (
                                <li key={kIdx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Changed Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 border-t border-border">
                          <div className="font-semibold p-4 text-sm md:text-base text-primary bg-surface flex items-center">
                            <span>Changed & Replaced</span>
                          </div>
                          <div className="border-t md:border-t-0 md:border-l border-border p-4 text-sm md:text-base text-text-secondary leading-relaxed font-light md:col-span-3">
                            <ul className="space-y-1.5 list-disc pl-5">
                              {section.comparisonTable.changed.map((item, cIdx) => (
                                <li key={cIdx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Subsections if present (e.g. TV and Wi-Fi Usage under Home) */}
                  {section.subsections && (
                    <div className="space-y-24 pt-12 border-t border-border/50">
                      {section.subsections.map((sub, sIdx) => (
                        <div key={sub.id || sIdx} id={sub.id} className="space-y-12">
                          <div className="flex items-center gap-3">
                            <span className="w-1 h-5 rounded-full bg-primary/70"></span>
                            <h3 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
                              {sub.title}
                            </h3>
                          </div>

                          <div className="space-y-16">
                            {/* Problem */}
                            {sub.problem && (
                              <div className="space-y-4">
                                <p className="text-xl text-text-secondary leading-relaxed">
                                  <strong className="font-bold text-primary mr-2">
                                    {sub.problem.label || "Problem:"}
                                  </strong>
                                  {sub.problem.text}
                                </p>
                                {sub.whyItMatters && (
                                  <p className="text-xl text-text-secondary leading-relaxed">
                                    <strong className="font-bold text-primary mr-2">Why it matters:</strong>
                                    {sub.whyItMatters.citation && (
                                      <em className="italic mr-1.5 text-primary">{sub.whyItMatters.citation}</em>
                                    )}
                                    {sub.whyItMatters.text}
                                  </p>
                                )}
                                {sub.problemImage !== undefined && (
                                  <figure className="space-y-4 pt-4">
                                    {sub.problemImage ? (
                                      <img 
                                        src={sub.problemImage} 
                                        alt={sub.problemImageCaption || sub.title}
                                        loading="lazy"
                                        className="w-full rounded-2xl border border-border/50 shadow-sm"
                                      />
                                    ) : (
                                      <ImagePlaceholder 
                                        label={sub.problemImageCaption || `${sub.title} - V1 Interface`}
                                        description="V1 legacy screen interface comparison"
                                      />
                                    )}
                                    {sub.problemImageCaption && (
                                      <figcaption className="text-sm text-text-secondary font-medium text-center">
                                        {sub.problemImageCaption}
                                      </figcaption>
                                    )}
                                  </figure>
                                )}
                              </div>
                            )}

                            {/* Fix */}
                            {sub.fix && (
                              <div className="space-y-4">
                                <p className="text-xl text-text-secondary leading-relaxed">
                                  <strong className="font-bold text-primary mr-2">
                                    {sub.fix.label || "Fix:"}
                                  </strong>
                                  {sub.fix.text}
                                </p>
                                {sub.fixImage !== undefined && (
                                  <figure className="space-y-4 pt-4">
                                    {sub.fixImage ? (
                                      <img 
                                        src={sub.fixImage} 
                                        alt={sub.fixImageCaption || sub.title}
                                        loading="lazy"
                                        className="w-full rounded-2xl border border-border/50 shadow-sm"
                                      />
                                    ) : (
                                      <ImagePlaceholder 
                                        label={sub.fixImageCaption || `${sub.title} - V2 Interface Showcase`}
                                        description="V2 redesigned interface mockup"
                                      />
                                    )}
                                    {sub.fixImageCaption && (
                                      <figcaption className="text-sm text-text-secondary font-medium text-center">
                                        {sub.fixImageCaption}
                                      </figcaption>
                                    )}
                                  </figure>
                                )}

                                {/* Figure Legend Table */}
                                {sub.legend && (
                                  <div className="pt-6 space-y-6">
                                    {sub.legend.image !== undefined && (
                                      <figure className="space-y-4">
                                        {sub.legend.image ? (
                                          <img 
                                            src={sub.legend.image} 
                                            alt={sub.legend.imageCaption || sub.legend.title}
                                            loading="lazy"
                                            className="w-full rounded-2xl border border-border/50 shadow-sm"
                                          />
                                        ) : (
                                          <ImagePlaceholder 
                                            label={sub.legend.imageCaption || sub.legend.title}
                                            description="Numbered callout and UI element annotations"
                                          />
                                        )}
                                        {sub.legend.imageCaption && (
                                          <figcaption className="text-sm text-text-secondary font-medium text-center">
                                            {sub.legend.imageCaption}
                                          </figcaption>
                                        )}
                                      </figure>
                                    )}
                                    <h4 className="text-base md:text-lg font-bold text-primary">
                                      {sub.legend.title}
                                    </h4>
                                    <div className="flex flex-col border border-border rounded-xl overflow-hidden">
                                      {sub.legend.items.map((item, idx) => (
                                        <div 
                                          key={idx} 
                                          className={clsx(
                                            "grid grid-cols-1 md:grid-cols-4",
                                            idx > 0 && "border-t border-border"
                                          )}
                                        >
                                          <div className="p-4 bg-surface flex items-center gap-4 md:col-span-1">
                                            <span className="w-8 h-8 rounded-full bg-black text-white border border-border flex items-center justify-center text-md font-bold shrink-0">
                                              {idx + 1}
                                            </span>
                                            <h5 className="font-semibold text-sm md:text-base text-primary">
                                              {item.element}
                                            </h5>
                                          </div>
                                          <div className="border-t md:border-t-0 md:border-l border-border p-4 text-sm md:text-base text-text-secondary leading-relaxed font-light md:col-span-3 flex items-center">
                                            <p>{item.description}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </main>
      </div>

      {/* Read Other Case Studies Section - Full Width with bg-gray-100 */}
      {otherCaseStudies.length > 0 && (
        <section className="w-full bg-gray-100 dark:bg-zinc-900 border-t border-border/80 py-16 md:py-24">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-6 rounded-full bg-primary"></span>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
                    Read Other Case Studies
                  </h2>
                </div>
                {/* <p className="text-sm md:text-base text-text-secondary font-light">
                  Explore other conceptual redesigns from the What If series.
                </p> */}
              </div>

              <Link
                to="/what-if"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-blue-500 transition-colors w-fit group"
              >
                <span>View all series</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {otherCaseStudies.map((study) => (
                <div key={study.id} className="w-full">
                  <ProjectCard project={study} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hidden md:flex items-center justify-center fixed bottom-8 right-8 z-60 p-4 bg-primary text-background rounded-full shadow-2xl border border-border/50 hover:scale-110 active:scale-95 transition-all group cursor-pointer"
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
