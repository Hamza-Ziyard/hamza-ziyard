import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';

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
        ? "bg-white/80 backdrop-blur-xl border-b border-neutral-200"
        : "bg-transparent border-b border-transparent"
    )}>

      <div className=" px-6 py-3 flex justify-between gap-8 pointer-events-auto">
        <div className='flex gap-6 items-center'>

          <div className='text-xl font-bold'>
            <Link
              key={"logo"}
              to={"/"}
            >
              hamza.ziyard
            </Link>
          </div>
          <div className='text-sm font-bold flex items-center gap-3 border border-green-300 text-green-800 px-4 pr-5 py-1.5 rounded-full'>
            <div className='relative flex h-3 w-3'>
              <div className='absolute inline-flex h-full w-full rounded-full bg-green-800 opacity-75 animate-ping'></div>
              <div className='relative inline-flex h-3 w-3 bg-green-800 rounded-full'></div>
            </div>
            Open to work
          </div>

        </div>
        <div className='flex gap-8'>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  "relative text-sm transition-colors duration-300",
                  isActive ? "text-black font-bold" : "text-neutral-500 hover:text-black"
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

      </div>
    </nav>

  );
}
