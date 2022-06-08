import { Outlet, Navigate, useLocation } from "react-router-dom";
import { UserState } from "store/currentUser-slice";
interface Props {
    currentUser: UserState;
}
export const ProtectedRoute: React.FC<Props> = ({ currentUser }) => {
    const location = useLocation();
    return currentUser ? (
        <Outlet />
    ) : (
        <Navigate to="/home" state={{ from: location.pathname }} replace />
    );
};

export const ProtectedAuth: React.FC<Props> = ({ currentUser }) => {
    return !currentUser ? <Outlet /> : <Navigate to="/profile" replace />;
};
