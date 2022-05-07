import axios from "axios";

export const processUrl = (userUrl) => {
    userUrl = userUrl.replace(
        "https://github.com/",
        "https://api.github.com/repos/"
    );
    userUrl = userUrl.replace("/pull/", "/pulls/");
    const reviewsUrl = userUrl + "/reviews";
    const commentsUrl = userUrl + "/comments";
    return { reviewsUrl, commentsUrl };
};

export const getReviewsAndComments = async (url) => {
    const { commentsUrl, reviewsUrl } = processUrl(url);

    const commentsResponse = await axios.get(commentsUrl);
    const reviewsResponse = await axios.get(reviewsUrl);
    const reviewsFromServer = [
        ...commentsResponse.data,
        ...reviewsResponse.data,
    ];

    let reviewers = [];

    reviewsFromServer.forEach(
        ({
            user: { id, login, avatar_url: img },
            body,
            original_line,
            author_association,
        }) => {
            if (author_association !== "OWNER") {
                const currentReviewer = reviewers.find(
                    (reviewer) => reviewer.id === id
                );
                if (currentReviewer) {
                    body &&
                        currentReviewer.reviews.push(
                            body +
                                (original_line
                                    ? ` - at line ${original_line}`
                                    : "")
                        );
                } else {
                    reviewers.push({
                        id,
                        login,
                        img,
                        reviews: body ? [body] : [],
                    });
                }
            }
        }
    );
    return reviewers;
};
