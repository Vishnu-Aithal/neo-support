import { Container } from "components/Container";
import { MyPullRequests } from "components/MyPullRequests";
import { MyComments } from "components/MyComments";
import { NavLink, useParams } from "react-router-dom";
import { MyQuestions } from "components/MyQuestions";
import { MyAnswers } from "components/MyAnswers";

const TopNavLink = ({ to, name }) => (
    <NavLink
        className={({ isActive }) =>
            `p-2 rounded-md border hover:bg-gray-300 ${
                isActive ? "bg-gray-300" : ""
            }`
        }
        to={to}>
        {name}
    </NavLink>
);

export const ProfilePage = () => {
    const { page } = useParams();
    return (
        <Container>
            <div className="flex w-full gap-2 flex-wrap">
                <TopNavLink to="/profile/my-pr-links" name="My Pull Requests" />
                <TopNavLink to="/profile/my-comments" name="My Comments" />
                <TopNavLink to="/profile/my-questions" name="My Questions" />
                <TopNavLink to="/profile/my-answers" name="My Answers" />
            </div>
            {page === "my-pr-links" && <MyPullRequests />}
            {page === "my-comments" && <MyComments />}
            {page === "my-questions" && <MyQuestions />}
            {page === "my-answers" && <MyAnswers />}
        </Container>
    );
};
