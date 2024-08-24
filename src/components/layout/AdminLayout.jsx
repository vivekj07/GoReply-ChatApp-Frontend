import {
    Avatar,
    Box,
    Drawer,
    Grid,
    IconButton,
    Stack,
    Typography,
    styled,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import {
    Apps,
    Close as CloseIcon,
    Dashboard as DashboardIcon,
    ExitToApp as ExitToAppIcon,
    Groups as GroupsIcon,
    ManageAccounts as ManageAccountsIcon,
    Menu as MenuIcon,
    Message as MessageIcon,
} from "@mui/icons-material";
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCustomMutation } from '../../hooks/hooks';
import { useAdminLogoutMutation } from '../../redux/api/api';
import { setIsAdmin } from '../../redux/reducers/auth';
import Logo from "../../../public/Logo.png"

const LinkComponent = styled(Link)({
    textDecoration: "none",
    padding: "1rem 2rem",
    borderRadius: "1rem",
    cursor: "default",
    color: "black"
})



const AdminLayout = (WrappedComponent) => {

    return (props) => {
        const location = useLocation()
        const [isMobile, setIsMobile] = useState(false)
        const navigate = useNavigate()

        const dispatch = useDispatch()

        const [logout, isLoading, data] = useCustomMutation(useAdminLogoutMutation)

        const handleMobile = () => {
            setIsMobile((pre) => (!pre))
        }
        const logoutHandler = async () => {
            await logout()

        }

        useEffect(() => {
            if (data?.success) {
                dispatch(setIsAdmin(false))
                navigate("/admin")
            }
        }, [data])



        const SideBar = () => {

            return (
                <Box width={"100%"} p={"1rem"} height={"100vh"}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem"
                    }}
                >
                    {/* <Typography variant='h5'>GoReply.</Typography> */}

                    <Stack direction={"row"}
                        sx={{
                            // backgroundColor: "blue"
                        }}
                    >
                        <Box
                            sx={{
                                height: "70px",
                                width: "70px",
                                backgroundColor: "black",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                // display: { xs: "none", sm: "flex" },
                                marginBottom: "2rem",
                                // alignSelf: "center"
                            }}
                        >
                            <Avatar src={Logo}
                                sx={{
                                    height: '60px',
                                    width: '60px',
                                    backgroundColor: 'transparent',
                                    filter: 'brightness(0) invert(1)', // Converts the image to white (you can adjust this to other colors)

                                }}
                            />


                        </Box>
                        <Typography variant='h6' fontSize={"1rem"} color={"black"} alignSelf={"self-end"}
                            sx={{
                                position: "absolute",
                                top: "60px",
                                left: "85px"
                            }}
                        >GoReply.</Typography>
                    </Stack>

                    <SideBarItem link={"/admin/dashboard"} Icon={DashboardIcon} name={"DashBoard"} />
                    <SideBarItem link={"/admin/users"} Icon={ManageAccountsIcon} name={"Users"} />
                    <SideBarItem link={"/admin/chats"} Icon={GroupsIcon} name={"Chats"} />
                    <SideBarItem link={"/admin/messages"} Icon={MessageIcon} name={"Messages"} />
                    <SideBarItem link={"/"} Icon={Apps} name={"GoTo App"}

                    />



                    <LinkComponent onClick={logoutHandler}
                        sx={{
                            backgroundColor: "rgba(1,1,1,.8)",
                            color: "white",
                            marginTop: "auto"
                        }}
                    >
                        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                            <ExitToAppIcon />

                            <Typography>Logout</Typography>
                        </Stack>
                    </LinkComponent>
                </Box>
            )
        }

        return (
            <Grid container minHeight={"100vh"} >
                <Box
                    sx={{
                        display: { xs: "block", md: "none" },
                        position: "fixed",
                        right: "0.5rem",
                        top: "0.5rem",
                    }}
                >
                    <IconButton onClick={handleMobile}
                        sx={{
                            backgroundColor: 'black',
                            color: "white",

                        }}
                    >
                        {isMobile ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                </Box>

                <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
                    <div> <SideBar />  </div>
                </Grid>

                <Grid item xs={12} md={8} lg={9} height={"100vh"} overflow={"auto"}
                    sx={{
                        bgcolor: "rgba(237, 237, 237,.6)",
                    }}>
                    <WrappedComponent {...props} />
                </Grid>

                <Drawer open={isMobile} onClose={handleMobile}>
                    <SideBar />
                </Drawer>
            </Grid>
        );
    };
};



const SideBarItem = ({ link, Icon, name }) => (
    <Stack

    >
        <LinkComponent to={link}
            sx={{
                backgroundColor: location.pathname == link ? "black" : "",
                color: location.pathname == link ? "white" : "",
                ":hover": {
                    backgroundColor: location.pathname == link ? "black" : "rgb(228, 230, 227)",
                    color: location.pathname == link ? "white" : "",
                },

            }}
        >
            <Stack spacing={"1rem"} direction={"row"} alignItems={"center"}>
                <Icon />
                <Typography>{name}</Typography>
            </Stack>
        </LinkComponent>
    </Stack>

)

export default AdminLayout;
