export default function BorderLayout({ children }) {
  return (
    <div className="p-4 border rounded-xl border-blue-500 dark:border-dark-300">
      {children}
    </div>
  );
}
