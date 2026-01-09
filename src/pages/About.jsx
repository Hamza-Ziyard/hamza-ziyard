import { motion } from 'framer-motion';
import { div } from 'framer-motion/client';

export default function About() {
  return (
    <div>
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
          {/* <h1 className="text-4xl font-bold mb-8">About Me</h1> */}
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
        <div className=" max-w-[1440px] mt-8 mx-auto overflow-hidden w-full relative mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex gap-4 w-fit px-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-4 shrink-0">
                <img src="https://assets.hamzaziyard.com/about/hobbies/3.webp" alt="" className="w-90 h-80 object-cover rounded-2xl" />
                <img src="https://assets.hamzaziyard.com/about/hobbies/4.webp" alt="" className="w-90 h-80 object-cover rounded-2xl" />
                <img src="https://assets.hamzaziyard.com/about/hobbies/5.webp" alt="" className="w-70 h-80 object-cover rounded-2xl" />
                <img src="https://assets.hamzaziyard.com/about/hobbies/1.webp" alt="" className="w-70 h-80 object-cover rounded-2xl" />
                <img src="https://assets.hamzaziyard.com/about/hobbies/6.webp" alt="" className="w-90 h-80 object-cover rounded-2xl" />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
