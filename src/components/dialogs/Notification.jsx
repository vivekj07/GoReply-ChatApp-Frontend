import React, { memo } from 'react'
import { Dialog, Stack, DialogTitle, Avatar, Typography, Button, Skeleton } from '@mui/material'
import { sampleNotifications } from "../../constants/sampleData"
import { useGetNotificationsQuery, useHandleRequestMutation } from '../../redux/api/api'
import { useErrors } from '../../hooks/hooks'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { resetNotifications } from '../../redux/reducers/chat'

const Notification = ({ isNotification, handleClose }) => {
    const dispatch = useDispatch()

    const { data, isError, error, isLoading, refetch } = useGetNotificationsQuery()
    const [handleRequest] = useHandleRequestMutation()
    useErrors([{ isError, error }])

    const friendRequestHandler = async ({ _id, accept }) => {
        try {
            const res = await handleRequest({ requestId: _id, accept })
            if (res.data) {
                toast.success(res.data.message)
            } else {
                toast.error(res.error?.data.message || "Something went wrong")

            }

        } catch (err) {
            toast.error(err.message || "Something went wrong")
            console.log(err)
        } finally {
            refetch()
        }
    }


    return (
        <Dialog open={isNotification} onClose={handleClose}>
            <Stack direction={"column"} gap={"1rem"}
                sx={{
                    padding: {
                        xs: "0.5rem",
                        sm: "2rem"
                    },
                    width: {
                        xs: "20rem",
                        sm: "30rem",
                        lg: "35rem"
                    },

                }}
            >
                <DialogTitle textAlign={"center"}>Notifications</DialogTitle>
                {isLoading ? <Skeleton height={"100%"} /> :
                    data?.requests?.length > 0 ?
                        data.requests.map((i) => (
                            <NotificationCard
                                key={i._id}
                                sender={i.sender}
                                _id={i._id}
                                handler={friendRequestHandler}

                            />
                        )) :
                        <>
                            <Typography textAlign={"center"} variant='h6'>No Notifications Yet!</Typography>
                        </>
                }


            </Stack>
        </Dialog>
    )
}

const NotificationCard = memo(({ sender, _id, handler }) => {
    const { avatar, name } = sender
    return (
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}

            sx={{
                boxShadow: "0 0 3px  rgba(0,0,0,0.4)",
                padding: "0.5rem 1rem",
                borderRadius: "10px",
                width: "100%"
            }}>
            <Avatar src={avatar}></Avatar>
            <Typography variant="body1"
                sx={{
                    flexGlow: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "100%",
                }}>
                {`${name} sent you a friend request.`}
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: "0", sm: "0.5rem" }}>
                <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
                <Button sx={{ color: "red" }} onClick={() => handler({ _id, accept: false })}>Reject</Button>
            </Stack>
        </Stack>
    )
})

export default Notification