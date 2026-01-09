import { useState, useMemo } from 'react';
import originalProjects from '../data/projects.json';
import companyWorkData from '../data/companyWork.json';
import ProjectCard from '../components/ui/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [selectedCompany, setSelectedCompany] = useState('All companies');
  const [selectedType, setSelectedType] = useState('All types');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const companyCards = useMemo(() => companyWorkData.map(company => ({
    id: company.companyId,
    title: company.companyName,
    company: company.companyName.trim(),
    type: company.companyType,
    role: company.role,
    timePeriod: company.timePeriod,
    gradient: company.gradient || "bg-surface",
    coverImage: company.companyLogo,
    favicon: company.companyFavicon,
    isCompanyCard: true,
    width: company.width || "w-60",
    height: company.height || "h-80"
  })), []);

  const allProjects = useMemo(() => [...companyCards, ...originalProjects], [companyCards]);

  const companies = useMemo(() => ['All companies', ...new Set(allProjects.map(p => p.company).filter(Boolean))], [allProjects]);
  const types = useMemo(() => ['All types', ...new Set(allProjects.map(p => p.type).filter(Boolean))], [allProjects]);

  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      const matchCompany = selectedCompany === 'All companies' || project.company === selectedCompany;
      const matchType = selectedType === 'All types' || project.type === selectedType;
      return matchCompany && matchType;
    });
  }, [allProjects, selectedCompany, selectedType]);

  // Distribute projects across columns for a masonry-like layout
  const columns = useMemo(() => {
    if (viewMode === 'list') {
      return [filteredProjects.map((p, i) => ({ ...p, filterIndex: i }))];
    }
    const cols = [[], [], []];
    filteredProjects.forEach((project, index) => {
      cols[index % 3].push({ ...project, filterIndex: index });
    });
    return cols;
  }, [filteredProjects, viewMode]);

  return (
    <section className='pt-0 px-6 max-w-[2800px] mx-auto'>
      {/* Filter Bar */}
      {/* <div className="hidden lg:block w-fit mx-auto absolute inset-x-0 bottom-32 z-100 justify-center">
        <div className="flex gap-2 p-2 bg-surface/80 backdrop-blur-xl border border-border shadow-lg rounded-2xl">
          <div className="flex flex-col md:flex-row gap-2 items-start md:items-end border-r border-border pr-2">
            <div className="flex flex-col gap-2">
              <div className="relative">
                <select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="appearance-none bg-background text-primary text-sm rounded-xl focus:ring-primary focus:border-primary block w-full md:w-56 p-3 pr-10 cursor-pointer hover:bg-surface transition-colors duration-200 outline-none font-medium"
                >
                  {companies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-secondary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="appearance-none bg-background text-primary text-sm rounded-xl focus:ring-primary focus:border-primary block w-full md:w-64 p-3 pr-10 cursor-pointer hover:bg-surface transition-colors duration-200 outline-none font-medium"
                >
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-secondary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {(selectedCompany !== 'All companies' || selectedType !== 'All types') && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => { setSelectedCompany('All companies'); setSelectedType('All types'); }}
                className="text-xs font-bold px-2 text-primary hover:opacity-70 underline underline-offset-4 pb-4 transition-colors duration-200"
              >
                Clear filters
              </motion.button>
            )}
          </div>

          <div className="flex items-center bg-background/50 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-background shadow-sm text-primary' : 'text-text-secondary hover:text-primary'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-background shadow-sm text-primary' : 'text-text-secondary hover:text-primary'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div> */}

      <div className={`grid gap-4 items-start ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
        <AnimatePresence mode="popLayout">
          {columns.map((columnProjects, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-4">
              {columnProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    delay: project.filterIndex * 0.05,
                    layout: { duration: 0.4 }
                  }}
                  className="w-full"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-32 text-center"
        >
          <p className="text-text-secondary text-lg">No projects found matching your filters.</p>
        </motion.div>
      )}
    </section>
  );
}

