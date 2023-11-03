import logo from "../../../public/imgs/gpbLogo.png";

export default function Footer() {
  return (
    <div className="w-full border-t border-blue-500 dark:border-dark-300 mt-20">
      <div className="max-w-6xl mx-auto py-6 flex justify-between px-6 items-center">
        <div className="px-4 py-2 rounded-full dark:bg-dark-100">
          <img src={logo} alt="" className="h-7" />
        </div>

        <div className="text-blue-500 font-semibold text-md dark:text-dark-300">
          {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
