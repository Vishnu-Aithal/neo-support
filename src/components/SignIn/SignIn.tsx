import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    signInWithGoogle,
    signInWithEmailPassword,
    signUpWithEmailPassword,
} from "utils/firebase-utils";
import { GoogleIcon } from "../../assets/Icons/Icons";
import { InputField } from "./InputField";

export const SignIn: React.FC = () => {
    const [signUpMode, setSignUpMode] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setphotoURL] = useState("");
    const [validPhotoURL, setValidPhotoURL] = useState(true);

    return (
        <div className="border dark:border-zinc-600 shadow-xs px-12 py-2 rounded-md flex flex-col w-fit animate-fade-in my-4 sm:my-0">
            <form
                className="flex flex-col"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (signUpMode) {
                        signUpWithEmailPassword({
                            email,
                            password,
                            displayName,
                            photoURL,
                        });
                    } else {
                        signInWithEmailPassword({ email, password });
                    }
                }}>
                {signUpMode && (
                    <>
                        <InputField
                            label={"Display Name"}
                            name="displayNAme"
                            value={displayName}
                            type={"text"}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                        <img
                            className="w-0 h-0 overflow-hidden"
                            src={photoURL}
                            alt="PhotoURL Validation"
                            onLoad={() => setValidPhotoURL(true)}
                            onError={() => setValidPhotoURL(false)}
                        />
                        <InputField
                            label={"Photo URL"}
                            name="photoURL"
                            value={photoURL}
                            type="url"
                            onChange={(e) => setphotoURL(e.target.value)}
                        />
                    </>
                )}
                <InputField
                    label={"Email"}
                    name="email"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    label={"Password"}
                    name="password"
                    pattern=".{8,}"
                    title="8 characters minimum"
                    value={password}
                    type={"password"}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {!signUpMode && (
                    <div className="flex items-center">
                        <p
                            onClick={() => setSignUpMode(true)}
                            className="group flex flex-col text-gray-400 cursor-pointer hover:scale-110">
                            New?
                            <span className="group-hover:text-zinc-800 dark:group-hover:text-zinc-200 group-hover:font-semibold">
                                Sign Up
                            </span>
                        </p>
                        <button
                            type="submit"
                            disabled={!(email && password)}
                            className="px-4 py-2 text-center hover:scale-110 hover:bg-gray-400 hover:text-slate-50 bg-white dark:bg-zinc-700  border dark:border-zinc-600 shadow-sm rounded-md my-6 ml-auto font-bold disabled:pointer-events-none disabled:bg-gray-400 dark:disabled:bg-gray-400">
                            Sign In
                        </button>
                    </div>
                )}
                {signUpMode && (
                    <div className="flex items-center">
                        <p
                            onClick={() => setSignUpMode(false)}
                            className="group flex flex-col text-gray-400 cursor-pointer hover:scale-110">
                            Existing User?
                            <span className="group-hover:text-zinc-800 dark:group-hover:text-zinc-200 group-hover:font-semibold">
                                Sign In
                            </span>
                        </p>
                        <button
                            type="submit"
                            disabled={
                                !(
                                    email &&
                                    password &&
                                    displayName &&
                                    validPhotoURL
                                )
                            }
                            className="px-4 py-2 text-center hover:scale-110 hover:bg-gray-400 hover:text-slate-50 bg-white dark:bg-zinc-700 border dark:border-zinc-600 shadow-sm rounded-md my-6 ml-auto font-bold disabled:pointer-events-none disabled:bg-gray-400 dark:disabled:bg-gray-400">
                            Sign Up
                        </button>
                    </div>
                )}
            </form>
            <div className="flex flex-col space-y-1 border-t-2 border-zinc-800 pt-2">
                <button
                    onClick={() => signInWithGoogle()}
                    type="button"
                    className="group px-4 py-1 flex items-center bg-white dark:bg-zinc-700 border dark:border-zinc-600 shadow-sm rounded-md font-bold disabled:pointer-events-none  hover:bg-blue-400 hover:text-slate-100 dark:hover:text-white">
                    <span className="group-hover:translate-x-4  transition-transform">
                        Sign in with Google
                    </span>
                    <GoogleIcon className="h-5 w-5 ml-6 group-hover:scale-110 transition-transform" />
                </button>
                <button
                    onClick={() =>
                        signInWithEmailPassword({
                            email: process.env.REACT_APP_TEST_EMAIL!,
                            password: process.env.REACT_APP_TEST_PASSWORD!,
                        })
                    }
                    className="px-4 py-1 w-full text-center hover:scale-110 hover:bg-gray-400 hover:text-slate-50 bg-white border shadow-sm rounded-md ml-auto font-bold disabled:pointer-events-none dark:bg-zinc-700 dark:border-zinc-600 dark:hover:text-white">
                    Sign In Demo
                </button>
                <Link
                    className="px-4 py-1 text-center hover:scale-110 hover:bg-gray-400 hover:text-slate-50 bg-white border shadow-sm rounded-md font-bold disabled:pointer-events-none dark:bg-zinc-700 dark:border-zinc-600 dark:hover:text-white"
                    to={"/pull-requests"}>
                    Explore
                </Link>
            </div>
        </div>
    );
};
