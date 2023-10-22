import NavLink from "../UI/NavLinkComponent/NavLinkComponent.jsx";
import LogoImg from "../LogoImg/LogoImg.jsx";

export default function Logo(){
    return <div className=" flex gap-5 items-center">
        <LogoImg/>
        <h5 className="text-xl text-black font-bold">
            <NavLink text="Аналитика Недвижимости"/>
        </h5>
    </div>
}