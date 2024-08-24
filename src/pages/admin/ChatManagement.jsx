import { Avatar, Container, Skeleton, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import AvatarCard from '../../components/shared/AvatarCard'
import Table from '../../components/shared/Table'
import { useErrors } from '../../hooks/hooks'
import { useGetAllChatsQuery } from '../../redux/api/api'

const columns = [
    {
        field: "id",
        headerName: "ID",
        headerClassName: "table-header",
        width: 200,
    },
    {
        field: "avatar",
        headerName: "Avatar",
        headerClassName: "table-header",
        width: 150,
        renderCell: (params) => (
            <AvatarCard avatar={params.row.avatar} max={2} />
        ),
    },

    {
        field: "name",
        headerName: "Name",
        headerClassName: "table-header",
        width: 200,
    },
    {
        field: "groupChat",
        headerName: "Group",
        headerClassName: "table-header",
        width: 100,
    },
    {
        field: "totalMembers",
        headerName: "Total Members",
        headerClassName: "table-header",
        width: 100,
    },
    {
        field: "members",
        headerName: "Members",
        headerClassName: "table-header",
        width: 200,
        renderCell: (params) => <AvatarCard avatar={params.row.members.map((i) => i.avatar)} />
    },
    {
        field: "totalMessages",
        headerName: "Total Messages",
        headerClassName: "table-header",
        width: 100,
    },
    {
        field: "creator",
        headerName: "Created By",
        headerClassName: "table-header",
        width: 300,
        renderCell: (params) => (
            <Stack direction={"row"} gap={"1rem"} alignItems={"center"}>
                <Avatar src={params.row.creator.avatar} />
                <span>{params.row.creator.name}</span>
            </Stack>
        )
    },

];

const ChatManagement = () => {
    const [rows, setRows] = useState([])

    const { data, isLoading, isError, error } = useGetAllChatsQuery()

    useErrors([{ isError, error }])


    useEffect(() => {
        setRows(data?.chats?.map((chat) => (
            {
                ...chat,
                id: chat._id,
            }
        )))
    }, [data])
    return (
        <Container sx={{
            height: "100vh",
        }}>
            {
                isLoading ? <Skeleton /> :
                    <Table rows={rows} columns={columns} heading={"All Chats"} />

            }
        </Container>
    )
}


export default AdminLayout(ChatManagement)