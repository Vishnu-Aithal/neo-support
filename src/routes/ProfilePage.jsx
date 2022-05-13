import { Container } from "components/Layout/Container";
import { NavLink, Outlet } from "react-router-dom";

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
    return (
        <Container>
            <div className="flex w-full gap-2 flex-wrap">
                <TopNavLink to="/profile/my-pr-links" name="My Pull Requests" />
                <TopNavLink to="/profile/my-comments" name="My Comments" />
                <TopNavLink to="/profile/my-questions" name="My Questions" />
                <TopNavLink to="/profile/my-answers" name="My Answers" />
            </div>
            <Outlet />
        </Container>
    );
};
