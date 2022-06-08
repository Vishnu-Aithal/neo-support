export const UserImage: React.FC<{ src: string }> = ({ src }) => {
    return (
        <div className="flex items-center justify-start sm:p-2 flex-shrink-0 ">
            <img
                src={src}
                alt="random"
                className=" aspect-square w-16 rounded-full object-cover object-center mb-auto"
            />
        </div>
    );
};
