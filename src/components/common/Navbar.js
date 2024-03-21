import logo from "../../assets/logo.png";

export default function Navbar (){
    return (
        <header className="rounded-lg p-4 bg-gray-600 dark:text-gray-100">
            <div className="container flex justify-between h-16 mx-auto">
                <div className="flex">
                    <a rel="noopener noreferrer" href="#" aria-label="Back to homepage"
                       className="flex items-center p-2 mr-64">
                        <img src={logo} className="rounded-full bg-gray-800 w-12 h-12"/>
                    </a>
                    <ul className="items-stretch hidden space-x-3 lg:flex">
                        <CustomLink href="/home">Home</CustomLink>
                        <CustomLink href="/products">Products</CustomLink>
                    </ul>
                </div>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    <button
                            className="px-4 py-1 mr-3 font-semibold text-sm rounded border-2 border-amber-500 text-amber-500">Log
                        out
                    </button>
                </div>

            </div>
        </header>
    )
}

function  CustomLink({href, children, ...props}){
    const path = window.location.pathname;
    return (
        <li className="flex">
            <a rel="noopener noreferrer"
               {...props}
               href={href}
               className="flex items-center px-4 -mb-1 dark:border-transparent dark:text-violet-400"
            >
                <span
                    className={path === href ? "text-amber-500 border-b-2 border-amber-500 font-semibold": "text-gray-100"}
                >
                    {children}
                </span>
            </a>
        </li>
    )
}