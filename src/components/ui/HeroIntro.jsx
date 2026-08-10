import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactModal from './ContactModal';

// Tech Stack Set 1: Design & Core Development
const TOOL_SET_1 = [
  // Left Side (3 items)
  {
    name: 'Figma',
    funText: 'Pixel-pushing playground',
    bg: 'bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800',
    icon: <img src="/my-memoji/logo/Figma_Symbol_0.svg" alt="Figma" className="w-full h-full object-contain p-1.5" />,
    delay: 0,
    amplitude: 22,
    speed: 3.6,
  },
  {
    name: 'Framer',
    funText: 'Bringing static designs to life',
    bg: 'bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800',
    icon: <img src="/my-memoji/logo/Framer.svg" alt="Framer" className="w-full h-full object-contain p-1.5 invert dark:invert-0" />,
    delay: 0.35,
    amplitude: 16,
    speed: 3.9,
  },
  {
    name: 'React',
    funText: 'Component magic & state wizardry',
    bg: 'bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800',
    icon: <img src="/my-memoji/logo/React_Logo_0.svg" alt="React" className="w-full h-full object-contain p-1.5" />,
    delay: 0.5,
    amplitude: 34,
    speed: 4.2,
  },
  // Right Side (3 items)
  {
    name: 'SwiftUI',
    funText: 'Crafting crisp iOS experiences',
    bg: 'bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800',
    icon: <img src="/my-memoji/logo/swiftui-256x256_2x.png" alt="SwiftUI" className="w-full h-full object-contain p-1.5" />,
    delay: 0.2,
    amplitude: 18,
    speed: 3.4,
  },
  {
    name: 'Claude',
    funText: 'My AI brain & coding co-pilot',
    bg: 'bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800',
    icon: <img src="/my-memoji/logo/Claude_Symbol_0.svg" alt="Claude" className="w-full h-full object-contain p-1.5" />,
    delay: 0.7,
    amplitude: 28,
    speed: 3.8,
  },
  {
    name: 'ChatGPT',
    funText: 'Late-night idea brainstormer',
    bg: 'bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800',
    icon: <img src="/my-memoji/logo/ChatGPT_Logo_0.svg" alt="ChatGPT" className="w-full h-full object-contain p-1.5 invert dark:invert-0" />,
    delay: 0.3,
    amplitude: 26,
    speed: 3.7,
  },
];

// Tech Stack Set 2: Extended Pro Tools & Productivity
const TOOL_SET_2 = [
  // Left Side (3 items)
  {
    name: 'Webflow',
    funText: 'Visual coding on steroids',
    bg: 'bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800',
    icon: <img src="/my-memoji/logo/Webflow.svg" alt="Webflow" className="w-full h-full object-contain p-1.5" />,
    delay: 0.15,
    amplitude: 20,
    speed: 4.1,
  },
  {
    name: 'Sketch',
    funText: 'Where the UI journey started',
    bg: 'bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800',
    icon: <img src="/my-memoji/logo/Sketch.svg" alt="Sketch" className="w-full h-full object-contain p-1.5 invert dark:invert-0" />,
    delay: 0.65,
    amplitude: 19,
    speed: 3.5,
  },
  {
    name: 'Miro',
    funText: 'Endless digital whiteboard space',
    bg: 'bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800',
    icon: <img src="/my-memoji/logo/Miro.svg" alt="Miro" className="w-full h-full object-contain p-1.5" />,
    delay: 0.8,
    amplitude: 20,
    speed: 4.4,
  },
  // Right Side (3 items)
  {
    name: 'Antigravity',
    funText: 'Supercharging my agentic flow',
    bg: 'bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800',
    icon: <img src="/my-memoji/logo/Google-Antigravity-Icon-Full-Color.png" alt="Google Antigravity" className="w-full h-full object-contain p-1.5" />,
    delay: 0.1,
    amplitude: 30,
    speed: 4.3,
  },
  {
    name: 'Slack',
    funText: 'Ping! Huddle & team sync HQ',
    bg: 'bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800',
    icon: <img src="/my-memoji/logo/Slack_Symbol_0.svg" alt="Slack" className="w-full h-full object-contain p-0 scale-125" />,
    delay: 0.4,
    amplitude: 36,
    speed: 3.5,
  },
  {
    name: 'Microsoft 365',
    funText: 'Getting real work & docs done',
    bg: 'bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800',
    icon: <img src="/my-memoji/logo/Microsoft_365_Logo_0.svg" alt="Microsoft 365" className="w-full h-full object-contain p-1.5" />,
    delay: 0.6,
    amplitude: 24,
    speed: 4.0,
  },
];

