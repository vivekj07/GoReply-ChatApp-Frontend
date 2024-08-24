import React from 'react'
import ChatItem from '../shared/ChatItem'
import { Stack } from '@mui/material'
import { StyledStack } from '../styles/StyledComponents'

const ChatList = (
    {
        chats = [],
        onlineUsers = [],
        chatId,
        newMessagesAlert = [],
        handleDeleteChat,
        w = "100%"
    }) => {
    return (
        <Stack width={w}
            sx={{
                height: '100%',
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                    display: "none",
                },
                borderRight: "1px solid rgba(94, 94, 92,.2)"

            }}
        >
            {chats?.map((data, index) => {
                const { avatar, _id, name, groupChat, members } = data;

                const newMessageAlert = newMessagesAlert.find(
                    ({ chatId }) => chatId === _id
                );

                const isOnline = members?.some((member) =>
                    onlineUsers.includes(member)
                );

                return (
                    <ChatItem
                        index={index}
                        newMessageAlert={newMessageAlert}
                        isOnline={isOnline}
                        avatar={avatar}
                        name={name}
                        _id={_id}
                        key={_id}
                        groupChat={groupChat}
                        sameSender={chatId === _id}
                        handleDeleteChat={handleDeleteChat}
                    />
                );
            })}
        </Stack>
    )
}

export default ChatList