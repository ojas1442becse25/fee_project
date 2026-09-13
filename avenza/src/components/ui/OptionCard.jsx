import { motion } from 'framer-motion';

// OptionCard
// ----------
// A reusable, selectable choice card used by every question step
// (education levels, streams, interests, strengths, priorities...).
//
// Props make it reusable across many different grids:
//  - label        text shown on the card
//  - description  optional small helper text
//  - icon         optional lucide icon
//  - selected     bool -> drives the .selected class (conditional rendering)
//  - onSelect     callback fired when the card is clicked
//  - variant      which visual style to use (maps to existing CSS classes)

const STYLE_MAPS = {
  selection: {
    card: 'selection-card',
    content: null,
    icon: null,
    label: null,
    desc: null,
    indicator: null,
    animateIn: false
  },
  compact: {
    card: 'goal-card-compact',
    content: null,
    icon: null,
    label: null,
    desc: null,
    indicator: null,
    animateIn: false
  },
  workPref: {
    card: 'work-pref-card',
    content: null,
    icon: null,
    label: 'work-pref-label',
    desc: 'work-pref-desc',
    indicator: 'check-mark',
    animateIn: false
  },
  interest: {
    card: 'interest-card-pro',
    content: 'interest-content',
    icon: 'interest-icon-pro',
    label: 'interest-label-pro',
    desc: 'interest-desc',
    indicator: 'selected-indicator',
    animateIn: true
  },
  strength: {
    card: 'strength-card-pro',
    content: 'strength-content',
    icon: 'strength-icon-pro',
    label: 'strength-label-pro',
    desc: 'strength-desc',
    indicator: 'selected-indicator-small',
    animateIn: true
  },
  priority: {
    card: 'priority-card-pro',
    content: 'priority-content',
    icon: 'priority-icon-pro',
    label: 'priority-label-pro',
    desc: 'priority-desc',
    indicator: 'selected-indicator-small',
    animateIn: true
  }
};

const OptionCard = ({
  label,
  description,
  icon: Icon,
  selected = false,
  onSelect,
  variant = 'compact'
}) => {
  const style = STYLE_MAPS[variant] || STYLE_MAPS.compact;
  const className = `${style.card} ${selected ? 'selected' : ''}`.trim();

  // Simple text-only options (education levels, streams, goals, exams).
  if (!style.label) {
    const content = (
      <button type="button" className={className} onClick={onSelect} aria-pressed={selected}>
        {label}
      </button>
    );
    // 'selection' cards animate on hover; 'compact' ones do not.
    return style.card === 'selection-card' ? (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        {content}
      </motion.div>
    ) : (
      content
    );
  }

  return (
    <motion.button
      type="button"
      className={className}
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={selected}
      {...(style.animateIn
        ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 } }
        : {})}
    >
      {Icon && style.icon && (
        <div className={style.icon}>
          <Icon size={24} />
        </div>
      )}
      {!style.content && (
        <>
          <span className={style.label}>{label}</span>
          {description && style.desc && <span className={style.desc}>{description}</span>}
        </>
      )}
      {style.content && (
        <div className={style.content}>
          <span className={style.label}>{label}</span>
          {description && style.desc && <span className={style.desc}>{description}</span>}
        </div>
      )}
      {selected && style.indicator && <div className={style.indicator}>✓</div>}
    </motion.button>
  );
};

export default OptionCard;