// Reusable Button component.
// Variants: 'primary' | 'secondary'. Accepts an optional icon.
const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  icon: Icon,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {Icon && <Icon size={18} />}
      <span>{children}</span>
    </button>
  );
};

export default Button;