import { InputField } from "components/SignIn/InputField";
import React, { useState } from "react";
import { useAppSelector } from "store/TypedExports";
import { UserType } from "types/User";
import { updateUserDetails } from "utils/firebase-utils/auth";

export const MyDetails: React.FC = () => {
    const currentUser = useAppSelector((state) => state.currentUser)!;
    const resetEdit = {
        displayName: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
    };
    const [editValues, setEditedValues] =
        useState<Omit<UserType, "uid" | "notifications">>(resetEdit);
    const [editMode, setEditMode] = useState(false);
    const [invalidPhotoURL, setInvalidPhotoURL] = useState(false);
    return (
        <div className="flex flex-col w-full items-center">
            {invalidPhotoURL && <p>Invalid Photo URL</p>}

            <img
                className={`w-2/6 sm:w-56 object-cover aspect-square rounded-full mb-8 ${
                    invalidPhotoURL ? "invisible" : ""
                }`}
                src={editValues.photoURL || currentUser.photoURL}
                alt={currentUser.displayName}
                onError={(e) => setInvalidPhotoURL(true)}
                onLoad={(e) => setInvalidPhotoURL(false)}
            />

            <form
                className="m-auto border dark:border-zinc-600 rounded-md p-10 pt-2"
                onSubmit={async (e) => {
                    e.preventDefault();
                    await updateUserDetails(editValues, currentUser.uid);
                    setEditMode(false);
                }}>
                <InputField
                    label={
                        editValues.displayName
                            ? "Display Name"
                            : currentUser.displayName
                    }
                    type="text"
                    name="displayName"
                    onChange={(e) =>
                        setEditedValues((ev) => ({
                            ...ev,
                            displayName: e.target.value,
                        }))
                    }
                    value={editValues.displayName}
                    disabled={!editMode}
                />
                <InputField
                    label={editValues.email ? "Email" : currentUser.email}
                    type="email"
                    name="email"
                    onChange={(e) =>
                        setEditedValues((ev) => ({
                            ...ev,
                            email: e.target.value,
                        }))
                    }
                    value={editValues.email}
                    disabled={!editMode}
                />
                <InputField
                    label={
                        editValues.photoURL ? "Photo URL" : currentUser.photoURL
                    }
                    type="text"
                    name="photoURL"
                    onChange={(e) =>
                        setEditedValues((ev) => ({
                            ...ev,
                            photoURL: e.target.value,
                        }))
                    }
                    value={editValues.photoURL}
                    disabled={!editMode}
                />
                {editMode ? (
                    <div className="flex items-center mt-8">
                        <button
                            onClick={(e) => {
                                setEditMode(false);
                                setEditedValues(resetEdit);
                            }}
                            type="button"
                            className="p-2 px-4 border dark:border-zinc-600 rounded-md bg-zinc-300 dark:bg-zinc-600 ">
                            Cancel
                        </button>
                        <button
                            disabled={
                                invalidPhotoURL ||
                                Object.values(resetEdit).join("") ===
                                    Object.values(editValues).join("")
                            }
                            type="submit"
                            className="disabled:opacity-50 p-2 px-4 ml-auto border dark:border-zinc-600 rounded-md bg-green-400 dark:bg-green-600 ">
                            Save
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={(e) => setEditMode(true)}
                        type="button"
                        className="p-2 w-full mt-8 border dark:border-zinc-600 rounded-md bg-zinc-300 dark:bg-zinc-600 ">
                        Edit
                    </button>
                )}
            </form>
        </div>
    );
};
