import DropdownMenu from "../UI/DropdownMenu/DropdownMenu.jsx";

export default function GraphFilterDropdown({
  value,
  options,
  error,
  touched,
  name,
}) {
  return (
    <div className="relative w-36 xs:w-40 sm:w-56">
      <DropdownMenu name={name} value={value} options={options} error={false} />
    </div>
  );
}
