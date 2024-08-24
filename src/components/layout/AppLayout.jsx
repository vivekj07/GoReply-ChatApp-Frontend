import { Drawer, Grid, Skeleton } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { LayoutBackground } from '../../constants/colors'
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../../constants/events'
import { getOrSavefromLocalStorage } from '../../features/features'
import { useErrors, useSocketEvents } from '../../hooks/hooks'
import { useMyChatsQuery } from '../../redux/api/api'
import { incrementNotifications, newMessagesAlertCounter, resetNewMessagesAlertCounter } from '../../redux/reducers/chat'
import { setDeleteChatMenuDetails, setIsDeleteChatMenu, setIsmobile } from '../../redux/reducers/misc'
import { getSocket } from '../../socket'
import Title from '../shared/Title'
import ChatList from '../specific/ChatList'
import Profile from '../specific/Profile'
import Header from './Header'
import DeleteChatMenu from '../dialogs/DeleteChatMenu'

const AppLayout = () => (WrappedComponent) => {
    return (props) => {

        const socket = getSocket()

        const params = useParams()
        const chatId = params.chatId
        const navigate = useNavigate()

        const [onlineUsers, setOnlineUsers] = useState([])

        const { isMobile } = useSelector((state) => state.misc)
        const { user } = useSelector((state) => state.auth)
        const { newMessagesAlert } = useSelector((state) => state.chat)
        const dispatch = useDispatch()

        const DeleteMenuAnchor = useRef(null)

        // useEffect(() => {
        //     console.log(socket.id)

        // }, [])

        const { data, isError, isLoading, error, refetch } = useMyChatsQuery()

        useErrors([{ isError, error }])

        useEffect(() => {
            getOrSavefromLocalStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert })
        }, [newMessagesAlert])

        useEffect(() => {
            dispatch(resetNewMessagesAlertCounter({ chatId }))
        }, [chatId])

        const newRequestListener = () => {
            dispatch(incrementNotifications())
        }

        const newMessageAlerttListener = ({ chatId }) => {
            if (params.chatId == chatId) return;
            dispatch(newMessagesAlertCounter({ chatId, count: 1 }))
        }

        const onlineUsersListener = useCallback((data) => {
            setOnlineUsers(data);
        }, []);

        const refetchListener = () => {
            // console.log("refetched")
            refetch();
            // navigate("/")
        }

        const eventListeners = {
            [NEW_REQUEST]: newRequestListener,
            [NEW_MESSAGE_ALERT]: newMessageAlerttListener,
            [REFETCH_CHATS]: refetchListener,
            [ONLINE_USERS]: onlineUsersListener,
        }

        useSocketEvents(socket, eventListeners)

        const handleDeleteChat = (e, chatId, groupChat) => {
            // e.preventDefault();
            dispatch(setDeleteChatMenuDetails({ chatId, groupChat }))
            dispatch(setIsDeleteChatMenu(true))
            DeleteMenuAnchor.current = e.currentTarget;
        };

        const closeHandler = () => {
            dispatch(setIsmobile(false))
        }


        return (
            <>
                <Title />
                <Header />
                <DeleteChatMenu DeleteMenuAnchor={DeleteMenuAnchor} />
                <Grid container sx={{
                    height: "calc(100vh - 4rem)",
                }}>

                    <Grid height={"100%"} item sm={4} md={3}
                        sx={{
                            display: { xs: "none", sm: "block" },

                            // backgroundColor: "lightblue"

                        }}>
                        {isLoading ? <Skeleton height={"100%"} /> :
                            <ChatList
                                chats={data?.transformedChats}
                                chatId={chatId}
                                handleDeleteChat={handleDeleteChat}
                                newMessagesAlert={newMessagesAlert}
                                onlineUsers={onlineUsers}
                            />}

                    </Grid>

                    <Grid height={"100%"} item xs={12} sm={8} md={6}
                        sx={{
                            backgroundColor: LayoutBackground

                        }}
                    ><WrappedComponent {...props} chatId={chatId} user={user}
                        />
                    </Grid>

                    <Grid item md={3}
                        height={"100%"}
                        sx={{
                            display: { xs: "none", md: "block" },
                            padding: "2rem",
                            bgcolor: "rgba(0,0,0,0.85)",
                        }}>
                        <Profile user={user} />

                    </Grid>
                </Grid>

                <Drawer open={isMobile} onClose={closeHandler}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: '70vw',
                            border: "1px solid black",
                            borderRadius: "0 15px 15px 0"
                        },
                    }}
                >
                    {isLoading ? <Skeleton height={"100vh"} /> :
                        <ChatList
                            chats={data?.transformedChats}
                            chatId={chatId}
                            handleDeleteChat={handleDeleteChat}
                            newMessagesAlert={newMessagesAlert}
                            onlineUsers={onlineUsers}
                        />
                    }

                </Drawer>


            </>
        )
    }
}

export default AppLayout