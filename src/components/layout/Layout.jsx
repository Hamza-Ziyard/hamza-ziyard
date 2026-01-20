import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Linkedin, Mail } from 'lucide-react';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isProjectPage = pathname.startsWith('/project/') || pathname.startsWith('/work/');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {!isProjectPage && <div className='h-20'></div>}
      <main className="pt-2 pb-20 md:px-8 grow">
        <Outlet />
      </main>
      <footer className="py-8 px-8 border-t border-border">
        <div className="mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-text-secondary text-sm">© {new Date().getFullYear()} Designed & Built by Hamza Ziyard</p>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="https://www.linkedin.com/in/hamza-ziyard/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-300 text-sm font-medium"
            >
              <Linkedin size={18} />
              <span>linkedin.com/in/hamza-ziyard</span>
            </a>
            <a
              href="mailto:hamzaziyard.ux@gmail.com"
              className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-300 text-sm font-medium"
            >
              <Mail size={18} />
              <span>hamzaziyard.ux@gmail.com</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
