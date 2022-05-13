import { Link } from "react-router-dom";
import { deleteQuestion } from "utils/firebase-utils";
import { useAuth } from "contexts/AuthContext";
import { PreviewDeleteButton } from "./PreviewDeleteButton";
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
    const { currentUser } = useAuth();
    return (
        <div className="relative w-full">
            {currentUser?.uid === postData.author && (
                <PreviewDeleteButton
                    deletePreview={deleteQuestion}
                    postData={postData}
                />
            )}
            <Link
                to={
                    postData.parentId
                        ? `/question/${postData.parentId}`
                        : `/question/${postData.uid}`
                }
                className="flex w-full mx-auto border rounded-md p-2 shadow-sm hover:shadow-md">
                <UserImage src={postData.authorDetails.photoURL} />

                <PreviewBody postData={postData} />
            </Link>
        </div>
    );
};
