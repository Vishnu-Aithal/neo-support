import { Container } from "components/Container";
import { MyPullRequests } from "components/MyPullRequests";
import { NavLink, useParams } from "react-router-dom";

const TopNavLink = ({ to, name }) => (
    <NavLink
        className={({ isActive }) =>
            `p-2 rounded-md border ${isActive ? "bg-gray-300" : ""}`
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
                <TopNavLink
                    to="/profile/commented-prs"
                    name="Commented Pull Requests"
                />
                <TopNavLink
                    to="/profile/commented-posts"
                    name="Commented Posts"
                />
                <TopNavLink
                    to="/profile/answered-posts"
                    name="Answered Posts"
                />
            </div>
            {page === "my-pr-links" && <MyPullRequests />}
        </Container>
    );
};
