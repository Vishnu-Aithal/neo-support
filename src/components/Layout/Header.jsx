import { LogInIcon, LogOutIcon, ToolsIcon } from "../../assets/Icons/Icons";
import { Link } from "react-router-dom";
import { signOutFromApp } from "utils/firebase-utils";
import { useAuth } from "contexts/AuthContext";

const UserDisplay = ({ currentUser }) => {
    return (
        <Link to="/profile" className="ml-auto flex items-center max-h-full">
            <img
                className="h-8 w-8 rounded-full mr-2"
                src={currentUser.photoURL}
                alt={currentUser.displayName}
            />
            <p className="font-semibold">{currentUser.displayName}</p>
        </Link>
    );
};

export const Header = ({}) => {
    const { currentUser } = useAuth();
    return (
        <header className="flex p-3 items-center h-fit border-b">
            <Link to={"/"} className="flex flex-shrink-0 items-center ml-3 ">
                <ToolsIcon className={"h-10 w-10"} />
                <h1 className="text-xl font-medium min-w-fit mx-4 sm:text-2xl sm:w-auto overflow-hidden">
                    Neo Support
                </h1>
            </Link>
            {currentUser ? (
                <>
                    <UserDisplay currentUser={currentUser} />
                    <button
                        onClick={signOutFromApp}
                        className=" ml-2 hover:cursor-pointer  hover:bg-gray-100 rounded-md group p-3">
                        <LogOutIcon className="h-5 w-5 overflow-visible" />
                    </button>
                </>
            ) : (
                <Link
                    to="/home"
                    className="ml-auto hover:cursor-pointer  hover:bg-gray-100 rounded-md group p-3">
                    <LogInIcon className="h-5 w-5 overflow-visible" />
                </Link>
            )}
        </header>
    );
};
