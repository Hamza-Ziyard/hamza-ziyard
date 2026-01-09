import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isProjectPage = pathname.startsWith('/project/') || pathname.startsWith('/work/');

  return (
    <div className="min-h-screen">
      <Navbar />
      {!isProjectPage && <div className='h-20'></div>}
      <main className="pt-2 pb-20 md:px-8 min-h-[90vh]">
        <Outlet />
      </main>
      <footer className="py-10 text-center text-text-secondary text-sm border-t border-border/50 mt-auto">
        <p>© {new Date().getFullYear()} Designed & Built by Hamza Ziyard</p>
      </footer>
    </div>
  );
}
