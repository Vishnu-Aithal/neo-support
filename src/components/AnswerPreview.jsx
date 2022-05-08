import { getDateString } from "utils/firebase";
import { Link } from "react-router-dom";

export const AnswerPreview = ({
    postData = {
        uid: 1234,
        type: "question",
        title: "asdfsadf",
        body: "asdfhsdkj",
        author: "authorId",
        authorDetails: {},
        created: new Date(),
        votes: 25,
    },
}) => {
    return (
        <Link
            to={`/question/${postData.parentId}`}
            className="flex w-full mx-auto border rounded-md p-2 shadow-sm hover:shadow-md">
            {/* User Image */}
            <div className="flex items-center justify-start sm:p-2 flex-shrink-0 ">
                <img
                    src={postData.authorDetails.photoURL}
                    alt="random"
                    className=" aspect-square w-16 rounded-full object-cover object-center mb-auto"
                />
            </div>

            {/* body */}

            <div className="flex flex-col ml-4 flex-grow">
                <h2 className="font-semibold text-lg p-2">
                    {postData.authorDetails.displayName}
                </h2>

                <p className="p-2 text-sm">{postData.title}</p>

                <div className="flex items-center p-2 gap-2 text-xs">
                    <p className="border px-2 py-1 rounded-md">{`${postData.votes} Votes`}</p>
                    <p className="ml-auto text-gray-600 font-semibold">
                        {`Created - ${getDateString(postData.created)}`}
                    </p>
                </div>
            </div>
        </Link>
    );
};