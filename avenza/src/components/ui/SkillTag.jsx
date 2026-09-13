// A small pill-shaped label used to render a single skill / stream
// tag. Used inside career cards and the career detail page.
const SkillTag = ({ children, variant = 'skill' }) => {
  const className = variant === 'stream' ? 'stream-tag' : 'skill-tag';
  return <span className={className}>{children}</span>;
};

export default SkillTag;