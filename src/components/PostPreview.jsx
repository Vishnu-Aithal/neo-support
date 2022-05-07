import { Comment } from "components/Comment";
import { ChevronLeftIcon, ChevronRightIcon } from "components/Icons";
import { NewComment } from "components/NewComment";

export const PostPreview = ({
    postData = {
        id: 1234,
        type: "question",
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
    return (
        <div className="flex sm:w-11/12 w-full mx-auto border rounded-md p-2">
            {/* User Image */}
            <div className="flex items-center justify-center w-1/12">
                <img
                    src="https://picsum.photos/200/300"
                    alt="random"
                    className=" aspect-square w-20 rounded-full object-cover object-center mb-auto"
                />
            </div>

            {/* body */}

            <div className="flex flex-col ml-4 w-11/12">
                <h2 className="font-semibold text-lg p-2">Example User</h2>
                <div className="w-full">
                    <p className="text-ellipsis whitespace-nowrap overflow-hidden p-2">
                        The type read-only property returns a string
                        representing the type of navigation. The value must be
                        one of the following: navigate — Navigation started by
                        clicking a link, entering the URL in the browser's
                        address bar, form submission, or initializing through a
                        script operation other than reload and back_forward as
                        listed below. reload — Navigation is through the
                        browser's reload operation or location.reload().
                        back_forward — Navigation is through the browser's
                        history traversal operation. prerender — Navigation is
                        initiated by a prerender hint.
                    </p>

                    <div className="flex p-2 gap-2">
                        <p className="border px-2 rounded-md">4 Comments</p>
                        <p className="border px-2 rounded-md">25 Votes</p>
                        <p className="text-xs ml-auto text-gray-600 font-semibold mt-auto">
                            Posted - 07-05-2022 10:49 AM
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
