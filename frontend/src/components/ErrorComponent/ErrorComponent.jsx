import MainHeading from "../UI/MainHeading/MainHeading.jsx";
import {Link} from "react-router-dom";

export default function ErrorComponent() {
    return (
        <div className="flex items-center justify-center text-center w-[100vw] h-[100vh]">
            <div className="max-w-3xl flex flex-col gap-8 py-16 px-16 rounded-xl">
                <MainHeading>Этой страницы не существует</MainHeading>
                <Link to="/">вернуться на главную</Link>
            </div>
        </div>
    )
}