import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Sparkles, Smartphone, Clock, Layers, Sun, Moon } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../../context/ThemeContext';

const APP_VIEWS = [
  {
    id: 'home',
    title: 'Home Dashboard',
    caption: 'Primary dashboard with quick transaction logging, daily streak mascot, and spend summary.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/Home - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/Home - Light.webp'
  },
  {
    id: 'calendar-1',
    title: 'Calendar View (Month)',
    caption: 'Monthly calendar heatmap displaying expense density and daily spending totals at a glance.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/Calendar I - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/Calendar I - Light.webp'
  },
  {
    id: 'calendar-2',
    title: 'Calendar View (Day Detail)',
    caption: 'Day-by-day itemized timeline view for reviewing specific transactions per date.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/Calendar II - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/Calendar II - Light.webp'
  },
  {
    id: 'view-expense',
    title: 'Expense Details',
    caption: 'Detailed transaction breakdown with timestamp, payment method, category tag, and notes.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/View Expense - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/View Expense - Light.webp'
  },
  {
    id: 'analytics',
    title: 'Analytics Overview',
    caption: 'Interactive charts and period toggles visualizing short and long-term spending patterns.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/Analytics - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/Analytics - Light.webp'
  },
  {
    id: 'overall-insights',
    title: 'Overall Expense Insight',
    caption: 'High-level financial breakdown highlighting major spend categories and month-over-month trends.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/Overall Expense Insight - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/Overall Expense Insight - Light.webp'
  },
  {
    id: 'category-analytics',
    title: 'Category Analytics',
    caption: 'Granular analytics filtered by specific spending categories with percentage allocation.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/Category Analytics - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/Category Analytics - Light.webp'
  },
  {
    id: 'my-stats',
    title: 'Personal Stats & Badges',
    caption: 'Gamified stats dashboard tracking personal logging consistency, XP milestones, and level progress.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/My Stats - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/My Stats - Light.webp'
  },
  {
    id: 'pocko-chat',
    title: 'Pocko Chat',
    caption: 'AI-driven companion offering personalized spending insights, answers, and encouragement.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/Pocko Chat - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/Pocko Chat - Light.webp'
  },
  {
    id: 'budget',
    title: 'Budget Management',
    caption: 'Monthly budget setup with real-time visual progress bars and remaining allowance indicators.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/Budget - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/Budget - Light.webp'
  },
  {
    id: 'budget-cycle',
    title: 'Custom Budget Cycles',
    caption: 'Tailored budget reset cycles matching paychecks (weekly, bi-weekly, or monthly).',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/Budget Cycle - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/Budget Cycle- Light.webp'
  },
  {
    id: 'streak',
    title: 'Streak & Habits',
    caption: 'Habit-building milestone screen rewarding daily check-ins with badges and streak multipliers.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/Streak - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/Streak - Light.webp'
  },
  {
    id: 'simple-mode-2',
    title: 'Simple Mode (Details)',
    caption: 'Minimalist list view prioritizing fast scanning and low cognitive load.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/Simple Mode II - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/Simple Mode II - Light.webp'
  },
  {
    id: 'multi-currency-1',
    title: 'Multi-Currency (Selection)',
    caption: 'Global currency support with live conversion rates and multi-currency expense entry.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/Multi-currency I - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/Multi-currency I - Light.webp'
  },
  {
    id: 'app-customization',
    title: 'App Customization',
    caption: 'Flexible theme options, custom accent colors, and mascot presentation toggles.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/App Customization - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/App Customization - Light.webp'
  },
  {
    id: 'statement-detail',
    title: 'Statement Breakdown',
    caption: 'Exportable breakdown view ready for CSV or PDF sharing.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/Statement Detail - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/Statement Detail - Light.webp'
  },
  {
    id: 'template',
    title: 'Expense Templates',
    caption: 'One-tap logging presets for recurring expenses like subscriptions, coffee, or transit.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/Template - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/Template - Light.webp'
  },
  {
    id: 'notifications',
    title: 'Habit Notifications',
    caption: 'Gentle, customizable daily push notification triggers designed to maintain logging rituals.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/Notifications - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/Notifications - Light.webp'
  },
  {
    id: 'icloud-sync',
    title: 'iCloud Synchronization',
    caption: 'Native iOS private cloud sync keeping data backed up and synced seamlessly across devices.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/iCloud Sync - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/iCloud Sync - Light.webp'
  },
  {
    id: 'view-article',
    title: 'Financial Literacy Article',
    caption: 'In-app article reader providing bite-sized financial advice and money management guides.',
    darkSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/dark/View Article - Dark.webp',
    lightSrc: 'https://assets.hamzaziyard.com/projects-for-fun/pockomint/app_views/light/View Article - Light.webp'
  }
];

