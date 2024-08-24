import React, { memo } from 'react'
import { LinkComponent } from '../styles/StyledComponents'
import { Avatar, Stack, Typography, Box } from '@mui/material'
import AvatarCard from './AvatarCard'
import { motion } from "framer-motion"

const ChatItem = (
    {
        avatar = [],
        name,
        _id,
        groupChat = false,
        sameSender,
        isOnline = false,
        newMessageAlert,
        handleDeleteChat,
        index = 1
    }
) => {
    return (
        <LinkComponent
            to={`/chat/${_id}`}
            onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}

        >
            <Stack
                sx={{
                    '&:hover': {
                        backgroundColor: sameSender ? "unset" : 'rgba(230, 228, 227)',
                    },
                }}
            >
                <motion.div
                    initial={{
                        opacity: 0,
                        y: "-100%"
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 1
                    }}
                    transition={{
                        delay: index * 0.05,
                    }}
                    style={{
                        height: "6rem",
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                        backgroundColor: sameSender ? "black" : "unset",
                        color: sameSender ? "white" : "unset",
                        position: "relative",
                        padding: "0.5rem",
                        borderRadius: "0 15px 15px 0",
                        position: "relative",
                    }}

                >
                    <AvatarCard avatar={avatar} />
                    <Stack>
                        <Typography
                        // sx={{
                        //     whiteSpace: 'nowrap',
                        //     overflow: 'hidden',
                        //     textOverflow: 'ellipsis',
                        //     maxWidth: '150px', // Adjust the max width as needed
                        // }}
                        >{name.length > 25 ? `${name.slice(0, 25)}...` : name}</Typography>
                        {
                            newMessageAlert && newMessageAlert.count > 0 && (<Typography variant='caption'>
                                {newMessageAlert.count} New Messages
                            </Typography>)
                        }
                    </Stack>

                    {
                        isOnline && (
                            <Box
                                sx={{
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                    backgroundColor: "green",
                                    position: "absolute",
                                    top: "50%",
                                    right: "1rem",
                                    transform: "translateY(-50%)",
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px"
                                }}
                            >

                            </Box>
                        )
                    }
                </motion.div>
            </Stack>
        </LinkComponent>
    )
}

export default memo(ChatItem)