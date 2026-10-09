import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Linkedin, Mail, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../../context/ThemeContext';

const navItems = [
  // { name: 'Work', path: '/' },
  { name: 'What If', path: '/what-if' },
  { name: 'About', path: '/about' },
  { name: 'Resume', path: '/resume' },
];

export default function Navbar() {
  const location = useLocation();
  const isProjectPage = location.pathname.startsWith('/project/') || location.pathname.startsWith('/work/') || location.pathname.startsWith('/what-if/');
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav className={clsx(
      "px-4 sm:px-8 py-2 z-50 transition-all duration-300",
      isProjectPage ? "relative" : "fixed top-0 left-0 right-0",
      scrolled || isOpen
        ? "bg-background/90 backdrop-blur-xl border-b border-border"
        : "bg-transparent border-b border-transparent"
    )}>

      <div className="md:px-2 lg:px-6 py-3 flex justify-between items-center gap-4 pointer-events-auto">
        <div className='flex gap-4 lg:gap-6 items-center'>

          <div className='hidden sm:block text-xl font-bold text-primary'>
            <Link
              key={"logo"}
              to={"/"}
            >
              hamza.ziyard
            </Link>
          </div>
          <div className='sm:hidden font-bold text-primary'>
            <Link
              key={"logo-mobile"}
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

        <div className='flex items-center gap-3 md:gap-6'>
          {/* Desktop Navigation */}
          <div className='hidden md:flex gap-6 lg:gap-8'>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    "relative text-md transition-colors duration-300",
                    isActive ? "text-blue-500 font-bold" : "text-primary font-semibold hover:text-blue-500"
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
              className="text-primary hover:text-blue-500 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:hamzaziyard.ux@gmail.com"
              className="text-primary hover:text-blue-500 transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-surface transition-colors duration-300 text-primary"
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

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface text-primary transition-colors duration-300 focus:outline-none"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-border/60 mt-2 pt-4 pb-6 px-4 flex flex-col gap-4 bg-background/95 backdrop-blur-2xl rounded-2xl shadow-xl"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      "px-4 py-2.5 rounded-xl text-base font-semibold transition-all duration-200",
                      isActive
                        ? "bg-blue-500/10 text-blue-500 font-bold"
                        : "text-primary hover:bg-surface hover:text-blue-500"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-4 pt-3 border-t border-border/60 px-4">
              <a
                href="https://linkedin.com/in/hamza-ziyard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:text-blue-500 transition-colors py-1"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:hamzaziyard.ux@gmail.com"
                className="flex items-center gap-2 text-sm text-primary hover:text-blue-500 transition-colors py-1 ml-4"
                aria-label="Email"
              >
                <Mail size={18} />
                <span>Email</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