// Waveform slot movement parameters (6 slots: 3 on left, 3 on right)
const SLOT_CONFIGS = [
  { amplitude: 22, speed: 3.6, delay: 0 },
  { amplitude: 16, speed: 3.9, delay: 0.35 },
  { amplitude: 34, speed: 4.2, delay: 0.5 },
  { amplitude: 18, speed: 3.4, delay: 0.2 },
  { amplitude: 28, speed: 3.8, delay: 0.7 },
  { amplitude: 26, speed: 3.7, delay: 0.3 },
];

export default function HeroIntro() {
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSetIndex((prev) => (prev === 0 ? 1 : 0));
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  const currentSet = activeSetIndex === 0 ? TOOL_SET_1 : TOOL_SET_2;

  // On smaller screens, cycling current set (3 left, 3 right)
  const leftLogosMobile = currentSet.slice(0, 3);
  const rightLogosMobile = currentSet.slice(3);

  // On larger screens (lg+), show all 12 tools (6 left, 6 right)
  const allLeftLogos = [...TOOL_SET_1.slice(0, 3), ...TOOL_SET_2.slice(0, 3)];
  const allRightLogos = [...TOOL_SET_1.slice(3), ...TOOL_SET_2.slice(3)];

  return (
    <div className="relative w-full max-w-6xl mx-auto pt-6 sm:pt-8 pb-8 sm:pb-12 px-2 sm:px-8 mb-4 sm:mb-6 select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center max-w-5xl mx-auto flex flex-col items-center"
      >
        {/* Waveform Equalizer Display with Face in Center */}
        <div className="relative w-full max-w-5xl my-4 sm:my-8 flex items-center justify-center gap-1 sm:gap-3 md:gap-4 lg:gap-3 xl:gap-5 min-h-[140px] sm:min-h-[160px] overflow-hidden sm:overflow-visible">
          
          {/* Left Waveform Bar Logos */}
          <div className="flex items-center justify-end gap-1 sm:gap-3 md:gap-4 2xl:gap-4 flex-1">
            {/* Standard screens (< 1440px / 2xl): show 3 items (cycling) */}
            <div className="flex 2xl:hidden items-center justify-end gap-1 sm:gap-4 md:gap-5">
              {leftLogosMobile.map((item, index) => {
                const slot = SLOT_CONFIGS[index];
                return (
                  <motion.div
                    key={index}
                    animate={{
                      y: [-slot.amplitude * 0.5, slot.amplitude * 0.5, -slot.amplitude * 0.5],
                    }}
                    transition={{
                      duration: slot.speed,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: slot.delay,
                    }}
                    className="flex flex-col items-center justify-center shrink-0 relative group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className={`w-9 h-9 xs:w-10 xs:h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center cursor-pointer transition-transform ${item.bg}`}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full flex items-center justify-center p-1.5 sm:p-2.5"
                        >
                          {item.icon}
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>

                    {/* Tooltip */}
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl z-50">
                      {item.funText}
                    </span>

                    {/* Bottom Audio Wave Bar Stem */}
                    <motion.div
                      animate={{ height: [4, 12, 4], opacity: [0.3, 0.6, 0.3] }}
                      transition={{
                        duration: slot.speed,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: slot.delay,
                      }}
                      className="w-1 bg-zinc-300 dark:bg-zinc-700 rounded-full mt-1 sm:mt-1.5"
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Above 1440px / 2xl Screen view: show all 6 left items */}
            <div className="hidden 2xl:flex items-center justify-end gap-3.5 2xl:gap-4">
              {allLeftLogos.map((item, index) => {
                const slot = SLOT_CONFIGS[index % SLOT_CONFIGS.length];
                return (
                  <motion.div
                    key={item.name}
                    animate={{
                      y: [-slot.amplitude, slot.amplitude, -slot.amplitude],
                    }}
                    transition={{
                      duration: slot.speed,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: slot.delay,
                    }}
                    className="flex flex-col items-center justify-center shrink-0 relative group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className={`w-13 h-13 2xl:w-15 2xl:h-15 rounded-full flex items-center justify-center cursor-pointer transition-transform ${item.bg}`}
                    >
                      <div className="w-full h-full flex items-center justify-center p-2 2xl:p-2.5">
                        {item.icon}
                      </div>
                    </motion.div>

                    {/* Tooltip */}
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl z-50">
                      {item.funText}
                    </span>

                    {/* Bottom Audio Wave Bar Stem */}
                    <motion.div
                      animate={{ height: [6, 16, 6], opacity: [0.3, 0.6, 0.3] }}
                      transition={{
                        duration: slot.speed,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: slot.delay,
                      }}
                      className="w-1 bg-zinc-300 dark:bg-zinc-700 rounded-full mt-1.5"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Central Memoji Face */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative z-30 shrink-0 w-20 h-20 xs:w-22 xs:h-22 sm:w-30 sm:h-30 md:w-34 md:h-34 2xl:w-38 2xl:h-38 rounded-full bg-gray-100 border border-gray-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden cursor-pointer"
          >
            <img
              src="/my-memoji/me.png"
              alt="Hamza Memoji"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right Waveform Bar Logos */}
          <div className="flex items-center justify-start gap-1 sm:gap-3 md:gap-4 2xl:gap-4 flex-1">
            {/* Standard screens (< 1440px / 2xl): show 3 items (cycling) */}
            <div className="flex 2xl:hidden items-center justify-start gap-1 sm:gap-4 md:gap-5">
              {rightLogosMobile.map((item, index) => {
                const slot = SLOT_CONFIGS[index + 3];
                return (
                  <motion.div
                    key={index}
                    animate={{
                      y: [-slot.amplitude * 0.5, slot.amplitude * 0.5, -slot.amplitude * 0.5],
                    }}
                    transition={{
                      duration: slot.speed,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: slot.delay,
                    }}
                    className="flex flex-col items-center justify-center shrink-0 relative group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className={`w-9 h-9 xs:w-10 xs:h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center cursor-pointer transition-transform ${item.bg}`}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full flex items-center justify-center p-1.5 sm:p-2.5"
                        >
                          {item.icon}
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>

                    {/* Tooltip */}
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl z-50">
                      {item.funText}
                    </span>

                    {/* Bottom Audio Wave Bar Stem */}
                    <motion.div
                      animate={{ height: [4, 12, 4], opacity: [0.3, 0.6, 0.3] }}
                      transition={{
                        duration: slot.speed,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: slot.delay,
                      }}
                      className="w-1 bg-zinc-300 dark:bg-zinc-700 rounded-full mt-1 sm:mt-1.5"
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Above 1440px / 2xl Screen view: show all 6 right items */}
            <div className="hidden 2xl:flex items-center justify-start gap-3.5 2xl:gap-4">
              {allRightLogos.map((item, index) => {
                const slot = SLOT_CONFIGS[(index + 3) % SLOT_CONFIGS.length];
                return (
                  <motion.div
                    key={item.name}
                    animate={{
                      y: [-slot.amplitude, slot.amplitude, -slot.amplitude],
                    }}
                    transition={{
                      duration: slot.speed,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: slot.delay,
                    }}
                    className="flex flex-col items-center justify-center shrink-0 relative group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className={`w-13 h-13 2xl:w-15 2xl:h-15 rounded-full flex items-center justify-center cursor-pointer transition-transform ${item.bg}`}
                    >
                      <div className="w-full h-full flex items-center justify-center p-2 2xl:p-2.5">
                        {item.icon}
                      </div>
                    </motion.div>

                    {/* Tooltip */}
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl z-50">
                      {item.funText}
                    </span>

                    {/* Bottom Audio Wave Bar Stem */}
                    <motion.div
                      animate={{ height: [6, 16, 6], opacity: [0.3, 0.6, 0.3] }}
                      transition={{
                        duration: slot.speed,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: slot.delay,
                      }}
                      className="w-1 bg-zinc-300 dark:bg-zinc-700 rounded-full mt-1.5"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Greeting Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-3 pt-2">
          Hello! I'm Hamza
        </h1>

        {/* Tagline / Experience Intro */}
        <p className="text-lg sm:text-xl text-text-secondary leading-snug sm:leading-snug mb-8 max-w-xl">
          I bridge design and engineering to build thoughtful products people love to use.
        </p>

        {/* Primary CTA Button */}
        <button
          type="button"
          onClick={() => setIsContactOpen(true)}
          className="inline-flex items-center justify-center bg-[#1a1a1a] dark:bg-[#262626] text-white hover:opacity-90 transition-all font-semibold text-sm sm:text-base px-7 py-3 rounded-full shadow-md hover:scale-105 duration-200 mb-4 cursor-pointer"
        >
          Let's chat
        </button>

        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </motion.div>
    </div>
  );
}
