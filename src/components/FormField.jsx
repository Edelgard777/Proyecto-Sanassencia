export default function FormField({
  label,
  name,
  value = "",
  onChange = () => {},
  type = "text",
  as = "input",
  options = [],
  placeholder = "",
  error = "",
  className = "",
  ...props
}) {
  const controlClass = as === "select" ? "form-select" : "form-control";
  const controlProps = {
    className: `${controlClass}${error ? " is-invalid" : ""}`,
    id: name,
    name,
    value,
    onChange,
    placeholder,
    "aria-invalid": error ? "true" : "false",
    "aria-describedby": error ? `${name}-error` : undefined,
    ...props,
  };

  return (
    <div className={`form-field ${className}`.trim()}>
      <label className="form-label" htmlFor={name}>{label}</label>
      {as === "select" ? (
        <select {...controlProps}>
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
      ) : as === "textarea" ? (
        <textarea {...controlProps} />
      ) : (
        <input {...controlProps} type={type} />
      )}
      {error && <div className="invalid-feedback d-block" id={`${name}-error`}>{error}</div>}
    </div>
  );
}
