import { CaretUpFillIcon, CaretDownFillIcon } from "assets/Icons/Icons";
import { AnswerType, QuestionType } from "types/Post";
import { UserType } from "types/User";

interface PostHeaderGeneric<T> {
    unVote: (userId: string) => void;
    upVote: (userId: string) => void;
    downVote: (userId: string) => void;
    post: T;
    currentUser: UserType | null;
    authorDetails: UserType | null;
}

type PostHeaderProps =
    | PostHeaderGeneric<QuestionType>
    | PostHeaderGeneric<AnswerType>;

export const PostHeader: React.FC<PostHeaderProps> = ({
    post,
    unVote,
    upVote,
    downVote,
    currentUser,
    authorDetails,
}) => {
    return (
        <div className="flex p-4 pt-2 border-b dark:border-zinc-600">
            {/* Author Image */}
            <img
                src={authorDetails?.photoURL}
                alt={authorDetails?.displayName}
                className="w-20 rounded-lg object-cover object-center h-20 mt-auto flex-shrink-0"
            />
            {/* Author Namme */}

            <div className="ml-4 flex flex-col w-full pt-2">
                <p className="ml-auto text-xs text-gray-500 font-semibold">
                    {`Posted - ${post.created}`}
                </p>
                <h2 className="font-semibold text-xl mt-auto">
                    {authorDetails?.displayName}
                </h2>
                {/* Time Stamp */}
            </div>
            {/* Votes */}
            <div className="flex flex-col sm:ml-2 ml-1 items-center text-xl duration-75">
                {currentUser && (
                    <button
                        className={`${
                            post.upVotes.includes(currentUser?.uid)
                                ? "scale-125 text-green-400"
                                : ""
                        }`}
                        onClick={() =>
                            post.downVotes.includes(currentUser?.uid)
                                ? unVote(currentUser?.uid)
                                : upVote(currentUser?.uid)
                        }>
                        <CaretUpFillIcon className={"h-8 w-8"} />
                    </button>
                )}
                {post.upVotes.length - post.downVotes.length}
                {!currentUser && (
                    <p className="text-sm font-semibold text-zinc-500">Votes</p>
                )}
                {currentUser && (
                    <button
                        className={`${
                            post.downVotes.includes(currentUser?.uid)
                                ? "scale-125 text-red-400"
                                : ""
                        }`}
                        onClick={() =>
                            post.upVotes.includes(currentUser?.uid)
                                ? unVote(currentUser?.uid)
                                : downVote(currentUser?.uid)
                        }>
                        <CaretDownFillIcon className={"h-8 w-8"} />
                    </button>
                )}
            </div>
        </div>
    );
};
