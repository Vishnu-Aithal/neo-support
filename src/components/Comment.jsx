export const Comment = ({
    commentData = { id: 456, author: "authorId", body: "", date: new Date() },
}) => {
    return (
        <div className="flex flex-wrap items-center p-2">
            <p className="text-sm">Please imporve your question</p>
            <p className="text-sm text-grey-600 font-semibold ml-auto">
                - someUser
            </p>
            <p className="text-xs text-gray-500 font-semibold ml-2">
                07-05-2022 11:06 AM
            </p>
        </div>
    );
};
