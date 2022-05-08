import { useState } from "react";
import { signInWithGoogle } from "utils/firebase";
import { GoogleIcon } from "./Icons";

export const SignIn = () => {
    const [pod, setPod] = useState("Select a POD");
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="border shadow-xs p-12 pb-6 rounded-md flex flex-col w-fit">
            <select
                className="p-2 border rounded-md"
                value={pod}
                onChange={(e) => setPod(e.target.value)}>
                <option disabled value="Select a POD">
                    Select a POD
                </option>
                <option value="POD A">POD A</option>
                <option value="POD B">POD B</option>
                <option value="POD C">POD C</option>
                <option value="POD D">POD D</option>
            </select>

            <button
                disabled={pod === "Select a POD"}
                onClick={() => signInWithGoogle(pod)}
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
