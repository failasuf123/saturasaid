import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

export function HeartIcon() {
  const randomDuration = Math.random() * 4 + 2;
  const randomDelay = Math.random() * 2;
  const randomX = Math.random() * 300 - 100;
  const randomY = Math.random() * 300 - 100;

  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0 }}
      animate={{ x: randomX, y: randomY, opacity: 0.3 }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    >
      <FaHeart className="text-white z-50" size={70} />
    </motion.div>
  );
}
