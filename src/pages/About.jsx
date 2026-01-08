import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="max-w-[1800px] flex mx-auto py-20 gap-20">

      <div>
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <img src="https://assets.hamzaziyard.com/about/me-animated.webp" alt="" className='max-h-[80vh] md:block hidden' />
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
          <p className="text-4xl text-neutral-600 leading-relaxed">
            I design experiences where logic meets emotion. From untangling complex systems to crafting interfaces that feel effortless, I turn ideas, problems, and late-night thoughts into products people actually enjoy using.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
