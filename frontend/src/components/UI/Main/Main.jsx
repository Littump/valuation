export default function Main({ children }) {
  return (
    <div className="max-w-xs xs:max-w-lg sm:max-w-3xl lg:max-w-6xl mx-auto min-h-screen flex flex-col gap-10">
      {children}
    </div>
  );
}
