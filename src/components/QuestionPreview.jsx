import { Comment } from "components/Comment";
import { ChevronLeftIcon, ChevronRightIcon } from "components/Icons";
import { NewComment } from "components/NewComment";

export const QuestionPreview = ({
    postData = {
        id: 1234,
        type: "question",
        title: "asdfsadf",
        body: "asdfhsdkj",
        author: "authorId",
        date: new Date(),
        comments: [{ id: 456, author: "authorId", body: "" }],
        answers: ["postid1", "postid2"],
        votes: 25,
    },
    upVote = () => null,
    downVote = () => null,
}) => {
    const textTrimmer = (text) => {
        return text.length === 50 ? text.slice(0, 48) + "..." : text;
    };

    return (
        <div className="flex w-full mx-auto border rounded-md p-2 shadow-md">
            {/* User Image */}
            <div className="flex items-center justify-start sm:p-2 flex-shrink-0 ">
                <img
                    src="https://picsum.photos/200/300"
                    alt="random"
                    className=" aspect-square w-16 rounded-full object-cover object-center mb-auto"
                />
            </div>

            {/* body */}

            <div className="flex flex-col ml-4 ">
                <h2 className="font-semibold text-lg p-2">Example User</h2>

                <p className="p-2 text-sm">
                    {textTrimmer("How to Center a Div? Please Help!")}
                </p>

                <div className="flex p-2 gap-2 text-xs">
                    <p className="border px-2 py-1 rounded-md">4 Comments</p>
                    <p className="border px-2 py-1 rounded-md">25 Votes</p>
                    <p className="ml-auto text-gray-600 font-semibold mt-auto">
                        Posted - 07-05-2022 10:49 AM
                    </p>
                </div>
            </div>
        </div>
    );
};
