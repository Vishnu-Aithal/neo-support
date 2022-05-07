import { LogOutIcon, ToolsIcon } from "./Icons";
import { Link } from "react-router-dom";

export const Header = ({}) => {
    return (
        <header className="flex p-3 items-center h-fit shadow-sm">
            <Link to={"/"} className="flex flex-shrink-0 items-center ml-3 ">
                <ToolsIcon className={"h-10 w-10"} />
                <h1 className="text-base font-medium sm:min-w-fit mx-2 sm:text-2xl w-0 sm:w-auto overflow-hidden">
                    Neo Support
                </h1>
            </Link>

            <Link
                to={"/"}
                className="ml-auto hover:cursor-pointer  hover:bg-gray-100 dark:hover:bg-zinc-600 rounded-md group p-3">
                <LogOutIcon className="h-5 w-5 overflow-visible" />
            </Link>
        </header>
    );
};
