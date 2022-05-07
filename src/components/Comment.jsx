export const Comment = ({
    commentData = { id: 456, author: "authorId", body: "", date: new Date() },
}) => {
    return (
        <div className="flex flex-col p-1 text-xs">
            <p className="">
                Please imporve your question,Please imporve your question,
            </p>
            <div className="ml-auto mt-1 flex flex-col flex-shrink min-w-fit">
                <p className="font-semibold">someUser</p>
                <p className="text-gray-500 font-medium">07-05-2022 11:06 AM</p>
            </div>
        </div>
    );
};
