import { CloseIcon } from "assets/Icons/Icons";

export const PreviewDeleteButton = ({ deletePreview, postData }) => {
    return (
        <button
            onClick={() => deletePreview(postData)}
            className="absolute rounded-sm p-2 top-1 right-1 hover:scale-105 bg-red-400 transition-all">
            <CloseIcon className={"w-5 h-5"} />
        </button>
    );
};
