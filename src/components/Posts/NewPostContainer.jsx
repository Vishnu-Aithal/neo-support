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
        <div className="border w-full p-2 rounded-md flex flex-col shadow-sm">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="p-2 outline-none border-b mb-3"
                placeholder={`${placeHolderTypes[type]} `}
            />
            <NewPost value={body} setValue={setBody} />

            <button
                onClick={addClickHandler}
                disabled={!(body && title)}
                className="border px-3 py-1 rounded-md ml-auto mt-3  shadow-md bg-green-400 disabled:text-gray-500 disabled:bg-gray-300 hover:scale-110 disabled:shadow-none disabled:pointer-events-none">
                {buttonTypes[type]}
            </button>
        </div>
    );
};
