import { AlertCircle } from 'lucide-react';
import './ui.css';

/**
 * FormField Component
 * -------------------
 * Reusable, accessible form control with integrated:
 * - Proper label-input binding via htmlFor and id
 * - Accessible error notification via role="alert" and aria-invalid
 * - Icon prefix support
 * - Field-specific error and helper message presentation
 */
export default function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error = '',
  helperText = '',
  icon: Icon,
  className = '',
  children,
  ...rest
}) {
  const hasError = Boolean(error);
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className={`form-field-group ${className}`}>
      <div className="form-field-header">
        <label htmlFor={id} className="form-field-label">
          {label}
          {required && <span className="form-field-required" aria-hidden="true">*</span>}
        </label>
      </div>

      <div className="form-field-input-wrapper">
        {Icon && <Icon size={18} className="form-field-icon" />}

        {type === 'textarea' ? (
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : helperText ? hintId : undefined}
            className={`form-field-input ${Icon ? 'has-icon' : ''} ${hasError ? 'has-error' : ''}`}
            rows={4}
            {...rest}
          />
        ) : type === 'select' ? (
          <select
            id={id}
            value={value}
            onChange={onChange}
            required={required}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : helperText ? hintId : undefined}
            className={`form-field-input ${Icon ? 'has-icon' : ''} ${hasError ? 'has-error' : ''}`}
            {...rest}
          >
            {children}
          </select>
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : helperText ? hintId : undefined}
            className={`form-field-input ${Icon ? 'has-icon' : ''} ${hasError ? 'has-error' : ''}`}
            {...rest}
          />
        )}
      </div>

      {hasError && (
        <p id={errorId} className="form-field-error" role="alert" aria-live="polite">
          <AlertCircle size={14} />
          <span>{error}</span>
        </p>
      )}

      {!hasError && helperText && (
        <p id={hintId} className="form-field-hint">
          {helperText}
        </p>
      )}
    </div>
  );
}
