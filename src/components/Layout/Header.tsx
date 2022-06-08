import {
    LogInIcon,
    LogOutIcon,
    ToolsIcon,
    MoonIcon,
    SunIcon,
} from "../../assets/Icons/Icons";
import { Link } from "react-router-dom";
import { signOutFromApp } from "utils/firebase-utils";

import { toggleDarkMode } from "store/themeSlice";
import { UserType } from "types/User";
import { useAppDispatch, useAppSelector } from "store/TypedExports";

const UserDisplay: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    return (
        <Link
            to="/profile"
            className="ml-2 flex items-center max-h-full hover:scale-105">
            <img
                className="h-8 w-8 rounded-full mr-2"
                src={currentUser.photoURL}
                alt={currentUser.displayName}
            />
            <p className="font-semibold">{currentUser.displayName}</p>
        </Link>
    );
};

export const Header = () => {
    const currentUser = useAppSelector((state) => state.currentUser);
    const darkMode = useAppSelector((state) => state.theme.darkMode);
    const dispatch = useAppDispatch();
    return (
        <header className="flex p-3 items-center h-fit border-b dark:border-zinc-700 dark:bg-zinc-800">
            <Link
                to={"/"}
                className="flex flex-shrink-0 items-center ml-3 hover:scale-105">
                <ToolsIcon className={"h-10 w-10"} />
                <h1 className="text-xl hidden sm:block font-medium min-w-fit mx-4 sm:text-2xl sm:w-auto overflow-hidden">
                    Neo Support
                </h1>
            </Link>
            <button
                className="ml-auto hover:scale-105"
                onClick={() => dispatch(toggleDarkMode())}>
                {darkMode ? (
                    <SunIcon className="h-7 w-7" />
                ) : (
                    <MoonIcon className="h-7 w-7" />
                )}
            </button>
            {currentUser ? (
                <>
                    <UserDisplay currentUser={currentUser} />
                    <button
                        onClick={signOutFromApp}
                        className=" ml-2 hover:cursor-pointer  hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md group p-3">
                        <LogOutIcon className="h-5 w-5 overflow-visible" />
                    </button>
                </>
            ) : (
                <Link
                    to="/home"
                    className="ml-2 hover:cursor-pointer  hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md group p-3">
                    <LogInIcon className="h-5 w-5 overflow-visible" />
                </Link>
            )}
        </header>
    );
};
