import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import './CareerGalaxy3D.css'

// 4 distinct orbital rings at different 3D angles, visually prominent and scaled for safe containment
const RINGS_CONFIG = [
  {
    id: 'ring-1',
    radius: 2.4,
    tube: 0.020,
    rotX: Math.PI * 0.36,
    rotY: Math.PI * 0.08,
    rotZ: -Math.PI * 0.05,
    color: 0x38bdf8, // Electric cyan
    opacity: 0.70,
    spinSpeed: 0.0022,
  },
  {
    id: 'ring-2',
    radius: 3.5,
    tube: 0.018,
    rotX: -Math.PI * 0.30,
    rotY: -Math.PI * 0.20,
    rotZ: Math.PI * 0.15,
    color: 0x818cf8, // Indigo blue
    opacity: 0.60,
    spinSpeed: -0.0017,
  },
  {
    id: 'ring-3',
    radius: 4.6,
    tube: 0.016,
    rotX: Math.PI * 0.16,
    rotY: Math.PI * 0.38,
    rotZ: -Math.PI * 0.22,
    color: 0xc084fc, // Violet
    opacity: 0.52,
    spinSpeed: 0.0014,
  },
  {
    id: 'ring-4',
    radius: 5.6,
    tube: 0.014,
    rotX: -Math.PI * 0.40,
    rotY: Math.PI * 0.26,
    rotZ: Math.PI * 0.35,
    color: 0x34d399, // Mint emerald
    opacity: 0.46,
    spinSpeed: -0.0016,
  },
]

// 6 Career Category Nodes orbiting along the rings
const CAREER_NODES = [
  {
    id: 'ai',
    label: 'AI & ML',
    color: 0x38bdf8,
    cssColor: '#38bdf8',
    ringIndex: 0,
    radius: 2.4,
    speed: 0.42,
    phase: 0.4,
  },
  {
    id: 'dev',
    label: 'CLOUD / DEV',
    color: 0x818cf8,
    cssColor: '#818cf8',
    ringIndex: 1,
    radius: 3.5,
    speed: 0.34,
    phase: 2.1,
  },
  {
    id: 'design',
    label: 'DESIGN',
    color: 0xc084fc,
    cssColor: '#c084fc',
    ringIndex: 1,
    radius: 3.5,
    speed: 0.30,
    phase: 5.2,
  },
  {
    id: 'cyber',
    label: 'CYBER',
    color: 0x06b6d4,
    cssColor: '#06b6d4',
    ringIndex: 2,
    radius: 4.6,
    speed: 0.27,
    phase: 1.2,
  },
  {
    id: 'quant',
    label: 'FINTECH',
    color: 0xf59e0b,
    cssColor: '#f59e0b',
    ringIndex: 2,
    radius: 4.6,
    speed: 0.25,
    phase: 3.8,
  },
  {
    id: 'data',
    label: 'DATA',
    color: 0x34d399,
    cssColor: '#34d399',
    ringIndex: 3,
    radius: 5.6,
    speed: 0.21,
    phase: 4.5,
  },
]

