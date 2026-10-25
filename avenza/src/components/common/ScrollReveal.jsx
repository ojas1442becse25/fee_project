import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.55,
  yOffset = 24,
  className = '',
  threshold = 0.08
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.div>
  )
}
