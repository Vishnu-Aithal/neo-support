import { NewPost } from "./NewPost";

export const NewPostModal = ({ closeModal = () => null }) => {
    return (
        <div className="w-screen h-screen fixed top-0 left-0 backdrop-blur-sm sm:p-10 p-5 hidden animate-fade-in">
            <NewPost />
            <div className="flex mt-5">
                <button className="ml-auto px-4 py-2 border-2 rounded-md">
                    Cancel
                </button>
                <button className="ml-2 px-4 py-2 border-2 rounded-md">
                    Post
                </button>
            </div>
        </div>
    );
};
