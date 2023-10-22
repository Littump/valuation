export default function LightHeading({ children = "" }) {
  return (
    <h4 className="text-dark-gray-400 text-md font-bold dark:text-dark-100">
      {children}
    </h4>
  );
}
