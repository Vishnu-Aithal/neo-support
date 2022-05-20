import { NewPost } from "./NewPost";

export const NewPostContainer = ({
    type,
    title,
    setTitle,
    addClickHandler,
    body,
    setBody,
}) => {
    const buttonTypes = {
        question: "Post Question",
        answer: "Post Answer",
        edit: "Save",
    };
    const placeHolderTypes = {
        question: "Question Title",
        answer: "Answer Title",
        edit: "New Title",
    };
    return (
        <div className="border dark:border-zinc-600 w-full p-2 rounded-md flex flex-col shadow-sm">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="p-2 outline-none border-b dark:border-zinc-600 dark:bg-zinc-800 mb-3"
                placeholder={`${placeHolderTypes[type]} `}
            />
            <NewPost value={body} setValue={setBody} />

            <button
                onClick={addClickHandler}
                disabled={!(body && title)}
                className="border dark:border-zinc-600 px-3 py-1 rounded-md ml-auto mt-3  shadow-md bg-green-400 dark:bg-green-600 disabled:text-gray-500 dark:disabled:text-zinc-600 disabled:bg-gray-300 dark:disabled:bg-gray-400 hover:scale-110 disabled:shadow-none disabled:pointer-events-none">
                {buttonTypes[type]}
            </button>
        </div>
    );
};
