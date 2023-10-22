export default function MainHeading({ children = "" }) {
  return (
    <h1 className="text-xl sm:text-3xl font-bold text-black dark:text-dark-100">
      {children}
    </h1>
  );
}
