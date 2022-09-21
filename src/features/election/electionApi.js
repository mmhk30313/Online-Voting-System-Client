import { apiSlice } from "../api/apiSlice";

export const electionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Add an endpoint called `getElections` here:

        // Vote for election and update election group by votes
        voteForElection: builder.mutation({
            query: (body) => ({
                url: "/elections/vote",
                method: "POST",
                body,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "users", id: arg.group_id },
                { type: "user", id: arg.group_id },
                { type: "elections", id: arg.election_id },
                { type: "activeElections", id: arg.election_id },
                { type: "activeElectionGroups", id: arg.group_id },
                { type: "electionGroups", id: arg.group_id },
            ],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    const { data, status, message } = result?.data;
                    // console.log({ data, status, message });
                    if (status) {
                        console.log("====user_data====",{ data });
                        apiSlice.util.updateQueryData(
                            "getUser",
                            data?.email,
                            (draft) => {
                                draft.data = data;
                                return draft;
                            }
                        )

                    } 
                } catch (err) {
                    // do nothing
                    console.log({ err });
                }
            },
        }),

        // Group of Election
        createElectionGroup: builder.mutation({
            query: (body) => ({
                url: `/election/create/group`,
                method: "POST",
                body,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "users", id: arg.group_id },
                { type: "user", id: arg.group_id },
                { type: "elections", id: arg.election_id },
                { type: "activeElections", id: arg.election_id },
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
                { type: "users", id: arg.group_id },
                { type: "user", id: arg.group_id },
                { type: "elections", id: arg.election_id },
                { type: "activeElections", id: arg.election_id },
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
                { type: "users", id: arg.group_id },
                { type: "user", id: arg.group_id },
                { type: "elections", id: arg.election_id },
                { type: "activeElections", id: arg.election_id },
                { type: "activeElectionGroups", id: arg.group_id },
                { type: "electionGroups", id: arg.group_id },
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
                { type: "users", id: arg.group_id },
                { type: "user", id: arg.group_id },
                { type: "elections", id: arg.election_id },
                { type: "activeElections", id: arg.election_id },
                { type: "activeElectionGroups", id: arg.group_id },
                { type: "electionGroups", id: arg.group_id },
            ],
        }),

        updateElection: builder.mutation({
            query: (body) => ({
                url: `/elections/update/${body.election_id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "users", id: arg.group_id },
                { type: "user", id: arg.group_id },
                { type: "elections", id: arg.election_id },
                { type: "activeElections", id: arg.election_id },
                { type: "activeElectionGroups", id: arg.group_id },
                { type: "electionGroups", id: arg.group_id },
            ],
        }),

        deleteElection: builder.mutation({
            query: (id) => ({
                url: `/elections/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "users", id: arg.group_id },
                { type: "user", id: arg.group_id },
                { type: "elections", id: arg.election_id },
                { type: "activeElections", id: arg.election_id },
                { type: "activeElectionGroups", id: arg.group_id },
                { type: "electionGroups", id: arg.group_id },
            ],
        }),

        bulkUpdateElections: builder.mutation({
            query: (body) => ({
                url: `/elections/bulk-update`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "users", id: arg.group_id },
                { type: "user", id: arg.group_id },
                { type: "elections", id: arg.election_id },
                { type: "activeElections", id: arg.election_id },
                { type: "activeElectionGroups", id: arg.group_id },
                { type: "electionGroups", id: arg.group_id },
            ],
        }),
    }),
});

export const {
    // Vote for election and update election group by votes
    useVoteForElectionMutation,
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
