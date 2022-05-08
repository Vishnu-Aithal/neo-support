import { SignIn } from "components/SignIn";
import { useAuth } from "contexts/AuthContext";
import HomeImage from "assets/images/home-image.svg";

export const HomePage = () => {
    const { currentUser } = useAuth();
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
