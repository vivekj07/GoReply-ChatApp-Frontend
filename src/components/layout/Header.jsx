import { Add, Group, Home, Logout, Menu as MenuIcon, NotificationAdd, Search as SearchIcon } from '@mui/icons-material'
import { AppBar, Avatar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { tomato } from '../../constants/colors'
import { server } from '../../constants/config'
import { userNotExist } from '../../redux/reducers/auth'
import { setIsmobile, setIsSearch } from '../../redux/reducers/misc'
import { resetNotifications } from '../../redux/reducers/chat'
import { getOrSavefromLocalStorage } from '../../features/features'
import image from "../../../public/Logo.png"


const Search = lazy(() => import('../dialogs/Search'))
const Notification = lazy(() => import('../dialogs/Notification'))
const NewGroup = lazy(() => import('../dialogs/NewGroup'))

const Header = () => {
    const { isMobile, isSearch } = useSelector((state) => state.misc)
    const { notificationsCount } = useSelector((state) => state.chat)
    const dispatch = useDispatch()

    const [isNewgroup, setIsNewgroup] = useState(false)
    const [isNotification, setIsNotification] = useState(false)


    const navigate = useNavigate()

    useEffect(() => {
        getOrSavefromLocalStorage({ key: "NotificationCount", value: notificationsCount })
    }, [notificationsCount])


    const handleMobile = () => {
        dispatch(setIsmobile(true))
    }
    const gotoHome = () => {
        navigate("/")
    }
    const openSearch = () => {
        dispatch(setIsSearch(true))
    }
    const closeSearch = () => {
        dispatch(setIsSearch(false))
    }
    const openNewgroup = () => {
        setIsNewgroup(pre => !pre)

    }
    const navigateToGroups = () => (navigate("/groups"))

    const logOutHandler = async () => {
        try {
            const { data } = await axios.post(`${server}/api/v1/user/logout`,
                {},
                { withCredentials: true }
            )
            dispatch(userNotExist())
            toast.success(data.message)


        } catch (err) {
            toast.error(err.response?.data?.message)
        }

    }

    const notificationHandler = () => {
        setIsNotification(pre => !pre)
        dispatch(resetNotifications())

    }

    return (
        <>
            <Box sx={{
                height: '4rem',
                // flexGrow: 1
            }}>
                <AppBar
                    sx={{
                        backgroundColor: tomato,
                        position: "relative"
                    }}
                >
                    <Toolbar>

                        <Box
                            sx={{
                                height: "50px",
                                width: "50px",
                                // backgroundColor: "black",
                                backgroundColor: "rgb(237, 237, 235)",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                display: { xs: "none", sm: "flex" }
                            }}
                        >
                            <Avatar src={image}
                                sx={{
                                    height: '40px',
                                    width: '40px',
                                    // backgroundColor: 'transparent',
                                    // filter: 'brightness(0) invert(1)', // Converts the image to white (you can adjust this to other colors)

                                }}
                            />
                        </Box>

                        <Typography
                            sx={{
                                display: { xs: "none", sm: "block" },
                                position: "absolute",
                                top: "40px",
                                left: "75px",
                                color: "black",
                                fontSize: "13px"

                            }}
                        >
                            GoReply.
                        </Typography>

                        <Box
                            sx={{
                                display: { xs: "block", sm: "none" },

                            }}
                        >
                            <IconButton onClick={handleMobile} >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{
                            flexGrow: 1
                        }}></Box>

                        <Box>
                            <IconBtn
                                title={"Home"}
                                icon={<Home />}
                                handler={gotoHome}
                            />
                            <IconBtn
                                title={"Search"}
                                icon={<SearchIcon />}
                                handler={openSearch}
                            />
                            <IconBtn
                                title={"New Group"}
                                icon={<Add />}
                                handler={openNewgroup}
                            />
                            <IconBtn
                                title={"Manage Groups"}
                                icon={<Group />}
                                handler={navigateToGroups}
                            />
                            <IconBtn
                                title={"New Notification"}
                                icon={<NotificationAdd />}
                                handler={notificationHandler}
                                value={notificationsCount}
                            />
                            <IconBtn
                                title={"Logout"}
                                icon={<Logout />}
                                handler={logOutHandler}
                            />
                        </Box>

                    </Toolbar>
                </AppBar>
            </Box>

            {
                isSearch && (<Suspense fallback={<Backdrop open />}>
                    <Search isSearch={isSearch} handleClose={closeSearch} />
                </Suspense>)
            }

            {
                isNewgroup && (
                    <Suspense fallback={<Backdrop open />}>
                        <NewGroup isNewgroup={isNewgroup} handleClose={openNewgroup} />
                    </Suspense>
                )
            }

            {
                isNotification && (
                    <Suspense fallback={<Backdrop open />}>
                        <Notification isNotification={isNotification} handleClose={notificationHandler} />
                    </Suspense>
                )
            }




        </>
    )
}

const IconBtn = ({ title, icon, handler, value }) => (
    <Tooltip title={title}>
        <IconButton onClick={handler}>
            {
                value ? <Badge badgeContent={value} color='error'>{icon}</Badge> : <>{icon}</>

            }
        </IconButton >
    </Tooltip>
)

export default Header