import { Container } from "components/Layout/Container";
import { NavLink, Outlet } from "react-router-dom";

const TopNavLink: React.FC<{ [p: string]: string }> = ({ to, name }) => (
    <NavLink
        className={({ isActive }) =>
            `p-2 rounded-md border dark:border-zinc-600 hover:bg-gray-300 dark:hover:bg-zinc-600 ${
                isActive ? "bg-gray-300 dark:bg-zinc-600" : ""
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
                <TopNavLink
                    to="/profile/bookmarked-questions"
                    name="Bookmarked Questions"
                />
                <TopNavLink
                    to="/profile/bookmarked-answers"
                    name="Bookmarked Answers"
                />
                <TopNavLink to="/profile/my-details" name="My Details" />
            </div>
            <Outlet />
        </Container>
    );
};
