import MainHeading from "../UI/MainHeading/MainHeading";
import Heading from "../UI/Heading/Heading";
export default function Contact({ props }) {
  return (
    <div className=" dark:bg-dark-600 rounded-lg overflow-hidden shadow-sm h-full flex flex-col justify-start">
      <div>
        <img src={props.img} alt="" className="h-52 w-full bg-cover" />
      </div>
      <div className="pt-4 pb-8 px-6 flex gap-3 flex-col h-full dark:border-0 border-blue-400 border rounded-bl-lg rounded-br-lg border-t-0">
        <div className="w-32">
          <MainHeading>{props.name}</MainHeading>
        </div>
        <h3 className=" text-black dark:text-dark-gray-400">{props.status}</h3>
        <Heading>{props.university}</Heading>
        <div className="flex gap-4">
          <a
            className="text-blue-500 hover:text-black transition dark:hover:text-white dark:text-dark-300"
            href={"https://t.me/" + props.telegram.slice(1)}
          >
            {props.telegram}
          </a>

          {props.github === "#" ? (
            <></>
          ) : (
            <a
              className="text-blue-500 hover:text-black transition dark:hover:text-white dark:text-dark-300"
              href={props.github}
            >
              github
            </a>
          )}
        </div>
        {props.website === undefined ? (
          <></>
        ) : (
          <a
            className="text-blue-500 hover:text-black transition dark:hover:text-white dark:text-dark-300"
            href={props.website}
          >
            сайт
          </a>
        )}
      </div>
    </div>
  );
}
