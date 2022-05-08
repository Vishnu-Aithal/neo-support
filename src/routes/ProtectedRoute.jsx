import { Outlet, Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ currentUser }) => {
    const location = useLocation();
    return currentUser ? (
        <Outlet />
    ) : (
        <Navigate to="/home" state={{ from: location.pathname }} replace />
    );
};

export const ProtectedAuth = ({ currentUser }) => {
    return !currentUser ? <Outlet /> : <Navigate to="/profile" replace />;
};
