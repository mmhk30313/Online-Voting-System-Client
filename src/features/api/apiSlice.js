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
    tagTypes: [
        "users", "admins", "user", 
        "elections", "activeElections", "election",
        "electionGroups", "activeElectionGroups", "electionGroup",
        "AddedUser", "UpdatedUser", "DeletedUser"
    ],
    endpoints: (builder) => ({
        // User endpoints
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
                { type: "users", id: arg.email },
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

        // Election endpoints
        getElections: builder.query({
            query: () => "/elections",
            providesTags: ['elections']

        }),

        getActiveElections: builder.query({
            query: () => "/elections/active",
            providesTags: ['activeElections']
        }),

        // Group of elections endpoints
        getElectionGroups: builder.query({
            query: () => `/election/groups`,
            providesTags: ['electionGroups'],
            transformResponse(apiResponse, meta) {
                const totalCount = meta.response.headers.get("X-Total-Count");
                return {
                    data: apiResponse?.data,
                    status: apiResponse?.status,
                    message: apiResponse?.message,
                    totalCount: apiResponse?.data?.length || 0,
                };
            },
        }),

        getActiveElectionGroup: builder.query({
            query: () => `/election-groups/active`,
            providesTags: ['activeElectionGroups'],
            transformResponse(apiResponse, meta) {
                const totalCount = meta.response.headers.get("X-Total-Count");
                return {
                    data: apiResponse?.data,
                    status: apiResponse?.status,
                    message: apiResponse?.message,
                    totalCount: totalCount || apiResponse?.data?.length || 0,
                };
            },

        }),

        
        // Bulk mutation
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
    // elections
    useGetElectionsQuery,
    useGetActiveElectionsQuery,
    // admins
    useGetAdminsQuery,
    // users
    useGetUserQuery,
    useGetUsersQuery,
    // groups
    useGetElectionGroupsQuery,
    useGetActiveElectionGroupQuery,
    // login-sign-up hooks
    useAddUserMutation,
    useEditUserMutation,
    useDeleteUserMutation

} = apiSlice;
