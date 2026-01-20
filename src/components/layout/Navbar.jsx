import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Linkedin, Mail } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../../context/ThemeContext';

const navItems = [
  { name: 'Work', path: '/' },
  // { name: 'What if I redesigned today', path: '/redesigns' },
  { name: 'About', path: '/about' },
  { name: 'Resume', path: '/resume' },
];

export default function Navbar() {
  const location = useLocation();
  const isProjectPage = location.pathname.startsWith('/project/') || location.pathname.startsWith('/work/');
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={clsx(
      "px-8 py-2 z-50 transition-all duration-300",
      isProjectPage ? "relative" : "fixed top-0 left-0 right-0",
      scrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-border"
        : "bg-transparent border-b border-transparent"
    )}>

      <div className="md:px-2 lg:px-6 py-3 flex justify-between gap-8 pointer-events-auto">
        <div className='flex gap-4 lg:gap-6 items-center'>

          <div className='hidden lg:block text-xl font-bold text-primary'>
            <Link
              key={"logo"}
              to={"/"}
            >
              hamza.ziyard
            </Link>
          </div>
          <div className='lg:hidden font-bold text-primary'>
            <Link
              key={"logo"}
              to={"/"}
            >
              h.z
            </Link>
          </div>
          <div className='text-sm font-bold flex items-center gap-3 border border-green-500/30 text-green-600 dark:text-green-400 px-2 md:px-4 lg:pr-5 py-1.5 rounded-full bg-green-500/5'>
            <div className='relative flex h-2.5 w-2.5'>
              <div className='absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping'></div>
              <div className='relative inline-flex h-2.5 w-2.5 bg-green-500 rounded-full'></div>
            </div>
            <span className='hidden lg:inline'>Open to work</span>
          </div>

        </div>
        <div className='flex items-center gap-4 lg:gap-6'>
          <div className='flex gap-6 lg:gap-8'>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    "relative text-sm transition-colors duration-300",
                    isActive ? "text-primary font-bold" : "text-text-secondary hover:text-primary"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className=""
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-6 border-l border-border pl-6 ml-2">
            <a
              href="https://linkedin.com/in/hamza-ziyard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:hamzaziyard.ux@gmail.com"
              className="text-text-secondary hover:text-primary transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>

          <button
            onClick={toggleTheme}
            className="lg:p-1 rounded-full hover:bg-surface transition-colors duration-300 text-primary"
            aria-label="Toggle theme"
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
        </div>

      </div>
    </nav>

  );
}
