import { NavLink } from "react-router-dom";
import { GithubIcon, PostIcon, UserIcon } from "components/Icons";

const NavBarLink = ({ to, Icon, name }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center sm:rounded-l-sm sm:p-4 sm:pl-4 py-4 p-6 group rounded-md ${
                    isActive
                        ? " bg-gray-300 "
                        : "hover:bg-gray-300 hover:bg-opacity-50"
                }`
            }>
            <Icon
                className={
                    "sm:w-6 sm:h-6 h-8 w-8 sm:ml-3 sm:mr-5 group-hover:scale-110 transition-transform stroke-2"
                }
            />{" "}
            <p className="group-hover:translate-x-1 transition-transform w-0 lg:w-44  overflow-hidden">
                {name}
            </p>
        </NavLink>
    );
};

export const NavBar = () => {
    return (
        <aside className="sm:h-full h-fit w-full sm:w-fit overflow-auto sm:static fixed bottom-0 sm:pt-20">
            <ul className="py-2 text-sm font-medium sm:space-y-5 sm:block flex justify-around w-full">
                <li>
                    <NavBarLink
                        to={"/links"}
                        Icon={GithubIcon}
                        name={"Pull Requests"}
                    />
                </li>

                <li>
                    <NavBarLink to={"/posts"} Icon={PostIcon} name={"Posts"} />
                </li>

                <li>
                    <NavBarLink
                        to={"/profile"}
                        Icon={UserIcon}
                        name={"Profile"}
                    />
                </li>
            </ul>
        </aside>
    );
};
