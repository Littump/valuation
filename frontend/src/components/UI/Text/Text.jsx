export default function Text({ children = "" }) {
  return <p className="text-black text-md dark:text-dark-100">{children}</p>;
}
