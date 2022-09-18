import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children, path }) {
    const isLoggedIn = useAuth();

    return isLoggedIn 
        ? children 
        : <Navigate to={`/${path || ""}`}
    />;
}
