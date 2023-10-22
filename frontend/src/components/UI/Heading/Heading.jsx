export default function Heading({ children = "" }) {
  return (
    <div className="font-semibold text-black text-md dark:text-dark-100">
      {children}
    </div>
  );
}
