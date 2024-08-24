import { useInfiniteScrollTop } from "6pp"
import { AttachFile, Send } from '@mui/icons-material'
import { Box, Container, IconButton, Skeleton, Stack, Typography } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import FileMenu from "../components/dialogs/FileMenu"
import AppLayout from '../components/layout/AppLayout'
import Message from '../components/shared/Message'
import { ALERT, CHAT_JOINED, CHAT_LEFT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/events'
import { useErrors, useSocketEvents } from '../hooks/hooks'
import { useGetChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api'
import { setIsFileMenu } from "../redux/reducers/misc"
import { getSocket } from '../socket'

const Chats = ({ chatId, user }) => {
    const socket = getSocket()

    const dispatch = useDispatch()

    const conatainerRef = useRef(null)
    const bottomRef = useRef(null)


    const navigate = useNavigate()

    const [message, setMesssage] = useState("")
    const [messages, setMesssages] = useState([])
    const [page, setPage] = useState(1)
    const [anchorEl, setAnchorEl] = useState(null)
    const [isTyping, setIsTyping] = useState(false)
    const [userTyping, setUsertyping] = useState(false)
    const [typerName, setTyperName] = useState("")
    const timeoutId = useRef(null)


    // useEffect(() => {
    //     console.log(socket.id)

    // }, [])

    const { data: MessageData, isLoading: isLoadingMessage, isError: isErrorMessage, error: errorMessage }
        = useGetMessagesQuery({ id: chatId, page })

    const { data, isLoading, isError, error } = useGetChatDetailsQuery({ id: chatId })

    const errors = [
        { isError, error },
        { isError: isErrorMessage, error: errorMessage }
    ]

    useErrors(errors)

    const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
        conatainerRef,
        MessageData?.totalPages,
        page,
        setPage,
        MessageData?.messages
    )

    const handleFileOpen = (e) => {
        dispatch(setIsFileMenu(true))
        setAnchorEl(e.currentTarget)
    }

    let allMessages = [...oldMessages, ...messages]

    // useEffect(() => {
    //     console.log("allMessages", allMessages)
    //     console.log("messages", messages)
    //     console.log("oldMessages", oldMessages)


    // }, [allMessages, messages, oldMessages])

    useEffect(() => {
        socket.emit(CHAT_JOINED, { userId: user._id, members })
        return () => {
            setOldMessages([]);
            setMesssages([]);
            setPage(1);
            allMessages = []
            socket.emit(CHAT_LEFT, { userId: user._id, members })
        }
    }, [chatId])



    useEffect(() => {
        if (isError || isErrorMessage) navigate("/")

    }, [isError, isErrorMessage])

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" })
        }

    }, [messages, message])



    const members = data?.chat?.members

    const submitHandler = (e) => {
        e.preventDefault()
        if (!message.trim()) return
        socket.emit(NEW_MESSAGE, { chatId, members, message })
        setMesssage("")
        socket.emit(STOP_TYPING, { chatId, members, name: user.name })
        setIsTyping(false)
        // console.log(messages)

    }

    const messageOnChange = (e) => {
        setMesssage(e.target.value)

        if (!isTyping) {
            socket.emit(START_TYPING, { chatId, members, name: user.name })
            setIsTyping(true)
        }
        if (timeoutId.current) clearTimeout(timeoutId.current)
        timeoutId.current = setTimeout(() => {
            socket.emit(STOP_TYPING, { chatId, members, name: user.name })
            setIsTyping(false)

        }, [2000])
    }

    const newMessageListener = useCallback(
        (data) => {
            if (data.chatId != chatId) return;
            setMesssages((pre) => ([...pre, data.message]))
        },
        [chatId])

    const startTypingListener = useCallback(
        (data) => {
            if (data.chatId != chatId) return;
            setTyperName(data.name)

            setUsertyping(true)
        },
        [chatId])

    const stopTypingListener = useCallback(
        (data) => {
            if (data.chatId != chatId) return;
            setTyperName("")
            setUsertyping(false)
        },
        [chatId])



    const alertListener = useCallback(
        (data) => {
            if (data.chatId != chatId) return;
            const messagesForAlert = {
                content: data.message,
                sender: "dsfsdfsdfds",
                chat: data.chatId,
                createdAt: new Date(),
                _id: "sddsdsdccdcd"
            }
            setMesssages((pre) => ([...pre, messagesForAlert]))
        },
        [chatId])

    const eventListeners = {
        [NEW_MESSAGE]: newMessageListener,
        [START_TYPING]: startTypingListener,
        [STOP_TYPING]: stopTypingListener,
        [ALERT]: alertListener,
    }

    useSocketEvents(socket, eventListeners)



    return isLoading ? <Skeleton height={"100vh"} /> : (
        <Box>
            <Stack spacing={"1rem"} padding={"1rem"} ref={conatainerRef}
                sx={{
                    bgcolor: "rgba(163, 162, 162,0.2)",
                    height: "calc(100vh - 8rem)",
                    overflowX: "hidden",
                    overflowY: "auto",
                }}
            >
                {
                    isLoadingMessage ? <Skeleton height={"100vh"} /> :
                        allMessages.map((i) => (
                            <Message key={i._id} message={i} user={user} />

                        ))
                }

                {
                    userTyping ?
                        <Typography
                            sx={{
                                fontStyle: 'italic',
                                color: 'rgb(105, 245, 42)',
                                backgroundColor: 'white',
                                padding: '0.2rem 1rem',
                                borderRadius: '10px',
                                maxWidth: 'fit-content',
                                animation: 'fadeInOut 1.5s ease-in-out infinite',
                                '@keyframes fadeInOut': {
                                    '0%': { opacity: 0 },
                                    '50%': { opacity: 1 },
                                    '100%': { opacity: 0 },
                                },
                            }}>
                            {typerName} is typing...
                        </Typography>
                        : <></>
                }
                <Container ref={bottomRef} />


            </Stack>


            <form
                onSubmit={submitHandler}
                style={{
                    height: "4rem",

                }}
            >
                <Stack direction={"row"} height={"100%"}
                    style={{
                        height: "100%",
                        position: "relative",
                        alignItems: "center"
                    }}
                >
                    <IconButton onClick={handleFileOpen}
                        sx={{
                            position: "absolute",
                            left: "1rem",
                            // zIndex: "10"
                        }}

                    >
                        <AttachFile />
                    </IconButton>
                    <input placeholder='Type something here...' value={message}
                        onChange={messageOnChange}
                        style={{
                            padding: "0.5rem 2.3rem",
                            width: "100%",
                            marginLeft: "1rem",
                            outline: "none",
                            border: "none",
                            height: "70%",
                            fontSize: "1.2rem",
                            borderRadius: "20px",
                            backgroundColor: "lightgray"
                        }}>
                    </input>

                    {/* <TextField
                        // label={"Type something here..."}
                        placeholder='Type something here...'
                        sx={{
                            padding: "0.5rem 2rem",
                            width: "100%",
                            marginLeft: "2rem",
                            outline: "none",
                            border: "none"
                        }}
                    /> */}

                    <IconButton sx={{ marginRight: "0.5rem" }} type='Submit'>
                        <Send />
                    </IconButton>


                </Stack>

            </form>

            <FileMenu anchorEl={anchorEl} chatId={chatId} />
        </Box>


    )
}



export default AppLayout()(Chats)