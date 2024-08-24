import { Avatar, Container, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { transformImage } from '../../features/features'
import { useErrors } from '../../hooks/hooks'
import { useGetAllUsersQuery } from '../../redux/api/api'

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
            <Avatar alt={params.row.name} src={params.row.avatar} />
        ),
    },

    {
        field: "name",
        headerName: "Name",
        headerClassName: "table-header",
        width: 200,
    },
    {
        field: "username",
        headerName: "Username",
        headerClassName: "table-header",
        width: 200,
    },
    {
        field: "friends",
        headerName: "Friends",
        headerClassName: "table-header",
        width: 150,
    },
    {
        field: "groups",
        headerName: "Groups",
        headerClassName: "table-header",
        width: 200,
    },
];

const UserManagement = () => {
    const [rows, setRows] = useState([])

    const { data, isLoading, isError, error } = useGetAllUsersQuery()

    useErrors([{ isError, error }])

    useEffect(() => {
        setRows(data?.users?.map((user) => (
            {
                ...user,
                id: user._id,
                avatar: transformImage(user.avatar, 100)
            }
        )))
    }, [data])
    return (
        <Container sx={{
            height: "100vh",
        }}>
            {
                isLoading ? <Skeleton /> :
                    <Table rows={rows} columns={columns} heading={"Users"} />

            }
        </Container>
    )
}

export default AdminLayout(UserManagement)