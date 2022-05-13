export const UserReviews = ({ data }) => {
    return (
        <div className="w-full border mb-2 rounded-md">
            <div className="flex items-center border-b p-2">
                <img
                    className="w-10 h-10 rounded-full object-cover object-center"
                    src={data.img}
                    alt={data.login}></img>
                <h4 className="ml-2 font-semibold text-lg">{data.login}</h4>
            </div>
            <ul className="p-2 text-xs font-medium divide-y">
                {data.reviews.map((review, index) => (
                    <li className="p-1" key={index}>
                        {review}
                    </li>
                ))}
            </ul>
        </div>
    );
};
