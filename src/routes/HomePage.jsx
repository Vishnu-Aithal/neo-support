import { SignIn } from "components/SignIn/SignIn";
import HomeImage from "assets/images/home-image.svg";
import { useSelector } from "react-redux";

export const HomePage = () => {
    const currentUser = useSelector((state) => state.currentUser);
    return (
        <div className="h-screen w-screen flex sm:gap-10 flex-wrap items-center justify-center relative text-zinc-700 bg-slate-50 animate-fade-in">
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
    );
};
