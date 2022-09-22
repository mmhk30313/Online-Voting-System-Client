import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, authError } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // user endpoints
        register: builder.mutation({
            query: (data) => ({
                url: "/user/signup",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    const { data, status, message } = result?.data;
                    console.log({ data, status, message });
                    if(status){
                        const { user, accessToken } = data;
                        if (user && accessToken) {
                            localStorage.setItem(
                                "auth",
                                JSON.stringify(user)
                            );
                            localStorage.setItem(
                                "accessToken",
                                JSON.stringify(accessToken)
                            );
        
                            dispatch(
                                userLoggedIn({
                                    accessToken,
                                    user,
                                })
                            );
                        }
                    }
                    else{
                        dispatch(
                            authError( {
                                error: message,
                            })
                        )
                    }

                } catch (err) {
                    // do nothing
                    console.log({ err });
                    const {message} = err?.error?.data;
                    dispatch(
                        authError( {
                            error: message,
                        })
                    )
                }
            },
        }),
        
        userRegister: builder.mutation({
            query: (data) => ({
                url: "/user/signup",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    const { data, status, message } = result?.data;
                    console.log({ data, status, message });
                    if(status){
                        console.log({arg_data: arg});
                        // get all users
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getUsers",
                                arg?.email,
                                (draft) => {
                                    draft.data.push(data?.user);
                                    return draft;
                                }
                            )
                        );
                        
                    }

                } catch (err) {
                    // do nothing
                    console.log({ err });
                    // const {message} = err?.error?.data;
                    // dispatch(
                    //     authError( {
                    //         error: message,
                    //     })
                    // )
                }
            },
        }),

        login: builder.mutation({
            query: (data) => ({
                url: "/user/login",
                method: "POST",
                body: data,
            }),
            // transformResponse: (response) => {
            //     console.log({ response });
            //     const { data, status, message } = response;
            //     if(status){
            //         const { user, accessToken } = data;
            //         if (user && accessToken) {
            //             localStorage.setItem(
            //                 "auth",
            //                 JSON.stringify(user)
            //             );
            //             localStorage.setItem(
            //                 "accessToken",
            //                 JSON.stringify(accessToken)
            //             );
    
            //             return {
            //                 data: user,
            //                 accessToken,
            //             };
            //         }
            //     }
            //     return response;
            // },

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                
                try {
                    const result = await queryFulfilled;
                    console.log({ result });
                    const { data, status, message } = result?.data;
                    console.log({ data, status, message });
                    if(status){
                        const { user, accessToken } = data;
                        console.log({user, accessToken});
                        if (user && accessToken) {
                            localStorage.setItem(
                                "auth",
                                JSON.stringify(user)
                            );
                            localStorage.setItem(
                                "accessToken",
                                JSON.stringify(accessToken)
                            );
        
                            dispatch(
                                userLoggedIn({
                                    accessToken,
                                    user,
                                })
                            );
                        }
                    }

                } catch (err) {
                    // do nothing
                    console.log({ err });
                    const {message} = err?.error?.data;
                    console.log({message});
                    dispatch(
                        authError( {
                            error: message,
                        })
                    );
                    dispatch(
                        userLoggedOut()
                    );
                    dispatch(apiSlice.util.resetApiState());
                }
            },
        }),

        logout: builder.mutation({
            query: (data = "") => ({
                url: "/user/logout",
                method: "POST",
                body: { refreshToken: data },
            }),
                
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    localStorage.removeItem("auth");
                    localStorage.removeItem("accessToken");
                    dispatch(
                        userLoggedOut()
                    );
                    // cache clear in rtk query
                    dispatch(apiSlice.util.resetApiState());
                    
                } catch (err) {
                    // do nothing
                    // This for local and server token issue for logout
                    localStorage.removeItem("auth");
                    dispatch(userLoggedOut({ accessToken: "", user: {} }));
                    localStorage.removeItem("accessToken");
                    dispatch(
                        userLoggedOut()
                    );
                    // cache clear in rtk query
                    dispatch(apiSlice.util.resetApiState());
                }
            },
        }),

    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useUserRegisterMutation } = authApi;
