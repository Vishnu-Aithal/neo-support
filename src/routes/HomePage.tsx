import { SignIn } from "components/SignIn/SignIn";
import HomeImage from "assets/images/home-image.svg";
import { toggleDarkMode } from "store/themeSlice";
import { MoonIcon, SunIcon } from "assets/Icons/Icons";
import { useAppDispatch, useAppSelector } from "store/TypedExports";

export const HomePage: React.FC = () => {
    const currentUser = useAppSelector((state) => state.currentUser);
    const darkMode = useAppSelector((state) => state.theme.darkMode);
    const dispatch = useAppDispatch();
    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            <div className="min-h-screen h-fit w-screen flex sm:gap-10 flex-wrap items-center justify-center relative text-zinc-700 dark:text-zinc-200 bg-slate-50 dark:bg-zinc-800 animate-fade-in">
                <button
                    className="absolute top-4 right-4 hover:scale-105"
                    onClick={() => dispatch(toggleDarkMode())}>
                    {darkMode ? (
                        <SunIcon className="h-7 w-7" />
                    ) : (
                        <MoonIcon className="h-7 w-7" />
                    )}
                </button>
                <h1 className="sm:text-6xl text-4xl font-semibold w-full text-center animate-move-in-top">
                    NEO SUPPORT
                </h1>
                <img
                    className="animate-move-in-right"
                    src={HomeImage}
                    alt="HomeImage"
                />
                {!currentUser && <SignIn />}
            </div>
        </div>
    );
};