export default function AppViewsGalleryModal({ isOpen, onClose }) {
  const { theme, toggleTheme } = useTheme();
  const [galleryThemeMode, setGalleryThemeMode] = useState('light');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, lightboxIndex, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-background text-primary overflow-y-auto flex flex-col"
      >
        {/* Header (Fixed/Sticky to Top) */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl px-4 sm:px-8 py-4 border-b border-gray-300 dark:border-zinc-800">
          <div className="flex items-center justify-between max-w-[1500px] mx-auto w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">Pockomint</h2>

            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="https://apple.co/4fS3kJm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105 active:scale-95 shrink-0"
              >
                <img
                  src="https://assets.hamzaziyard.com/projects-for-fun/pockomint/get-app-black.svg"
                  alt="Get Pockomint"
                  className="h-8 sm:h-9 w-auto block dark:hidden"
                />
                <img
                  src="https://assets.hamzaziyard.com/projects-for-fun/pockomint/get-app-white.svg"
                  alt="Get Pockomint"
                  className="h-8 sm:h-9 w-auto hidden dark:block"
                />
              </a>

              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full text-primary hover:bg-background transition-colors duration-300 cursor-pointer flex items-center justify-center"
                aria-label="Toggle page theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full text-red-500 hover:text-primary transition-colors cursor-pointer font-medium"
                aria-label="Close gallery"
              >
                Exit view
              </button>
            </div>
          </div>
        </header>

        {/* Main Gallery & Summary Container */}
        <main className="flex-1 max-w-[1500px] mx-auto w-full p-4 pb-24 md:pb-36">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Column: Gallery */}
            <div className="flex-1 w-full space-y-6">
              {/* Tab Bar on Top Left above Images for switching ONLY screen images */}
              <div className="flex items-center justify-start">
                <div className="flex gap-1.5 p-1.5 bg-surface border border-gray-300 dark:border-zinc-800 w-fit rounded-full">
                  {['light', 'dark'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setGalleryThemeMode(mode)}
                      className={clsx(
                        "px-5 py-2 rounded-full text-xs sm:text-sm transition-all duration-300 cursor-pointer whitespace-nowrap capitalize",
                        galleryThemeMode === mode
                          ? "bg-background text-primary font-bold shadow-sm"
                          : "text-text-secondary hover:bg-background/20 font-medium"
                      )}
                    >
                      {mode === 'light' ? 'Light Mode' : 'Dark Mode'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {APP_VIEWS.map((item, index) => {
                  const imageSrc = galleryThemeMode === 'dark' ? item.darkSrc : item.lightSrc;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setLightboxIndex(index)}
                      className="cursor-pointer group flex flex-col items-center"
                    >
                      {/* Subtle Black Phone Frame Bezel */}
                      <div className="relative w-full rounded-[32px] sm:rounded-[40px] p-1.5 bg-black border border-zinc-800/80 group-hover:border-zinc-700 transition-all duration-300">
                        <div className="relative aspect-[9/19.5] w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-black flex items-center justify-center border border-zinc-900">
                          <img
                            src={imageSrc}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-[24px] sm:rounded-[32px]"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <p className="text-center text-text-secondary font-medium italic text-sm pt-4">
                        {item.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Key Project Summary Sidebar */}
            <aside className="w-full lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-20 rounded-2xl md:rounded-3xl dark:border-zinc-800 p-6 space-y-6 text-left">
                <p className="text-lg text-text-secondary font-light leading-relaxed">
                  Designing and building a native iOS app that makes transaction tracking engaging.
                </p>

              {/* Meta Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-300 dark:border-zinc-800">
                <div className="space-y-1">
                  <h4 className="text-sm text-text-secondary font-medium">Role</h4>
                  <p className="text-xs font-bold text-primary">UI/UX & SwiftUI</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm text-text-secondary font-medium">Platform</h4>
                  <p className="text-xs font-bold text-primary">iOS & iPadOS</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm text-text-secondary font-medium">Timeline</h4>
                  <p className="text-xs font-bold text-primary">06 months</p>
                </div>
              </div>

              {/* Cards matching Pockomint.jsx L728-L736 */}
              <div className="space-y-4 pt-2">
                {/* Problem Card */}
                <div className="p-5 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-2 flex-col">
                  <div className="space-y-3">
                    <XCircle size={28} className="text-primary" />
                    <h4 className="text-md font-semibold text-primary">The Problem</h4>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed font-light">
                    Auto-syncing bank data creates a quiet trust problem. When syncs miss transactions or categorize wrong, users assume numbers are fine and overspend without realizing. Traditional trackers feel like doing taxes.
                  </p>
                </div>

                {/* Solution Card */}
                <div className="p-5 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-2 flex-col">
                  <div className="space-y-3">
                    <CheckCircle2 size={28} className="text-primary" />
                    <h4 className="text-md font-semibold text-primary">The Solution</h4>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed font-light">
                    A native iOS experience designed for daily deliberate check-ins with sub-3-second expense entry, mascot gamification, and a conversational AI companion.
                  </p>
                </div>

                {/* Highlights Card */}
                <div className="p-5 rounded-2xl md:rounded-3xl border border-gray-300 dark:border-zinc-800 flex space-y-2 flex-col">
                  <div className="space-y-3">
                    <Sparkles size={28} className="text-primary" />
                    <h4 className="text-md font-semibold text-primary">Key Highlights</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-text-secondary font-light leading-relaxed list-disc pl-3">
                    <li><span className='font-bold'>Fast Logging:</span> One-tap expense presets & custom cycles</li>
                    <li><span className='font-bold'>Mascot Gamification:</span> Streak multipliers & XP leveling</li>
                    <li><span className='font-bold'>Pocko AI Companion:</span> Conversational spending advice</li>
                    <li><span className='font-bold'>Native iOS HIG:</span> Dark/light mode & iPad split layout</li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </main>

        {/* Lightbox Screen Zoom */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setLightboxIndex(null)}
            >
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10 cursor-pointer"
                aria-label="Close preview"
              >
                <X size={22} />
              </button>

              {lightboxIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(lightboxIndex - 1);
                  }}
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10 cursor-pointer"
                  aria-label="Previous screen"
                >
                  <ChevronLeft size={28} />
                </button>
              )}

              {lightboxIndex < APP_VIEWS.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(lightboxIndex + 1);
                  }}
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10 cursor-pointer"
                  aria-label="Next screen"
                >
                  <ChevronRight size={28} />
                </button>
              )}

              <div
                className="max-w-[280px] sm:max-w-[320px] md:max-w-[350px] w-full flex flex-col items-center justify-center p-2"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Subtle Black Phone Frame */}
                <div className="relative w-full rounded-[40px] sm:rounded-[48px] p-2 bg-black border border-zinc-800/80 shadow-2xl">
                  <div className="relative aspect-[9/19.5] w-full rounded-[30px] sm:rounded-[38px] overflow-hidden bg-black flex items-center justify-center border border-zinc-900">
                    <img
                      src={galleryThemeMode === 'dark' ? APP_VIEWS[lightboxIndex].darkSrc : APP_VIEWS[lightboxIndex].lightSrc}
                      alt={APP_VIEWS[lightboxIndex].title}
                      className="w-full h-full object-cover rounded-[30px] sm:rounded-[38px]"
                    />
                  </div>
                </div>
                <p className="mt-4 text-sm font-semibold text-white text-center">
                  {APP_VIEWS[lightboxIndex].title}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}