// Soft circular glow texture for realistic cosmic dust particles
function createParticleTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.25, 'rgba(56, 189, 248, 0.85)')
  gradient.addColorStop(0.65, 'rgba(129, 140, 248, 0.3)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 64, 64)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export default function CareerGalaxy3D() {
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const [projectedPositions, setProjectedPositions] = useState([])

  // Subtle hover state for wrapper tilt & shift (3-5° maximum)
  const [tilt, setTilt] = useState({ x: 0, y: 0, shiftX: 0, shiftY: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handlePointerMove = useCallback((e) => {
    // Ignore touch interactions or reduced motion preference
    if (e.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    if (!stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1

    // Restrained 3D tilt: max 3.6 degrees, shift: max 7px
    const maxTilt = 3.6
    const maxShift = 7

    setTilt({
      x: -normY * maxTilt,
      y: normX * maxTilt,
      shiftX: normX * maxShift,
      shiftY: normY * (maxShift * 0.75),
    })
    setIsHovered(true)
  }, [])

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0, shiftX: 0, shiftY: 0 })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (!canvas || !stage) return

    let animationFrameId
    const initialW = stage.clientWidth || 540
    const initialH = stage.clientHeight || 540

    // ──────────────────────────────────────────────────────────
    // 1. Scene, Camera, Renderer
    // ──────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, initialW / initialH, 0.1, 100)

    // Dynamically calculate camera distance so bounds never clip at any aspect ratio
    const updateCameraDistance = (w, h) => {
      const aspect = w / h
      camera.aspect = aspect
      // Outermost ring is 5.6; target half dimension 7.4 gives guaranteed 24% safe buffer
      const targetHalfDimension = 7.4
      const halfFovRad = (38 * Math.PI) / 360
      let requiredDistance = targetHalfDimension / Math.tan(halfFovRad)
      if (aspect < 1) {
        requiredDistance /= aspect
      }
      camera.position.set(0, 0, Math.max(requiredDistance, 21.5))
      camera.updateProjectionMatrix()
    }

    updateCameraDistance(initialW, initialH)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(initialW, initialH)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.18

    // ──────────────────────────────────────────────────────────
    // 2. Galaxy Main Root Group
    // ──────────────────────────────────────────────────────────
    const galaxyRoot = new THREE.Group()
    scene.add(galaxyRoot)

    // ──────────────────────────────────────────────────────────
    // 3. Lighting Setup
    // ──────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x0c142c, 2.2)
    scene.add(ambientLight)

    const corePointLight = new THREE.PointLight(0x38bdf8, 3.8, 28, 1.2)
    corePointLight.position.set(0, 0, 0)
    galaxyRoot.add(corePointLight)

    const violetPointLight = new THREE.PointLight(0xa855f7, 2.4, 25, 1.4)
    violetPointLight.position.set(4.6, 3.8, 4.5)
    galaxyRoot.add(violetPointLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.3)
    dirLight.position.set(-5, 8, 11)
    scene.add(dirLight)

    // ──────────────────────────────────────────────────────────
    // 4. Central Luminous Orb (Prominent & Multi-Layered)
    // ──────────────────────────────────────────────────────────
    const orbGroup = new THREE.Group()

    // Inner Glowing Core
    const coreGeo = new THREE.SphereGeometry(0.95, 44, 44)
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0ea5e9,
      emissiveIntensity: 1.7,
      roughness: 0.15,
      metalness: 0.85,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    orbGroup.add(coreMesh)

    // Geodesic Lattice Shell (counter-rotating)
    const cageGeo = new THREE.IcosahedronGeometry(1.24, 2)
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    })
    const cageMesh = new THREE.Mesh(cageGeo, cageMat)
    orbGroup.add(cageMesh)

    // Soft Atmospheric Aura Sphere
    const auraGeo = new THREE.SphereGeometry(1.50, 32, 32)
    const auraMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    })
    const auraMesh = new THREE.Mesh(auraGeo, auraMat)
    orbGroup.add(auraMesh)

    // Equatorial Sparkle Ring
    const sparkGeo = new THREE.RingGeometry(1.34, 1.44, 44)
    const sparkMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.48,
      blending: THREE.AdditiveBlending,
    })
    const sparkRing = new THREE.Mesh(sparkGeo, sparkMat)
    sparkRing.rotation.x = Math.PI / 2
    orbGroup.add(sparkRing)

    galaxyRoot.add(orbGroup)

    // ──────────────────────────────────────────────────────────
    // 5. Four Elegant Orbital Rings at Different 3D Angles
    // ──────────────────────────────────────────────────────────
    const ringGroups = []

    RINGS_CONFIG.forEach((config) => {
      const ringPivot = new THREE.Group()
      ringPivot.rotation.set(config.rotX, config.rotY, config.rotZ)

      const torusGeo = new THREE.TorusGeometry(config.radius, config.tube, 16, 120)
      const torusMat = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: config.opacity,
        blending: THREE.AdditiveBlending,
      })
      const torusMesh = new THREE.Mesh(torusGeo, torusMat)
      ringPivot.add(torusMesh)

      // Orbiting beacon traveling along the ring
      const beaconGeo = new THREE.SphereGeometry(0.075, 14, 14)
      const beaconMat = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.90,
        blending: THREE.AdditiveBlending,
      })
      const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat)
      ringPivot.add(beaconMesh)

      galaxyRoot.add(ringPivot)
      ringGroups.push({ group: ringPivot, beacon: beaconMesh, config })
    })

    // ──────────────────────────────────────────────────────────
    // 6. Career Category Nodes (3D Orbiting Spheres)
    // ──────────────────────────────────────────────────────────
    const nodeMeshes = []

    CAREER_NODES.forEach((node) => {
      const nodeGroup = new THREE.Group()

      const sphereGeo = new THREE.SphereGeometry(0.26, 30, 30)
      const sphereMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 1.5,
        roughness: 0.16,
        metalness: 0.8,
      })
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat)
      nodeGroup.add(sphereMesh)

      const glowGeo = new THREE.SphereGeometry(0.42, 16, 16)
      const glowMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.36,
        blending: THREE.AdditiveBlending,
      })
      const glowMesh = new THREE.Mesh(glowGeo, glowMat)
      nodeGroup.add(glowMesh)

      galaxyRoot.add(nodeGroup)

      nodeMeshes.push({
        group: nodeGroup,
        nodeData: node,
      })
    })

    // ──────────────────────────────────────────────────────────
    // 7. Small Restrained Cosmic Particles at Different Depths
    // ──────────────────────────────────────────────────────────
    const particleCount = 140
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    const colorPalette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0x818cf8),
      new THREE.Color(0xa855f7),
      new THREE.Color(0x34d399),
    ]

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.8 + Math.random() * 4.2
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * Math.PI

      particlePositions[i * 3] = radius * Math.cos(phi) * Math.cos(theta)
      particlePositions[i * 3 + 1] = radius * Math.sin(phi)
      particlePositions[i * 3 + 2] = radius * Math.cos(phi) * Math.sin(theta)

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      particleColors[i * 3] = col.r
      particleColors[i * 3 + 1] = col.g
      particleColors[i * 3 + 2] = col.b
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const particleTexture = createParticleTexture()
    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      map: particleTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particlePoints = new THREE.Points(particleGeo, particleMat)
    galaxyRoot.add(particlePoints)

    // ──────────────────────────────────────────────────────────
    // 8. Dynamic Neural Constellation Connections
    // ──────────────────────────────────────────────────────────
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    })
    const lineGeo = new THREE.BufferGeometry()
    const linePositions = new Float32Array(CAREER_NODES.length * 6)
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat)
    galaxyRoot.add(lineSegments)

    // ──────────────────────────────────────────────────────────
    // 9. Main Animation Loop (Autonomous Motion, Safe Bounds)
    // ──────────────────────────────────────────────────────────
    const clock = new THREE.Clock()
    const tempVec = new THREE.Vector3()
    let lastProjectionUpdate = 0

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const delta = clock.getDelta()
      const elapsedTime = clock.getElapsedTime()

      // Autonomous gentle scene rotation contained relative to container
      galaxyRoot.rotation.y = elapsedTime * 0.05
      galaxyRoot.rotation.x = Math.sin(elapsedTime * 0.35) * 0.03

      // Central Orb Pulsing & Shell Counter-Rotation
      const orbScale = 1 + Math.sin(elapsedTime * 2.2) * 0.035
      orbGroup.scale.set(orbScale, orbScale, orbScale)
      cageMesh.rotation.y -= delta * 0.20
      cageMesh.rotation.x += delta * 0.12
      sparkRing.rotation.z += delta * 0.35
      corePointLight.intensity = 3.6 + Math.sin(elapsedTime * 3) * 0.5

      // Continuous Orbital Ring Rotations & Beacons
      ringGroups.forEach(({ group, beacon, config }) => {
        group.rotation.z += config.spinSpeed
        const beaconAngle = elapsedTime * (config.spinSpeed > 0 ? 0.65 : -0.65)
        beacon.position.set(
          Math.cos(beaconAngle) * config.radius,
          Math.sin(beaconAngle) * config.radius,
          0
        )
      })

      // Particle Cloud Drift
      particlePoints.rotation.y += delta * 0.025
      particlePoints.rotation.x -= delta * 0.012

      // Orbiting Career Nodes Placement
      const positionsArray = linePositions

      nodeMeshes.forEach(({ group, nodeData }, idx) => {
        const ring = RINGS_CONFIG[nodeData.ringIndex]
        const currentAngle = nodeData.phase + elapsedTime * nodeData.speed

        // Orbit in ring local plane
        const localPos = new THREE.Vector3(
          Math.cos(currentAngle) * nodeData.radius,
          Math.sin(currentAngle) * nodeData.radius,
          0
        )

        // Apply ring tilt
        const ringEuler = new THREE.Euler(ring.rotX, ring.rotY, ring.rotZ, 'XYZ')
        localPos.applyEuler(ringEuler)
        group.position.copy(localPos)

        // Connect constellation line from center to node
        positionsArray[idx * 6] = 0
        positionsArray[idx * 6 + 1] = 0
        positionsArray[idx * 6 + 2] = 0
        positionsArray[idx * 6 + 3] = localPos.x
        positionsArray[idx * 6 + 4] = localPos.y
        positionsArray[idx * 6 + 5] = localPos.z
      })

      lineGeo.attributes.position.needsUpdate = true

      // Project 3D Node Positions to 2D Screen Overlay (clamped safely inside stage)
      const now = performance.now()
      if (now - lastProjectionUpdate > 25) {
        lastProjectionUpdate = now
        const stageW = stage.clientWidth || 540
        const stageH = stage.clientHeight || 540

        // Safe padding so pill labels never touch or exceed the container boundary
        const padX = stageW < 420 ? 36 : 48
        const padY = stageH < 420 ? 20 : 28

        const projections = nodeMeshes.map((meshItem) => {
          meshItem.group.getWorldPosition(tempVec)
          tempVec.project(camera)

          // Normalized Device Coordinates to pixel coordinates
          const rawX = (tempVec.x * 0.5 + 0.5) * stageW
          const rawY = (-tempVec.y * 0.5 + 0.5) * stageH
          const isFront = tempVec.z < 1

          // Clamp screen coordinates so pills are guaranteed to stay within safe bounds
          const safeX = Math.max(padX, Math.min(stageW - padX, rawX))
          const safeY = Math.max(padY, Math.min(stageH - padY, rawY))

          return {
            id: meshItem.nodeData.id,
            node: meshItem.nodeData,
            x: safeX,
            y: safeY,
            visible: isFront,
          }
        })
        setProjectedPositions(projections)
      }

      renderer.render(scene, camera)
    }

    animate()

    // ──────────────────────────────────────────────────────────
    // 10. Responsive Resize Observer
    // ──────────────────────────────────────────────────────────
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect
        if (newW > 0 && newH > 0) {
          updateCameraDistance(newW, newH)
          renderer.setSize(newW, newH)
        }
      }
    })
    resizeObserver.observe(stage)

    // ──────────────────────────────────────────────────────────
    // 11. Cleanup on Unmount
    // ──────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => mat.dispose())
          } else {
            obj.material.dispose()
          }
        }
      })
      if (particleTexture) particleTexture.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      className="career-galaxy-stage"
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="3D Career Galaxy Visualization"
    >
      {/* Wrapper for subtle, restrained hover tilt & shift (3-5° max) */}
      <div
        className="career-galaxy-hover-wrapper"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translate3d(${tilt.shiftX}px, ${tilt.shiftY}px, 0)`,
          transition: isHovered
            ? 'transform 0.12s ease-out'
            : 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Contained Seamless Atmospheric Aura */}
        <div className="galaxy-ambient-aura" aria-hidden="true" />

        {/* Main Three.js Canvas */}
        <canvas ref={canvasRef} className="galaxy-canvas" />

        {/* Overlay of Tracking 2D Node Chips (Safely Clamped) */}
        <div className="galaxy-nodes-overlay" aria-hidden="true">
          {projectedPositions.map(({ id, node, x, y, visible }) => {
            if (!visible) return null

            return (
              <div
                key={id}
                className="galaxy-node-pill"
                style={{
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
              >
                <span
                  className="node-pill-dot"
                  style={{ backgroundColor: node.cssColor, color: node.cssColor }}
                />
                <span className="node-pill-label">{node.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
