export const NewComment = ({ postComment = () => null }) => {
    return (
        <div className="flex">
            <input
                type="text"
                className="w-full p-2 outline-none peer"
                placeholder="Add Comment"
            />
            <button className="ml-auto px-2 border-2 m-1 rounded-md peer-placeholder-shown:hidden hover:shadow-sm">
                Comment
            </button>
        </div>
    );
};
