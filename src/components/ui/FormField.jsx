import styles from './FormField.module.css'

const tailwindStyles = {
  formField: 'flex flex-col gap-1.5',
  label: 'text-sm font-semibold text-sf-text',
  control:
    'w-full rounded-xl border border-solid border-sf-border bg-white px-3 py-2.5 text-sm text-sf-text shadow-sm outline-none transition focus:border-sf-green focus:ring-2 focus:ring-sf-green/20',
  error: 'mt-1 mb-0 text-xs font-semibold text-sf-error',
}

export default function FormField({
  variant = 'default',
  as = 'input',
  id,
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  autoComplete,
  placeholder,
  type = 'text',
  options = [],
  rows = 5,
  inputRef,
  className = '',
  min,
  max,
  step,
}) {
  const isTailwind = variant === 'tailwind'
  const errorId = `error-${id}`
  const wrapperClass = isTailwind ? tailwindStyles.formField : styles.formField
  const controlClass = isTailwind
    ? `${tailwindStyles.control}${
        error ? ' !border-sf-error focus:!border-sf-error focus:!ring-sf-error/20' : ''
      }`
    : undefined
  const commonProps = {
    id,
    name,
    value,
    onChange,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? errorId : undefined,
    ...(required ? { required: true, 'aria-required': 'true' } : {}),
  }

  return (
    <div className={`${wrapperClass}${className ? ` ${className}` : ''}`}>
      <label htmlFor={id} className={isTailwind ? tailwindStyles.label : undefined}>
        {label}
        {required && (
          <span className="required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>

      {as === 'select' && (
        <select {...commonProps} ref={inputRef} className={controlClass}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {as === 'textarea' && (
        <textarea
          {...commonProps}
          ref={inputRef}
          rows={rows}
          placeholder={placeholder}
          className={controlClass}
        />
      )}

      {as === 'input' && (
        <input
          {...commonProps}
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          min={min}
          max={max}
          step={step}
          className={controlClass}
        />
      )}

      {error && (
        <p
          className={isTailwind ? tailwindStyles.error : styles.formError}
          id={errorId}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}
