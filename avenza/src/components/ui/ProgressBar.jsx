// Reusable progress bar. `value` is 0 - 100.
const ProgressBar = ({ value, label = '' }) => {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="progress-bar-ui">
      {label && (
        <div className="progress-bar-ui-header">
          <span className="progress-bar-ui-label">{label}</span>
          <span className="progress-bar-ui-value">{Math.round(clamped)}%</span>
        </div>
      )}
      <div className="progress-bar-ui-track">
        <div className="progress-bar-ui-fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;