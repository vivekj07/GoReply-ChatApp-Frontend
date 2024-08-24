import { Add, CheckCircleOutline, Delete, Edit, KeyboardBackspace, Menu as MenuIcon } from '@mui/icons-material'
import { Backdrop, Button, Drawer, Grid, IconButton, Skeleton, Stack, TextField, Typography } from "@mui/material"
import React, { lazy, memo, Suspense, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AvatarCard from "../components/shared/AvatarCard"
import UserItem from '../components/shared/UserItem'
import { LinkComponent } from '../components/styles/StyledComponents'
import { useCustomMutation, useErrors } from '../hooks/hooks'
import { useDeleteChatMutation, useGetChatDetailsQuery, useMyGroupsQuery, useRemoveMemberMutation, useRenameGroupMutation } from '../redux/api/api'

const AddMembers = lazy(() => import('../components/dialogs/AddMembers'))
const ConfirmDelete = lazy(() => import('../components/dialogs/ConfirmDelete'))




const Groups = () => {
    const navigate = useNavigate()
    const chatId = useSearchParams()[0].get("group");
    const navigateBack = () => navigate("/")

    const [isMobile, setIsMobile] = useState(false)
    const [groupName, setgroupName] = useState('')
    const [updateGroupName, setUpdateGroupName] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [isAddMember, setIsAddMember] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [refreshPage, setRefreshPage] = useState(false)

    const { data: MyGroupsData, isLoading: isLoadingMyGroups, error: MyGroupsError, isError: isErrorMyGroups }
        = useMyGroupsQuery({ skip: !chatId })
    const { data: ChatDetailsData, isLoading: isLoadingChatDetails, error: ChatDetailsError, isError: isErrorChatDetails }
        = useGetChatDetailsQuery({ id: chatId, populate: true }, { skip: !chatId })

    const [renameGroup, isLoadingRename, renameGroupData] = useCustomMutation(useRenameGroupMutation)
    const [removeMember, isLoadingremoveMember] = useCustomMutation(useRemoveMemberMutation)
    const [deleteGroup, isLoadingdeleteGroup] = useCustomMutation(useDeleteChatMutation)

    useErrors([
        { error: MyGroupsError, isError: isErrorMyGroups },
        { error: ChatDetailsError, isError: isErrorChatDetails },


    ])


    const MobileViewHandler = () => {
        setIsMobile((pre) => !pre)
    }
    const closeAddMember = () => {
        setIsAddMember(false)
    }
    const closeconfirmDelete = () => {
        setConfirmDelete(false)
    }
    const deleteHandler = async (chatId) => {
        await deleteGroup("Deleting Group...", { id: chatId })
        setConfirmDelete(false)
        setgroupName("")
        navigate("/groups")

    }
    const closeMobileView = () => {
        setIsMobile(false)
    }
    const removeHandler = (id) => {
        removeMember("Removing Member...", { member: id, groupId: chatId })
        setRefreshPage(((pre) => (!pre)))
    }

    const renameGroupHandler = async () => {
        await renameGroup("Updating group name...", { id: chatId, newName: updateGroupName })
        setIsEdit(false)
    }

    useEffect(() => {
        if (isErrorChatDetails) {
            setgroupName("")
            navigate('/groups')
        }
    }, [isErrorChatDetails])

    useEffect(() => {
        setgroupName(ChatDetailsData?.chat?.name)
        setUpdateGroupName(ChatDetailsData?.chat?.name)

        return () => {
            setgroupName("")
            setUpdateGroupName("")
            setIsEdit(false)

        }
    }, [ChatDetailsData, renameGroupData])

    return (
        <Grid container height={"100vh"} >
            <Grid item height={"100%"} sm={4} lg={3} padding={"0rem"}
                sx={{
                    display: {
                        xs: "none",
                        sm: "block"
                    },
                    backgroundColor: "rgba(227, 222, 247, .5)"
                }}
            >
                {
                    isLoadingMyGroups ? <Skeleton height={"100vh"} variant='rounded' /> :
                        <GroupList myGroups={MyGroupsData?.transformedGroups} chatId={chatId} />
                }
            </Grid>


            <Grid item height={"100%"} xs={12} sm={8} lg={9}
                sx={{
                    position: "relative",
                    overflow: "auto"
                }}
            >
                <IconButton
                    onClick={navigateBack}
                    sx={{
                        position: "absolute",
                        left: "1rem",
                        top: "1rem",
                        backgroundColor: "black",
                        color: "white",
                        ":hover": {
                            backgroundColor: "rgba(55, 56, 55)",

                        }
                    }}>
                    <KeyboardBackspace
                        sx={{
                            ":hover": {
                                translate: "-3px",
                                transition: "all 0.3s"
                            }
                        }}
                    />
                </IconButton>

                <IconButton onClick={MobileViewHandler}
                    sx={{
                        display: {
                            xs: "block",
                            sm: "none"
                        },
                        position: "absolute",
                        right: "1rem",
                        top: "1rem",
                        // backgroundColor: "black",
                        color: "black",
                        ":hover": {
                            backgroundColor: "rgba(212, 191, 150,.5)",

                        }
                    }}
                >
                    <MenuIcon />
                </IconButton>


                <Stack justifyContent={"center"} alignItems={"center"} height={"100vh"} >

                    {
                        groupName && (
                            <>
                                {
                                    isEdit ?
                                        (<Stack direction={"row"}
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                            spacing={"1rem"}
                                            padding={"3rem"}>
                                            <TextField value={updateGroupName}
                                                onChange={(e) => setUpdateGroupName(e.target.value)} />
                                            <IconButton disabled={isLoadingRename} onClick={renameGroupHandler}>
                                                <CheckCircleOutline />
                                            </IconButton>
                                        </Stack>)
                                        :
                                        (<Stack direction={"row"}
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                            spacing={"1rem"}
                                            padding={"3rem"}>
                                            <Typography variant='h4'>{groupName.length > 15 ? `${groupName.slice(0, 15)}...` : groupName}</Typography>
                                            <IconButton onClick={() => setIsEdit(true)}>
                                                <Edit />
                                            </IconButton>
                                        </Stack>)
                                }
                                <Typography>Members</Typography>

                                <Stack maxWidth={"45rem"}
                                    width={"100%"}
                                    boxSizing={"border-box"}
                                    padding={{
                                        sm: "1rem",
                                        xs: "0",
                                        md: "1rem 4rem",
                                    }}
                                    height={"50vh"}
                                    overflow={"auto"}>

                                    {
                                        isLoadingChatDetails ? <Skeleton height={"100vh"} /> :
                                            ChatDetailsData?.chat.members.map((i) => (
                                                <UserItem
                                                    key={i._id}
                                                    user={i}
                                                    handler={removeHandler}
                                                    isAdded
                                                    handlerIsLoading={isLoadingremoveMember}
                                                    styling={{
                                                        boxShadow: "0 0 5px  rgba(0,0,0,0.2)",
                                                        padding: "1rem 2rem",
                                                        borderRadius: "10px",
                                                        margin: "0.5rem"
                                                    }}
                                                />
                                            ))
                                    }
                                </Stack>

                                <Stack direction={{
                                    xs: "column",
                                    sm: "row",
                                }}
                                    spacing={"1rem"}
                                    p={{
                                        xs: "0",
                                        sm: "1rem",
                                        md: "1rem 4rem",
                                    }}>
                                    <Button startIcon={<Delete />} color='error'
                                        onClick={() => setConfirmDelete(true)}>DELETE</Button>
                                    <Button startIcon={<Add />} variant='contained'
                                        onClick={() => setIsAddMember(true)}>ADD MEMBER</Button>
                                </Stack>
                            </>
                        )
                    }

                </Stack>
            </Grid>

            {
                isAddMember && (
                    <Suspense fallback={<Backdrop open />}>
                        <AddMembers isAddMember={isAddMember} closeAddMember={closeAddMember} chatId={chatId} />

                    </Suspense>
                )
            }
            {
                confirmDelete && (
                    <Suspense fallback={<Backdrop open />}>
                        <ConfirmDelete confirmDelete={confirmDelete}
                            closeconfirmDelete={closeconfirmDelete}
                            deleteHandler={() => deleteHandler(chatId)} />

                    </Suspense>
                )
            }

            <Drawer open={isMobile} onClose={closeMobileView}
                PaperProps={{
                    sx: {
                        width: "70%"
                    }
                }}
                sx={{
                    display: {
                        xs: "block",
                        sm: "none",
                    },
                }}
            >
                {
                    isLoadingMyGroups ? <Skeleton height={"100vh"} variant='rounded' /> :
                        <GroupList myGroups={MyGroupsData?.transformedGroups} chatId={chatId} />
                }
            </Drawer>

        </Grid >
    )
}

const GroupList = ({ myGroups = [], chatId }) => {

    return (
        <Stack padding={"1rem 0"} width={"100%"} height={"100%"}
            sx={{
                overflowY: "auto",
                overflowX: "hidden",
            }}
        >
            {
                myGroups.length > 0 ? (
                    myGroups.map((i) => {

                        return <GroupListItem key={i._id} group={i} chatId={chatId} />
                    })
                ) : <Typography variant='h6' textAlign={"center"}>No Groups</Typography>
            }
        </Stack>
    )
}

const GroupListItem = memo(({ group, chatId }) => {
    const { name, avatar, _id } = group

    return <LinkComponent to={`?group=${_id}`}>
        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} height={"6rem"}
            sx={{
                backgroundColor: chatId == _id ? "rgba(0,0,0,.8)" : "inherit",
                color: chatId == _id ? "rgba(227, 222, 247, 1)" : "rgb(0,0,0)",
                padding: {
                    xs: "0.5rem 0.5rem",
                    md: "0.5rem 1rem"
                },

            }}
        >
            <AvatarCard avatar={avatar} max={5} />

            <Typography>{name.length > 20 ? `${name.slice(0, 20)}...` : name}</Typography>
        </Stack>
    </LinkComponent >


})

export default Groups