import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Default professional messages shown while the analysis "runs".
const DEFAULT_MESSAGES = [
  'Analyzing your profile',
  'Matching your interests and strengths',
  'Finding suitable career paths'
];

// LoadingScreen
// -------------
// Polished analyzing transition shown between the summary step and the
// results page. Cycles through a few subtle messages (useEffect + state)
// with a gentle fade - no loud animations or gamified effects.
const LoadingScreen = ({ messages = DEFAULT_MESSAGES }) => {
  const [index, setIndex] = useState(0);

  // Rotate the message every ~700ms while the loader is visible.
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 700);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <motion.div
      className="analyzing-state"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="analyzing-spinner"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
      />

      <div className="analyzing-messages">
        <AnimatePresence mode="wait">
          <motion.h3
            key={index}
            className="analyzing-headline"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {messages[index]}
          </motion.h3>
        </AnimatePresence>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.4 }}>
          We are preparing your personalized career matches
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;