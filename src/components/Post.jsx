import { Comment } from "components/Comment";
import { ChevronLeftIcon, ChevronRightIcon } from "components/Icons";
import { NewComment } from "components/NewComment";

export const Post = ({
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
        <div className="flex flex-col w-full sm:w-10/12 mx-auto ">
            <div className="border rounded-md rounded-br-none">
                {/* Header */}
                <div className="flex items-stretch p-4 border-b">
                    {/* Author Image */}
                    <img
                        src="https://picsum.photos/200/300"
                        alt="random"
                        className="w-16 rounded-lg object-cover object-center h-16 mt-auto"
                    />
                    {/* Author Namme */}

                    <h2 className="ml-4 font-semibold text-xl mt-auto">
                        Example User
                    </h2>
                    {/* Time Stamp */}
                    <p className="text-xs ml-auto text-gray-600 font-semibold mt-auto">
                        Posted - 07-05-2022 10:49 AM
                    </p>
                    {/* Votes */}
                    <div className="flex flex-col ml-2 mb-auto items-center text-xl">
                        <button>
                            <ChevronLeftIcon className={"h-8 w-8"} />
                        </button>
                        {25}
                        <button>
                            <ChevronRightIcon className={"h-8 w-8"} />
                        </button>
                    </div>
                </div>
                {/* body */}
                <p className=" p-4">
                    The type read-only property returns a string representing
                    the type of navigation. The value must be one of the
                    following: navigate — Navigation started by clicking a link,
                    entering the URL in the browser's address bar, form
                    submission, or initializing through a script operation other
                    than reload and back_forward as listed below. reload —
                    Navigation is through the browser's reload operation or
                    location.reload(). back_forward — Navigation is through the
                    browser's history traversal operation. prerender —
                    Navigation is initiated by a prerender hint.
                </p>
                {/* comments */}
            </div>
            <div className="w-11/12 ml-auto border border-t-0 rounded-md rounded-t-none divide-y">
                <Comment />
                <Comment />
                <Comment />
                <NewComment />
            </div>
        </div>
    );
};
