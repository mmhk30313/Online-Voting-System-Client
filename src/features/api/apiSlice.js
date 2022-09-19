import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { live_server } from "../../utils/server.config";

export const apiSlice = createApi({
    // reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: live_server || "http://localhost:8000/api",
        prepareHeaders: (headers, { getState }) => {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                headers.set("authorization", `Bearer ${JSON.parse(accessToken)}`);
            }
            return headers;
        },
        // credentials: "include",
    }),
    tagTypes: ["users", "admins", "user", "AddedUser", "UpdatedUser", "DeletedUser"],
    endpoints: (builder) => ({

        getUsers: builder.query({
            query: () => "/users",
            // keepUnusedDataFor: 600,
            providesTags: ["users"],
        }),

        getAdmins: builder.query({
            query: () => "/admins",
            // keepUnusedDataFor: 600,
            providesTags: ["admins"],
        }),

        getUser: builder.query({
            query: (userEmail) => `/users/${userEmail}`,
            providesTags: (result, error, arg) => [{ type: "user", id: arg }],
        }),
        // getTodosByCompletedStatus: builder.query({
        //     query: (completed) => `/todos?completed=${completed}`,
        //     providesTags: (result, error, arg) => [
        //         { type: "CompletedTodos", id: arg.id },
        //     ],
        // }),
        // getCompletedTodos: builder.query({
        //     query: ({ completed }) => {
        //         const queryString = `/todos?completed_like=${completed}`;
        //         return queryString;
        //     },
        //     providesTags: (result, error, arg) => [
        //         { type: "CompletedTodos", id: arg.id },
        //     ],
        // }),

        getElections: builder.query({
            query: () => "/user/election",
            providesTags: ['elections']

        }),

        createElection: builder.mutation({
            query: (newElection) => ({
                url: "/user/election",
                method: "POST",
                body: newElection,
            }),
            invalidatesTags: ["admins", "users", "elections"],
        }),
        
        updateElection: builder.mutation({
            query: (election) => ({
                url: "/user/election",
                method: "PUT",
                body: election,
            }),
            invalidatesTags: ["admins", "users", "elections"],
        }),
        
        addUser: builder.mutation({
            query: ({data}) => ({
                url: "/users",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["users"],
        }),
        editUser: builder.mutation({
            query: ({ email, data }) => ({
                url: `/users/${email}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                "users",
                "admins",
                { type: "user", id: arg.email },
                { type: "admins", id: arg.email },
            ],
        }),
        deleteUser: builder.mutation({
            query: (email) => ({
                url: `/users/${email}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                "users", 
                "admins",
                { type: "admins", id: arg.email }
            ],
        }),
        bulkUpdateStatus: builder.mutation({
            query: ({ emails, status }) => ({
                url: `/users/bulk-update-status`,
                method: "PATCH",
                body: { emails, status },
            }),
            invalidatesTags: (result, error, arg) => [
                "users",
                "admins",
                ...arg.emails?.map((email) => ({ type: "user", email })),
                ...arg.emails?.map((email) => ({ type: "admins", email })),
            ],
        }),
        bulkDeleteUsers: builder.mutation({
            query: (emails) => ({
                url: `/users/bulk-delete`,
                method: "DELETE",
                body: { emails },
            }),
            invalidatesTags: (result, error, arg) => [
                "users",
                "admins",
                ...arg.emails?.map((email) => ({ type: "user", email })),
                ...arg.emails?.map((email) => ({ type: "admins", email })),
            ],
        }),

    }),
});

export const {
    useBulkDeleteUsersMutation,
    useBulkUpdateStatusMutation,
    // query hooks
    useGetElectionsQuery,
    useGetAdminsQuery,
    useGetUserQuery,
    useGetUsersQuery,
    // login-sign-up hooks
    // useCreateAdminMutation,
    useCreateElectionMutation,
    useUpdateElectionMutation,
    useAddUserMutation,
    useEditUserMutation,
    useDeleteUserMutation

} = apiSlice;
