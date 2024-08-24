import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/`,
    }),
    tagTypes: ["Chat"],
    endpoints: (builder) => ({
        myChats: builder.query({
            query: () => ({
                url: `chat/myChats`,
                credentials: "include",
            }),
            providesTags: ["Chat"]
        }),
        myGroups: builder.query({
            query: () => ({
                url: `chat/mygroups`,
                credentials: "include",
            }),
            providesTags: ["Chat"]
        }),
        searchUser: builder.query({
            query: (name) => ({
                url: `user/search?name=${name}`,
                credentials: "include"
            })
        }),
        getNotifications: builder.query({
            query: () => ({
                url: `user/notifications`,
                credentials: "include"
            }),
            keepUnusedDataFor: 0
        }),
        getChatDetails: builder.query({
            query: ({ id, populate }) => {
                let newUrl = `chat/${id}`
                if (populate) newUrl += `?populate=${populate}`
                return {
                    url: newUrl,
                    credentials: "include"
                }
            },
            providesTags: ["Chat"]
        }),
        getMessages: builder.query({
            query: ({ id, page = 1 }) => ({
                url: `chat/message/${id}?page=${page}`,
                credentials: "include"
            }),
            keepUnusedDataFor: 0
        }),
        getMyfriends: builder.query({
            query: ({ chatId }) => {
                let newUrl = `user/friends`;
                if (chatId) newUrl += `?chatId=${chatId}`
                return ({
                    url: newUrl,
                    credentials: "include"
                })
            },
            providesTags: ["Chat"]
        }),


        sendFriendRequest: builder.mutation({
            query: (id) => ({
                url: `user/sendrequest`,
                credentials: "include",
                method: "PUT",
                body: id
            })
        }),
        createGroupChat: builder.mutation({
            query: ({ name, members }) => ({
                url: `chat/new`,
                credentials: "include",
                method: "POST",
                body: { name, members }
            }),
            invalidatesTags: ["Chat"]
        }),
        addMembers: builder.mutation({
            query: ({ members, groupId }) => ({
                url: `chat/addmembers`,
                credentials: "include",
                method: "PUT",
                body: { members, groupId }
            }),
            invalidatesTags: ["Chat"]
        }),
        removeMember: builder.mutation({
            query: ({ member, groupId }) => ({
                url: `chat/removemember`,
                credentials: "include",
                method: "PUT",
                body: { member, groupId }
            }),
            invalidatesTags: ["Chat"]
        }),
        renameGroup: builder.mutation({
            query: ({ newName, id }) => ({
                url: `chat/${id}`,
                credentials: "include",
                method: "PUT",
                body: { newName }
            }),
            invalidatesTags: ["Chat"]
        }),
        deleteChat: builder.mutation({
            query: ({ id }) => ({
                url: `chat/${id}`,
                credentials: "include",
                method: "DELETE",
            }),
            invalidatesTags: ["Chat"]
        }),
        leaveGroup: builder.mutation({
            query: ({ id }) => ({
                url: `chat/leave/${id}`,
                credentials: "include",
                method: "DELETE",
            }),
            invalidatesTags: ["Chat"]
        }),
        handleRequest: builder.mutation({
            query: (body) => ({
                url: `user/handlerequest`,
                credentials: "include",
                method: "PUT",
                body: body
            }),
            invalidatesTags: ["Chat"]
        }),
        sendAttachments: builder.mutation({
            query: (data) => ({
                url: `chat/message`,
                credentials: "include",
                method: "POST",
                body: data
            }),
        }),

        // Admin apis

        getIsAdmin: builder.query({
            query: () => ({
                url: `admin/isAdmin`,
                credentials: "include"
            }),
            keepUnusedDataFor: 0
        }),
        dashboardStats: builder.query({
            query: () => ({
                url: `admin/dashboard`,
                credentials: "include"
            }),
            keepUnusedDataFor: 0
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: `admin/users`,
                credentials: "include"
            }),
            keepUnusedDataFor: 0
        }),
        getAllMessages: builder.query({
            query: () => ({
                url: `admin/messages`,
                credentials: "include"
            }),
            keepUnusedDataFor: 0
        }),
        getAllChats: builder.query({
            query: () => ({
                url: `admin/chats`,
                credentials: "include"
            }),
            keepUnusedDataFor: 0
        }),

        adminLogin: builder.mutation({
            query: ({ secretKey }) => ({
                url: `admin/login`,
                credentials: "include",
                method: "POST",
                body: { secretKey }
            }),
        }),
        adminLogout: builder.mutation({
            query: () => ({
                url: `admin/logout`,
                credentials: "include",
                method: "POST",
            }),
        }),
    })
})
export default api
export const {
    useMyChatsQuery,
    useLazySearchUserQuery,
    useGetNotificationsQuery,
    useGetChatDetailsQuery,
    useGetMessagesQuery,
    useMyGroupsQuery,
    useGetMyfriendsQuery,
    useSendFriendRequestMutation,
    useHandleRequestMutation,
    useSendAttachmentsMutation,
    useCreateGroupChatMutation,
    useRenameGroupMutation,
    useAddMembersMutation,
    useRemoveMemberMutation,
    useDeleteChatMutation,
    useLeaveGroupMutation,

    useGetIsAdminQuery,
    useDashboardStatsQuery,
    useGetAllChatsQuery,
    useGetAllMessagesQuery,
    useGetAllUsersQuery,
    useAdminLoginMutation,
    useAdminLogoutMutation,
} = api