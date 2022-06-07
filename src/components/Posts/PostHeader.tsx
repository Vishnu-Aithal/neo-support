import { CaretUpFillIcon, CaretDownFillIcon } from "assets/Icons/Icons";
export const PostHeader = ({ post, unVote, upVote, downVote, currentUser }) => {
    return (
        <div className="flex p-4 pt-2 border-b dark:border-zinc-600">
            {/* Author Image */}
            <img
                src={post.authorDetails.photoURL}
                alt={post.authorDetails.displayName}
                className="w-20 rounded-lg object-cover object-center h-20 mt-auto flex-shrink-0"
            />
            {/* Author Namme */}

            <div className="ml-4 flex flex-col w-full pt-2">
                <p className="ml-auto text-xs text-gray-500 font-semibold">
                    {`Posted - ${post.created}`}
                </p>
                <h2 className="font-semibold text-xl mt-auto">
                    {post.authorDetails.displayName}
                </h2>
                {/* Time Stamp */}
            </div>
            {/* Votes */}
            <div className="flex flex-col sm:ml-2 ml-1 items-center text-xl duration-75">
                <button
                    className={`${
                        post.upVotes.includes(currentUser?.uid)
                            ? "scale-125 text-green-400"
                            : ""
                    }`}
                    disabled={!currentUser}
                    onClick={() =>
                        post.downVotes.includes(currentUser?.uid)
                            ? unVote(post, currentUser?.uid)
                            : upVote(post, currentUser?.uid)
                    }>
                    <CaretUpFillIcon className={"h-8 w-8"} />
                </button>
                {post.upVotes.length - post.downVotes.length}
                <button
                    className={`${
                        post.downVotes.includes(currentUser?.uid)
                            ? "scale-125 text-red-400"
                            : ""
                    }`}
                    disabled={!currentUser}
                    onClick={() =>
                        post.upVotes.includes(currentUser?.uid)
                            ? unVote(post, currentUser?.uid)
                            : downVote(post, currentUser?.uid)
                    }>
                    <CaretDownFillIcon className={"h-8 w-8"} />
                </button>
            </div>
        </div>
    );
};
