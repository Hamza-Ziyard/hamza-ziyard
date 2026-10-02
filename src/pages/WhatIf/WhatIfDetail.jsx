import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { ArrowLeft, Image as ImageIcon, Info } from 'lucide-react';
import whatIfProjects from '../../data/whatIfProjects.json';

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

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Hamza Ziyard`;
    }
  }, [project]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!project) return <Navigate to="/what-if" replace />;

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
      const offset = 120; // Adjust for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveTab(sectionId);
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
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
              {project.title}
            </h1>
            {/* {project.subtitle && (
              <p className="text-xl md:text-2xl text-primary font-medium">
                {project.subtitle}
              </p>
            )} */}
            <p className="text-xl text-text-secondary leading-relaxed font-light pt-2">
              {project.summary}
            </p>

          </motion.div>
        </section>

        {/* Sticky Tab Navigation (Scroll Spy Style) */}
        {sections.length > 0 && (
          <div className="sticky top-0 z-50 py-4 bg-background/80 backdrop-blur-xl border-b border-border/50 mb-12">
            <div className="flex gap-2 overflow-x-auto p-1.5 no-scrollbar bg-surface/50 border border-border/50 w-fit rounded-full">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={clsx(
                    "px-5 py-2 rounded-full text-md transition-all duration-300 cursor-pointer whitespace-nowrap",
                    activeTab === section.id
                      ? "bg-background text-primary font-bold shadow-sm"
                      : "text-text-secondary hover:bg-background/20 font-medium"
                  )}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        )}

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
                  <div className="space-y-8">
                    <p className="text-xl text-text-secondary leading-relaxed">
                      {section.reflection}
                    </p>
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
                      {section.fixImage && (
                        <figure className="space-y-4 pt-4">
                          <img 
                            src={section.fixImage} 
                            alt={section.fixImageCaption || section.title}
                            loading="lazy"
                            className="w-full rounded-2xl border border-border/50 shadow-sm"
                          />
                          {section.fixImageCaption && (
                            <figcaption className="text-sm text-text-secondary font-medium text-center">
                              {section.fixImageCaption}
                            </figcaption>
                          )}
                        </figure>
                      )}

                      {/* Figure Legend Table (Styled as in ProjectDetailWork) */}
                      {section.legend && (
                        <div className="pt-4 space-y-4">
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
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </main>
      </div>

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
