export const PreviewBody = ({ postData }) => {
    return (
        <div className="flex flex-col ml-4 flex-grow">
            <h2 className="font-semibold text-lg p-2">
                {postData.authorDetails.displayName}
            </h2>

            <p className="p-2 text-sm">{postData.title}</p>

            <div className="flex items-center flex-wrap p-2 gap-2 text-xs">
                {postData.answers && (
                    <p className="border dark:border-zinc-600 px-2 py-1 rounded-md">{`${postData.answers.length} Answers`}</p>
                )}
                <p className="border dark:border-zinc-600 px-2 py-1 rounded-md">{`${
                    postData.upVotes.length - postData.downVotes.length
                } Votes`}</p>
                {postData?.tags &&
                    postData.tags.map((tag) => (
                        <p
                            key={tag}
                            className="border dark:border-zinc-600 px-2 py-1 rounded-md">
                            {tag}
                        </p>
                    ))}
                <p className="ml-auto text-gray-500 font-semibold">
                    {`Created - ${postData.created}`}
                </p>
            </div>
        </div>
    );
};
