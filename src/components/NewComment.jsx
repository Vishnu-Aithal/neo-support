export const NewComment = ({ postComment = () => null }) => {
    return (
        <div className="flex">
            <input
                type="text"
                className="w-full p-2 outline-none peer"
                placeholder="Add Comment"
            />
            <button className="ml-auto px-2 border m-1 rounded-sm peer-placeholder-shown:hidden">
                Comment
            </button>
        </div>
    );
};
