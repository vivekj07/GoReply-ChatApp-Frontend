import React, { useState } from 'react'
import { Dialog, Stack, DialogTitle, TextField, Typography, Button, Skeleton } from '@mui/material'
import UserItem from "../shared/UserItem"
import { sampleUsers } from "../../constants/sampleData"
import { useCreateGroupChatMutation, useGetMyfriendsQuery } from '../../redux/api/api'
import { useCustomMutation, useErrors } from '../../hooks/hooks'
import { toast } from "react-hot-toast"

const NewGroup = ({ isNewgroup, handleClose }) => {


    const [groupName, setGroupName] = useState("")
    const [selectedMembers, setSelectedMembers] = useState([])

    const myFriends = useGetMyfriendsQuery({ chatId: "" })

    const [createGroup, isLoading, data] = useCustomMutation(useCreateGroupChatMutation)


    useErrors([{ error: myFriends.error, isError: myFriends.isError }])

    const selectMembersHandler = (_id) => {
        setSelectedMembers((pre) => {
            return pre.includes(_id) ? pre.filter((i) => i != _id) : [...pre, _id]
        })

    }

    // console.log(selectedMembers)

    const newgroupHandler = async () => {
        if (!groupName) return toast.error("Group name is Requeried");

        await createGroup("Creating new Group...", { name: groupName, members: selectedMembers })
        handleClose()
    }

    const cancelhandler = () => {
        setSelectedMembers([]);
        handleClose()
    }

    return (
        <Dialog open={isNewgroup} onClose={handleClose} >
            <Stack direction={"column"} gap={"1rem"}
                sx={{
                    padding: {
                        xs: "1rem",
                        sm: "2rem"
                    },
                    width: {
                        xs: "20rem",
                        sm: "25rem"
                    },

                }}
            >
                <DialogTitle variant='h5' textAlign={"center"}>New Group</DialogTitle>

                <TextField
                    label="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
                <Typography  >Members </Typography>
                <Stack>
                    {
                        myFriends.isLoading ?
                            <Skeleton height={"100%"} />
                            :
                            myFriends?.data?.friends?.map((i) => {
                                return (
                                    <UserItem
                                        key={i._id}
                                        user={i}
                                        handler={selectMembersHandler}
                                        handlerIsLoading={false}
                                        isAdded={selectedMembers.includes(i._id)}
                                    />
                                )
                            })
                    }

                </Stack>

                <Stack spacing={1}>
                    <Button disabled={isLoading} sx={{ color: "red" }} onClick={cancelhandler}>Cancel</Button>
                    <Button disabled={isLoading} variant='contained' onClick={newgroupHandler}>Create</Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}

export default NewGroup