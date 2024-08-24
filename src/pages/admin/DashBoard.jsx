import { AdminPanelSettings as AdminPanelSettingsIcon, Group, Message, Notifications, Person } from '@mui/icons-material'
import { Box, Container, IconButton, Paper, Skeleton, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { DoughnutChart, LineChart } from '../../components/shared/Charts'
import { CurveButton, SearchInput } from '../../components/styles/StyledComponents'
import { getLastSevenDays } from "../../features/features"
import { useErrors } from '../../hooks/hooks'
import { useDashboardStatsQuery } from '../../redux/api/api'

const LastSevenDays = getLastSevenDays()

const DashBoard = () => {

    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAdmin } = useSelector((state) => (state.auth))

    const { data, isLoading, isError, error } = useDashboardStatsQuery()

    useErrors([{ isError, error }])

    const stats = data?.stats

    const DaashboardBar = () => {
        return (
            <Paper sx={{
                height: "10%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem"
            }}>
                <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}
                    sx={{
                        // backgroundColor: "red"
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        <AdminPanelSettingsIcon

                            sx={{
                                fontSize: "2rem",

                            }}
                        />
                    </Box>

                    <Typography

                    >
                        {moment().format("ddd, D MMM YY")}
                    </Typography>


                    <IconButton
                    >
                        <Notifications sx={{ color: "black", }} />
                    </IconButton>
                </Stack>
            </Paper>
        )
    }

    const Widget = ({ title, value, Icon }) => {
        return (
            <Paper
                elevation={3}
                sx={{
                    padding: "2rem",
                    margin: "2rem 0",
                    borderRadius: "1.5rem",
                    width: "20rem",
                }}>
                <Stack alignItems={"center"} spacing={"1rem"}>

                    <Typography sx={{
                        color: "rgba(0,0,0,0.7)",
                        borderRadius: "50%",
                        border: `5px solid black`,
                        width: "5rem",
                        height: "5rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>{value}</Typography>

                    <Stack direction={"row"} gap={"1rem"}>
                        {Icon}
                        {title}
                    </Stack>
                </Stack>
            </Paper>
        )
    }

    return (
        <Container component={"main"} sx={{
            height: "100%",
            padding: "1rem",
            overflow: "auto",

        }}>
            <DaashboardBar />

            <Stack

                sx={{
                    gap: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    flexDirection: {
                        xs: "column",
                        lg: "row",
                    },
                    width: "100%"
                }}>


                <Paper sx={{
                    padding: "1rem 2.5rem",
                    borderRadius: "1rem",
                    width: "95%",
                    maxWidth: "45rem",
                    margin: "1rem"
                }}>
                    {
                        isLoading ? <Skeleton /> :
                            <LineChart
                                dataArr={stats?.messageArray}
                                labels={LastSevenDays}
                                borderColor={["violet"]}
                                backgroundColor={["lightgreen"]}
                            />
                    }
                </Paper
                >

                <Paper
                    elevation={3}
                    sx={{
                        padding: "1rem ",
                        margin: "1rem",
                        borderRadius: "1rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // width: { xs: "100%", sm: "50%" },
                        position: "relative",
                        maxWidth: "25rem",
                    }}>

                    <Stack
                        position={"absolute"}
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        spacing={"0.5rem"}
                        width={"100%"}
                        height={"100%"}
                    >
                        <Group /> <Typography>Vs </Typography>
                        <Person />
                    </Stack>
                    {
                        isLoading ? <Skeleton /> :
                            <DoughnutChart

                                dataArr={[stats?.compareChats?.singleChats, stats?.compareChats?.groupChats]}
                                labels={["Single Chats", "Group chats"]}
                                backgroundColor={["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)",]}
                                borderColor={["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)",]}
                            />
                    }
                </Paper>

            </Stack>

            {
                isLoading ? <Skeleton /> :
                    <Stack direction={{
                        xs: "column",
                        sm: "row",
                    }}
                        spacing="2rem"
                        justifyContent="space-between"
                        alignItems={"center"}
                        margin={"2rem 0"}
                    >
                        <Widget title={"Users"} value={stats?.counts?.user} Icon={<Person />} />
                        <Widget title={"Chats"} value={stats?.compareChats?.singleChats + stats?.compareChats?.groupChats} Icon={<Group />} />
                        <Widget title={"Messages"} value={stats?.counts?.messages} Icon={<Message />} />


                    </Stack>

            }


        </Container>
    )
}

export default AdminLayout(DashBoard)


{/* const DaashboardBar = () => {
        return (
            <Paper sx={{
                height: "10%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem"
            }}>
                <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}>
                    <AdminPanelSettingsIcon sx={{ fontSize: "2rem" }} />
                    <SearchInput placeholder='Search' />
                    <CurveButton style={{ marginRight: "auto" }}>Search</CurveButton>
                    <Typography
                        sx={{
                            display: { xs: "none", sm: "block" }
                        }}
                    >{moment().format("ddd, D MMM YY")}</Typography>
                    <IconButton
                        sx={{
                            display: { xs: "none", sm: "block" },

                        }}>
                        <Notifications sx={{ color: "black", }} />
                    </IconButton>
                </Stack>
            </Paper>
        )
    } */}