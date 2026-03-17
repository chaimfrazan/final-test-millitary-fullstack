import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUserContext from '../provider/UserProvider';

export default function ProtectedRoute({ usersType }) {
    const { user, loading } = useUserContext();
    const location = useLocation();
    if (loading) {
        return <div>loading...</div>;
    }
    console.log(user)
    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (usersType && !usersType.includes(user.user_type)) {
        return <Navigate to={'/home/launcher'} replace />;
    }
    return <Outlet />;
}
