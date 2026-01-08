import originalProjects from '../data/projects.json';
import companyWorkData from '../data/companyWork.json';
import ProjectCard from '../components/ui/ProjectCard';
import { motion } from 'framer-motion';

export default function Home() {
  const companyCards = companyWorkData.map(company => ({
    id: company.companyId,
    title: company.companyName,
    company: company.companyName,
    type: company.companyType,
    role: company.role,
    timePeriod: company.timePeriod,
    gradient: company.gradient || "bg-neutral-100",
    coverImage: company.companyLogo,
    favicon: company.companyFavicon,
    isCompanyCard: true,
    width: company.width || "w-60",
    height: company.height || "h-80"
  }));

  const projects = [...companyCards, ...originalProjects];

  // Distribute projects across columns for a masonry-like layout
  // This ensures the first items (company cards) are placed at the top of each column
  const columns = [[], [], []];
  projects.forEach((project, index) => {
    columns[index % 3].push({ ...project, originalIndex: index });
  });

  return (
    <section className='max-w-[1800px] mx-auto'>
      <div className="grid grid-cols-1 gap-4 items-start">
        {columns.map((columnProjects, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4">
            {columnProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: project.originalIndex * 0.1 + 0.3, duration: 0.5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
