import { Link } from "react-router-dom";

export default function ErrorComponent() {
  return (
    <div className="bg-white dark:bg-dark-400 flex items-center justify-center text-center w-[100vw] h-[100vh]">
      <div className="max-w-3xl flex flex-col gap-8 py-16 px-16 rounded-xl dark:text-dark-100">
        <h1 className="text-3xl ">Этой страницы не существует</h1>
        <Link to="/">вернуться на главную</Link>
      </div>
    </div>
  );
}
