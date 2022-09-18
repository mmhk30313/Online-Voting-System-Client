import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const authUser = JSON.parse(localStorage?.getItem("auth"));
        const accessToken = JSON.parse(localStorage?.getItem("accessToken"));
        console.log({authUser});
        if (authUser && accessToken) {
            // const auth = JSON.parse(localAuth);
            dispatch(
                userLoggedIn({
                    accessToken: accessToken,
                    user: authUser,
                })
            );
        }
        setAuthChecked(true);
    }, [dispatch, setAuthChecked]);

    return authChecked;
}
