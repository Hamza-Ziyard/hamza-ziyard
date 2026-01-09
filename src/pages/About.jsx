import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
            <img src="https://assets.hamzaziyard.com/about/me-animated.webp" alt="" className='max-h-[50vh] lg:block hidden rounded-2xl' />
          </motion.div>
        </div>
        <div className="flex-1">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="3xl:text-3xl text-2xl font-light text-text-secondary leading-relaxed p-4 lg:p-8">
              I design experiences where logic meets emotion. From untangling complex systems to crafting interfaces that feel effortless, I turn ideas, problems, and late-night thoughts into products people actually enjoy using.
            </p>
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
