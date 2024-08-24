import { Menu, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsDeleteChatMenu } from '../../redux/reducers/misc'
import { Delete, Logout } from '@mui/icons-material'
import { useCustomMutation } from '../../hooks/hooks'
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api'
import { useNavigate } from 'react-router-dom'

const DeleteChatMenu = ({ DeleteMenuAnchor }) => {
    const { isDeleteChatMenu, DeleteChatMenuDetails } = useSelector((state) => (state.misc))

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [clearChat, isLoadingDeleteChat, DeleteChatData] = useCustomMutation(useDeleteChatMutation)
    const [leaveGroup, isLoadingLeaveGroup, LeaveGroupData] = useCustomMutation(useLeaveGroupMutation)

    const closehandler = () => {
        dispatch(setIsDeleteChatMenu(false))
    }

    const leavingGroup = async () => {
        await leaveGroup("Leaving Group...", { id: DeleteChatMenuDetails.chatId })
        closehandler()
    }

    const deleteChat = async () => {
        await clearChat("Deleting Chat...", { id: DeleteChatMenuDetails.chatId })
        closehandler()


    }

    useEffect(() => {
        if (DeleteChatData || LeaveGroupData) navigate("/")
    }, [DeleteChatData, LeaveGroupData])

    return (
        <Menu anchorEl={DeleteMenuAnchor.current} open={isDeleteChatMenu} onClose={closehandler}
            anchorOrigin={{
                vertical: "center",
                horizontal: "right"
            }}
            transformOrigin={{
                vertical: "center",
                horizontal: "center"
            }}
        >

            <Stack
                sx={{
                    width: "10rem",
                    height: "3rem",
                    padding: "0.5rem",
                    cursor: "pointer",
                    gap: "1rem"
                }}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                onClick={DeleteChatMenuDetails.groupChat ? leavingGroup : deleteChat}
            >
                {
                    DeleteChatMenuDetails.groupChat ?
                        <>
                            <Logout />
                            <Typography> Leave group</Typography>
                        </>
                        :
                        <>
                            <Delete />
                            <Typography>Delete Chat</Typography>
                        </>
                }
            </Stack>

        </Menu>
    )
}

export default DeleteChatMenu