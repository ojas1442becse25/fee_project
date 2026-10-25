import { motion } from 'framer-motion';

// MatchScore
// ----------
// Reusable circular score indicator (0 - 100). Used on career cards and
// the career detail page to show how well a career matches the user.
const MatchScore = ({ score, size = 80, delay = 0, label = 'Match Score' }) => {
  const radius = 34;
  const circumference = 2 * Math.PI * radius; // ≈ 213.628

  return (
    <div
      className="match-circle-pro"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${label}: ${score}%`}
      title={`${label}: ${score}%`}
    >
      <svg className="progress-ring" width={size} height={size}>
        <circle
          className="progress-ring-circle-bg"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="6"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          className="progress-ring-circle"
          stroke="var(--accent)"
          strokeWidth="6"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: score / 100 }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: 0,
            transformOrigin: '50% 50%',
            transform: 'rotate(-90deg)'
          }}
        />
      </svg>
      <div className="match-percentage-circle">
        <span>{score}%</span>
      </div>
    </div>
  );
};

export default MatchScore;