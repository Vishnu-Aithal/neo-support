import { DeleteIcon } from "assets/Icons/Icons";
import { LinkType } from "types/Link";

interface DeleteProps {
    deletePRlink: (prData: LinkType) => Promise<void>;
    prData: LinkType;
}

export const PRCardDeleteButton: React.FC<DeleteProps> = ({
    deletePRlink,
    prData,
}) => {
    return (
        <button
            onClick={() => deletePRlink(prData)}
            className="absolute rounded-sm p-1 -top-1 -right-1 hover:scale-105 bg-red-400 dark:bg-red-700 transition-all">
            <DeleteIcon className={"w-5 h-5"} />
        </button>
    );
};
