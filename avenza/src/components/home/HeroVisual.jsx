import { useMotionValue, useSpring } from 'framer-motion'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Brain, Zap, Sparkles } from 'lucide-react'
import './HeroVisual.css'

function HeroVisual() {
  // Motion values for mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Springs for smooth movement
  const orbX = useSpring(mouseX, { damping: 35, stiffness: 120 })
  const orbY = useSpring(mouseY, { damping: 35, stiffness: 120 })
  const ringX = useSpring(mouseX, { damping: 40, stiffness: 100 })
  const ringY = useSpring(mouseY, { damping: 40, stiffness: 100 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 968) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      // Calculate subtle movement
      const xPos = (clientX - innerWidth / 2) / (innerWidth / 2)
      const yPos = (clientY - innerHeight / 2) / (innerHeight / 2)

      mouseX.set(xPos * 8)
      mouseY.set(yPos * 8)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const nodes = [
    { icon: Brain, angle: 30, radius: 76.5 },
    { icon: Zap, angle: 150, radius: 76.5 },
    { icon: Sparkles, angle: 270, radius: 76.5 },
  ]

  return (
    <div className="hero-visual-container">
      <div className="hero-visual-bg" />

      <motion.div className="hero-visual" style={{ x: orbX, y: orbY }}>
        {/* Central Orb */}
        <div className="central-orb">
          <div className="orb-core" />
        </div>

        {/* Ring 1 */}
        <motion.div
          className="orbit-ring ring-1"
          style={{ x: ringX, y: ringY }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Ring 2 */}
        <motion.div
          className="orbit-ring ring-2"
          style={{ x: ringX, y: ringY }}
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />

        {/* Nodes */}
        {nodes.map((node, index) => {
          const angle = (node.angle * Math.PI) / 180
          const x = Math.cos(angle) * node.radius
          const y = Math.sin(angle) * node.radius

          return (
            <div
              key={index}
              className="floating-node"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
            >
              <div className="node-wrapper">
                <node.icon size={16} className="node-icon" />
              </div>
            </div>
          )
        })}

        {/* Decorative Dots */}
        <div className="hero-decorative-dot dot-1" />
        <div className="hero-decorative-dot dot-2" />
        <div className="hero-decorative-dot dot-3" />
      </motion.div>
    </div>
  )
}

export default HeroVisual
