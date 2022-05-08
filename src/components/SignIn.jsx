import { signInWithGoogle } from "utils/firebase";
import { GoogleIcon } from "./Icons";

export const SignIn = () => {
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="border shadow-xs p-12 rounded-md flex flex-col w-fit animate-fade-in">
            <button
                onClick={() => signInWithGoogle()}
                type="button"
                className="group px-4 py-2 flex items-center bg-white border shadow-sm rounded-md my-6 font-bold disabled:pointer-events-none disabled:bg-gray-400">
                <span className="group-hover:translate-x-4 transition-transform">
                    Sign in with Google
                </span>
                <GoogleIcon className="h-5 w-5 ml-6 group-hover:scale-110 transition-transform" />
            </button>
        </form>
    );
};
