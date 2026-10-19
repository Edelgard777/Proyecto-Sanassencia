export default function Button({
  children,
  label,
  onClick = () => {},
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      className={`btn btn-${variant} ${className}`.trim()}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children ?? label}
    </button>
  );
}
