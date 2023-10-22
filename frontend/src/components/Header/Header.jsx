import HeaderInfo from "./HeaderInfo/HeaderInfo.jsx";
import Filters from "../Filters/Filters.jsx";
export default function Header(){
    return <header className="flex flex-col gap-6 items-center mt-12">
        <HeaderInfo/>
        <Filters/>
    </header>
}