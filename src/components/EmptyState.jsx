import Icon from "./Icon";

export default function EmptyState({
  title = "No encontramos resultados",
  message = "Prueba con otros términos.",
  icon = "person",
}) {
  return (
    <div className="alert alert-light empty-state" role="status">
      <Icon name={icon} size={30} />
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
