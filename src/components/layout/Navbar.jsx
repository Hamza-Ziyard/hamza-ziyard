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

  return (
    <nav className="px-8 py-2">
      <div className=" px-6 py-3 flex justify-between gap-8 pointer-events-auto">
        <div className='text-xl font-bold'>
          <Link
              key={"logo"}
              to={"/"}
            >
              hamza.ziyard
            </Link>
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
