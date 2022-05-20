import { CloseIcon } from "assets/Icons/Icons";

export const PRCardDeleteButton = ({ deletePRlink, prData }) => {
    return (
        <button
            onClick={() => deletePRlink(prData)}
            className="absolute rounded-sm p-1 -top-1 -right-1 hover:scale-105 bg-red-400 dark:bg-red-700 transition-all">
            <CloseIcon className={"w-5 h-5"} />
        </button>
    );
};
