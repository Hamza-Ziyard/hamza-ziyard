import projects from '../data/projects.json';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Redesign() {
  const redesignProjects = projects.filter(p => p.sections?.redesign?.enabled);

  return (
    <div className="space-y-20">
      <section className="py-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">What If I <span className="text-blue-500">Redesigned</span> Today?</h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          Explorations where I revisit past work with fresh eyes and new skills.
        </p>
      </section>

      <div className="space-y-32">
        {redesignProjects.map((project, index) => (
          <motion.div
            key={project.id}
            className="group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-10 max-w-2xl">
              <h2 className="text-3xl font-bold mb-4 text-primary">{project.title}</h2>
              <p className="text-text-secondary text-lg">{project.sections.redesign.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative items-center">
              {/* Before */}
              <div className="relative group/before">
                <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold border border-white/10 text-rose-400">
                  BEFORE
                </div>
                <img
                  src={project.sections.redesign.beforeImage}
                  alt="Before redesign"
                  loading="lazy"
                  className="w-full aspect-4/3 object-cover rounded-2xl border border-border/20 grayscale opacity-60 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                />
              </div>

              {/* Connector Arrow */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-surface rounded-full items-center justify-center border border-border/50 z-10 shadow-xl">
                <ArrowRight className="text-primary" size={24} />
              </div>

              {/* After */}
              <div className="relative group/after">
                <div className="absolute top-4 left-4 z-10 bg-blue-500/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold border border-blue-500/30 text-blue-400">
                  AFTER
                </div>
                <img
                  src={project.sections.redesign.afterImage}
                  alt="After redesign"
                  loading="lazy"
                  className="w-full aspect-4/3 object-cover rounded-2xl border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)] transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
