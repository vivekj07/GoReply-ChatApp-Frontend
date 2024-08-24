import { Dialog, DialogTitle, Stack, Button, Skeleton } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from "../../constants/sampleData"
import UserItem from '../shared/UserItem'
import { useAddMembersMutation, useGetMyfriendsQuery } from '../../redux/api/api'
import { useParams } from 'react-router-dom'
import { useCustomMutation, useErrors } from '../../hooks/hooks'

const AddMembers = ({ isAddMember, closeAddMember, chatId }) => {
    const [selectedMembers, setSelectedMembers] = useState([])

    const myfriends = useGetMyfriendsQuery({ chatId }, { skip: !chatId })

    const [addMembers] = useCustomMutation(useAddMembersMutation)

    useErrors([{ error: myfriends.error, isError: myfriends.isError }])

    const selectMember = (id) => {
        selectedMembers.includes(id) ? (
            setSelectedMembers((pre) => pre.filter((i) => i != id))
        ) : setSelectedMembers((pre) => [...pre, id])
    }

    const addMemberSubmitHandler = async () => {
        await addMembers("Adding Members...", { members: selectedMembers, groupId: chatId })
        closeAddMember()
    }

    return (
        <Dialog open={isAddMember} onClose={closeAddMember}>
            <Stack p={"2rem"} spacing={"2rem"} width={"20rem"}

            >
                <DialogTitle>Add Members</DialogTitle>
                <Stack spacing={"1rem"}>
                    {
                        myfriends.isLoading ?
                            <Skeleton height={"100%"} />
                            :
                            myfriends?.data?.availableFriends?.length > 0 && (
                                myfriends?.data?.availableFriends.map((i) => (
                                    <UserItem
                                        key={i._id}
                                        user={i}
                                        handler={selectMember}
                                        isAdded={selectedMembers.includes(i._id)}
                                    />
                                ))
                            )
                    }
                </Stack>
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-evenly"}
                >
                    <Button color="error" onClick={closeAddMember}>
                        Cancel
                    </Button>
                    <Button
                        onClick={addMemberSubmitHandler}
                        variant="contained"
                    // disabled={isLoadingAddMembers}
                    >
                        Submit Changes
                    </Button>
                </Stack>
            </Stack>

        </Dialog>
    )
}

export default AddMembers