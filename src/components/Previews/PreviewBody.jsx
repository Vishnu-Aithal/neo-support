import { getDateString } from "utils/firebase-utils";

export const PreviewBody = ({ postData }) => {
    return (
        <div className="flex flex-col ml-4 flex-grow">
            <h2 className="font-semibold text-lg p-2">
                {postData.authorDetails.displayName}
            </h2>

            <p className="p-2 text-sm">{postData.title}</p>

            <div className="flex items-center p-2 gap-2 text-xs">
                {postData.answers && (
                    <p className="border px-2 py-1 rounded-md">{`${postData.answers.length} Answers`}</p>
                )}
                <p className="border px-2 py-1 rounded-md">{`${
                    postData.upVotes.length - postData.downVotes.length
                } Votes`}</p>
                <p className="ml-auto text-gray-600 font-semibold">
                    {`Created - ${postData.created}`}
                </p>
            </div>
        </div>
    );
};
