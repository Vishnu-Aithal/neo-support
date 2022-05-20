import { Link } from "react-router-dom";
import { UserImage } from "./UserImage";
import { PreviewBody } from "./PreviewBody";

export const Preview = ({
    postData = {
        uid: 1234,
        type: "question",
        title: "asdfsadf",
        body: "asdfhsdkj",
        author: "authorId",
        authorDetails: {},
        created: new Date(),
        upVotes: [],
        downVotes: [],
    },
}) => {
    return (
        <div className="relative w-full">
            <Link
                to={
                    postData.parentId
                        ? `/question/${postData.parentId}?answerId=${postData.uid}`
                        : `/question/${postData.uid}`
                }
                className="flex w-full mx-auto border rounded-md p-2 shadow-sm hover:shadow-md">
                <UserImage src={postData.authorDetails.photoURL} />

                <PreviewBody postData={postData} />
            </Link>
        </div>
    );
};
