import { NavLink } from "react-router-dom";
import { BellIcon, GithubIcon, PostIcon, UserIcon } from "assets/Icons/Icons";
import { useSelector } from "react-redux";

const NavBarLink = ({ to, Icon, name }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center sm:rounded-l-sm sm:p-4 sm:pl-4 py-4 p-6 group rounded-md ${
                    isActive
                        ? "bg-gray-300 dark:bg-zinc-700"
                        : "hover:bg-gray-300 hover:bg-opacity-50"
                }`
            }>
            <Icon
                className={
                    "sm:w-6 sm:h-6 h-6 w-6 sm:ml-3 sm:mr-5 group-hover:scale-110 transition-transform stroke-2"
                }
            />{" "}
            <p className="group-hover:translate-x-1 transition-transform w-0 lg:w-44  overflow-hidden">
                {name}
            </p>
        </NavLink>
    );
};

export const NavBar = () => {
    const currentUser = useSelector((state) => state.currentUser);
    const notificationCount = currentUser?.notifications?.reduce(
        (count, notification) =>
            notification.read === false ? count + 1 : count,
        0
    );
    return (
        <aside className="sm:h-full h-fit w-full sm:w-fit overflow-auto sm:static fixed bottom-0 z-10 bg-white dark:bg-zinc-800 border-t-2 sm:border-t-0">
            <ul className="sm:py-5 text-sm font-medium sm:space-y-5 sm:block flex justify-around items-center w-full">
                <li>
                    <NavBarLink
                        to={"/pull-requests"}
                        Icon={GithubIcon}
                        name={"Pull Requests"}
                    />
                </li>

                <li>
                    <NavBarLink
                        to={"/questions"}
                        Icon={PostIcon}
                        name={"Questions"}
                    />
                </li>

                <li className="relative overflow-visible">
                    <NavBarLink
                        to={"/notifications"}
                        Icon={BellIcon}
                        name={"Notifications"}
                    />

                    <div
                        className={`${
                            notificationCount ? "flex" : "hidden"
                        } absolute top-1 right-1 items-center content-center p-1 rounded-full min-w-fit w-6 bg-red-500`}>
                        <p className=" text-white text-center w-full text-xs font-bold">
                            {notificationCount}
                        </p>
                    </div>
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
