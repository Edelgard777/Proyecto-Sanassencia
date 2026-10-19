export default function SearchBox({
  label = "Buscar",
  value = "",
  onChange = () => {},
  placeholder = "Escribe para buscar",
  name = "busqueda",
  className = "",
}) {
  return (
    <label className={`search-box ${className}`.trim()} htmlFor={name}>
      <span>{label}</span>
      <input
        className="form-control"
        id={name}
        name={name}
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}
