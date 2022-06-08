import { SetStateAction } from "react";
import { NewPost } from "./NewPost";

interface CommonProps {
    type: "answer" | "edit" | "question";
    title: string;
    setTitle: React.Dispatch<SetStateAction<string>>;
    addClickHandler: () => void;
    body: string;
    setBody: React.Dispatch<SetStateAction<string>>;
}

interface NewAnswerProps extends CommonProps {
    type: "answer";
}
interface EditPostProps extends CommonProps {
    type: "edit";
}
interface NewQuestionProps extends CommonProps {
    type: "question";
    currentTags: string[];
    currentTagHandler: (tag: string) => void;
    tags: string[];
}

type NewPostContainerProps = NewAnswerProps | EditPostProps | NewQuestionProps;

export const NewPostContainer: React.FC<NewPostContainerProps> = (props) => {
    const { type, title, setTitle, addClickHandler, body, setBody } = props;
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
        <div className="border dark:border-zinc-600 w-full p-2 rounded-md flex flex-col shadow-sm animate-fade-in">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="p-2 outline-none border-b dark:border-zinc-600 dark:bg-zinc-800 mb-3"
                placeholder={`${placeHolderTypes[type]} `}
            />
            <NewPost value={body} setValue={setBody} />
            {props.type === "question" && (
                <div className="flex flex-wrap gap-2">
                    {props.tags.map((tag) => (
                        <button
                            onClick={() => props.currentTagHandler(tag)}
                            className={`${
                                props.currentTags.includes(tag)
                                    ? "bg-gray-300 dark:bg-zinc-700"
                                    : ""
                            } p-2 border dark:border-zinc-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600`}>
                            {tag}
                        </button>
                    ))}
                </div>
            )}
            <button
                onClick={addClickHandler}
                disabled={!(body && title)}
                className="border dark:border-zinc-600 px-3 py-1 rounded-md ml-auto mt-3  shadow-md bg-green-400 dark:bg-green-600 disabled:text-gray-500 dark:disabled:text-zinc-600 disabled:bg-gray-300 dark:disabled:bg-gray-400 hover:scale-110 disabled:shadow-none disabled:pointer-events-none">
                {buttonTypes[type]}
            </button>
        </div>
    );
};
