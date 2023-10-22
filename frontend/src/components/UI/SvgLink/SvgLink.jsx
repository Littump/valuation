
export default function SvgLink({href="#", children}){
    return<>
        <a href={href} className="hover:text-black transition">
            {children}
        </a>
    </>
}