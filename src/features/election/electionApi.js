import { apiSlice } from "../api/apiSlice";

export const electionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Add an endpoint called `getElections` here:

        createElectionGroup: builder.mutation({
            query: (body) => ({
                url: `/election/create/group`,
                method: "POST",
                body,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "activeElectionGroups", id: arg.group_id },
                { type: "electionGroups", id: arg.group_id },
            ],
        }),

        updateElectionGroup: builder.mutation({
            query: (body) => {
                console.log({body});
                const { group_id } = body;
                delete body.group_id;
                return {
                    url: `/election-groups/${group_id}`,
                    method: "PATCH",
                    body,
                }
            },
            invalidatesTags: (result, error, arg) => [
                { type: "activeElectionGroups", id: arg.group_id },
                { type: "electionGroups", id: arg.group_id },
            ],
        }),

        deleteElectionGroup: builder.mutation({
            query: (id) => ({
                url: `/election-groups/${id}`,
                method: "DELETE",
            }),
        }),

        bulkUpdateElectionGroups: builder.mutation({
            query: (body) => ({
                url: `/election-groups/bulk-update`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "electionGroups", id: arg.group_id || arg.id },
                { type: "activeElectionGroups", id: arg.group_id || arg.id },
            ],
        }),

        // Elections Endpoints
        createElection: builder.mutation({
            query: (body) => ({
                url: `/elections/create`,
                method: "POST",
                body,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "elections", id: arg.group_id },
                { type: "activeElections", id: arg.group_id },
            ],
        }),

        updateElection: builder.mutation({
            query: (body) => ({
                url: `/elections/update/${body.election_id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "elections", id: arg.group_id },
                { type: "activeElections", id: arg.group_id },
            ],
        }),

        deleteElection: builder.mutation({
            query: (id) => ({
                url: `/elections/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "elections", id: arg.group_id },
                { type: "activeElections", id: arg.group_id },
            ],
        }),

        bulkUpdateElections: builder.mutation({
            query: (body) => ({
                url: `/elections/bulk-update`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "elections", id: arg.group_id || arg.id },
                { type: "activeElections", id: arg.group_id || arg.id },
            ],
        }),
    }),
});

export const {
    // Groups of election
    useCreateElectionGroupMutation,
    useUpdateElectionGroupMutation,
    useDeleteElectionGroupMutation,
    // Election
    useCreateElectionMutation,
    useUpdateElectionMutation,
    useDeleteElectionMutation,
    useBulkUpdateElectionsMutation,
    // Bulk update
    useBulkUpdateElectionGroupsMutation,
} = electionApi;
