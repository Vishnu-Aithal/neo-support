import { NewPost } from "./NewPost";

export const NewPostContainer = ({
    type,
    title,
    setTitle,
    addClickHandler,
    body,
    setBody,
}) => {
    return (
        <div className="border w-full p-2 rounded-md flex flex-col">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="p-2 outline-none border-b mb-3"
                placeholder="Answer Title"
            />
            <NewPost value={body} setValue={setBody} />

            <button
                onClick={addClickHandler}
                disabled={!(body && title)}
                className="border px-3 py-1 rounded-md ml-auto mt-3 shadow-md bg-gray-300 disabled:text-gray-500 hover:scale-110 disabled:shadow-none disabled:pointer-events-none">
                {type === "question" ? "Post Question" : "Post Answer"}
            </button>
        </div>
    );
};
