import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';

const HOBBIES = [
  {
    url: "https://assets.hamzaziyard.com/about/hobbies/3.webp",
    title: "Gaming",
    description: "Button-masher by heart, strategist on good days Not a pro, just vibing.",
    width: "w-90"
  },
  {
    url: "https://assets.hamzaziyard.com/about/hobbies/4.webp",
    title: "2D Art & Sketching",
    description: "Turning random ideas into lines, faces, and sometimes actual art",
    width: "w-90"
  },
  {
    url: "https://assets.hamzaziyard.com/about/hobbies/5.webp",
    title: "Foodie",
    description: "Always down to explore new flavors… especially if biriyani is involved",
    width: "w-70"
  },
  {
    url: "https://assets.hamzaziyard.com/about/hobbies/1.webp",
    title: "Cat Lover",
    description: "Professional cat spotter & part-time cat entertainer",
    width: "w-70"
  },
  {
    url: "https://assets.hamzaziyard.com/about/hobbies/6.webp",
    title: "Swimming",
    description: "Chasing peace underwater and speed… occasionally",
    width: "w-90"
  }

];



export default function About() {
  const scrollRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [selectedHobby, setSelectedHobby] = useState(null);

  useEffect(() => {
    document.title = "About | Hamza Ziyard";
  }, []);

  const mouseStartX = useRef(0);
  const scrollLeftStart = useRef(0);
  const isDragging = useRef(false);
  const clickPrevent = useRef(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    const scroll = () => {
      if (!isInteracting && !selectedHobby) {
        scrollContainer.scrollLeft += 0.5;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    const handleInfiniteScroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft -= scrollContainer.scrollWidth / 2;
      } else if (scrollContainer.scrollLeft <= 0) {
        scrollContainer.scrollLeft += scrollContainer.scrollWidth / 2;
      }
    };

    animationId = requestAnimationFrame(scroll);
    scrollContainer.addEventListener('scroll', handleInfiniteScroll);

    const handleGlobalMouseUp = () => {
      if (isDragging.current) {
        handleMouseUp();
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('scroll', handleInfiniteScroll);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isInteracting, selectedHobby]);

  const handleMouseDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    clickPrevent.current = false;
    setIsInteracting(true);
    mouseStartX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setTimeout(() => {
      if (!isDragging.current) setIsInteracting(false);
    }, 1000);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - mouseStartX.current) * 1.5;

    if (Math.abs(walk) > 5) {
      clickPrevent.current = true;
    }
    el.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleImageClick = (hobby) => {
    if (!clickPrevent.current) {
      setSelectedHobby(hobby);
    }
  };

  return (
    <div className="relative">
      <div className="max-w-[1440px] flex mx-auto py-8 lg:gap-20">
        <div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <img src="https://assets.hamzaziyard.com/about/me-animated.webp" alt="Hamza Ziyard - Product Designer" className='max-h-[50vh] xl:block hidden rounded-2xl' />
          </motion.div>
        </div>
        <div className="flex-1">
          <motion.div
            className="w-full  p-4 lg:p-8 pb-3 lg:pb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="3xl:text-3xl text-2xl font-light text-text-secondary leading-relaxed">
              I design experiences where logic meets emotion. From untangling complex systems to crafting interfaces that feel effortless, I turn ideas, problems, and late-night thoughts into products people actually enjoy using.
            </p>


              {/* Email & Linked Social Profiles List */}
              <div
                className="mt-6 flex flex-col gap-3"
              >
                <a
                  href="mailto:hamzaziyard.ux@gmail.com"
                  className="inline-flex items-center gap-2.5 text-text-secondary hover:text-text-primary transition-colors text-base font-normal w-fit group"
                >
                  <Mail size={18} className="text-text-secondary group-hover:text-primary transition-colors" />
                  <span className="underline underline-offset-4 decoration-text-secondary/40 group-hover:decoration-text-primary">
                    hamzaziyard.ux@gmail.com
                  </span>
                </a>

                <a
                  href="https://www.linkedin.com/in/hamza-ziyard/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-text-secondary hover:text-text-primary transition-colors text-base font-normal w-fit group"
                >
                  <Linkedin size={18} className="text-text-secondary group-hover:text-primary transition-colors" />
                  <span className="underline underline-offset-4 decoration-text-secondary/40 group-hover:decoration-text-primary">
                    linkedin.com/in/hamza-ziyard
                  </span>
                </a>
              </div>

              {/* Work Experience Section */}
              <div className="mt-8 pt-4 border-t border-border">
                <h3 className="text-2xl font-bold mb-6">
                  My Work Experience
                </h3>
                <div className="divide-y divide-border">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-4">
                    <div>
                      <h4 className="text-base font-semibold text-text-primary">Freelancing - Neugine</h4>
                      <p className="text-sm text-text-secondary">UI/UX Designer & UI Developer</p>
                    </div>
                    <span className="text-sm text-text-secondary">
                      01/2026 – Present
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 py-4">
                    <div>
                      <h4 className="text-base font-semibold text-text-primary">Zafer</h4>
                      <p className="text-sm text-text-secondary">UI/UX Designer</p>
                    </div>
                    <span className="text-sm text-text-secondary">
                      03/2024 – 12/2025
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 py-4">
                    <div>
                      <h4 className="text-base font-semibold text-text-primary">Surge Global</h4>
                      <p className="text-sm text-text-secondary">UI/UX Intern</p>
                    </div>
                    <span className="text-sm text-text-secondary">
                      07/2022 – 12/2022
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pt-4">
                    <div>
                      <h4 className="text-base font-semibold text-text-primary">Vetstoria</h4>
                      <p className="text-sm text-text-secondary">Web Development Intern</p>
                    </div>
                    <span className="text-sm text-text-secondary">
                      07/2021 – 06/2022
                    </span>
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-text-secondary mb-4">
                  Education
                </h3>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h4 className="text-base font-semibold text-text-primary">University of Westminster</h4>
                      <p className="text-sm text-text-secondary">B.Sc. (Hons) in Computer Science - First Class Honors</p>
                    </div>
                    <span className="text-sm text-text-secondary">
                      2019 – 2023
                    </span>
                  </div>
                </div>
              </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="max-w-[1440px] mt-8 mx-auto w-full relative mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar px-8 pb-4 cursor-grab active:cursor-grabbing select-none"
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => !isDragging.current && setIsInteracting(false)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={() => setIsInteracting(false)}
          >
            <div className="flex gap-4 w-fit">
              {[...Array(2)].map((_, groupIndex) => (
                <div key={groupIndex} className="flex gap-4 shrink-0">
                  {HOBBIES.map((hobby, i) => (
                    <motion.div
                      key={`${groupIndex}-${i}`}
                      whileHover={{ scale: 0.98 }}
                      onClick={() => handleImageClick(hobby)}
                      className={`${hobby.width} h-80 shrink-0 overflow-hidden rounded-2xl cursor-pointer`}
                    >
                      <img
                        src={hobby.url}
                        alt={hobby.title}
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedHobby && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedHobby(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full bg-surface border border-border rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="relative aspect-video w-full">
                <img
                  src={selectedHobby.url}
                  alt={selectedHobby.title}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setSelectedHobby(null)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold mb-2">{selectedHobby.title}</h3>
                <p className="text-text-secondary text-sm md:text-base font-light">{selectedHobby.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
