import Icon from "./Icon";

export default function FormSuccess({
  title = "Envío guardado.",
  message = "",
}) {
  return (
    <div className="alert alert-success form-success" role="status">
      <Icon name="check" size={18} />
      <span><strong>{title}</strong>{message && ` ${message}`}</span>
    </div>
  );
}
