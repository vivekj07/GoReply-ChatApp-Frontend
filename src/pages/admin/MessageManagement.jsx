import { Avatar, Box, Container, Skeleton, Stack } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import RenderAttachment from '../../components/shared/RenderAttachment'
import Table from '../../components/shared/Table'
import { fileFormatReader } from '../../features/features'
import { useErrors } from '../../hooks/hooks'
import { useGetAllMessagesQuery } from '../../redux/api/api'

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    cellClassName: 'cell-wrap',
    renderCell: (params) => {
      const attachments = params.row.attachments;

      return (
        attachments.length > 0 ? <>
          {
            attachments?.map((attachment) => {
              const url = attachment.url;
              const file = fileFormatReader(url)

              return <Box key={attachment.public_id}>
                <a
                  href={url}
                  download
                  target="_blank"
                  style={{
                    color: "black",
                  }}
                >

                  <RenderAttachment url={url} file={file} />
                </a>
              </Box>

            })
          }

        </> :
          "No attachments"
      )
    },
  },

  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 200,
  },

  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Stack direction={"row"} gap={"1rem"} alignItems={"center"}>
        <Avatar src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    )
  },
  {
    field: "chat",
    headerName: "Chat",
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
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => moment(params.row.createdAt).format("MMMM Do YYYY , h:mm:ss a")
  },

];

const MessageManagement = () => {
  const [rows, setRows] = useState([])

  const { data, isLoading, isError, error } = useGetAllMessagesQuery()

  useErrors([{ isError, error }])


  useEffect(() => {
    setRows(data?.Messages?.map((message) => (
      {
        ...message,
        id: message._id,
      }
    )))
  }, [data])
  return (
    <Container sx={{
      height: "100vh",
    }}>{
        isLoading ? <Skeleton /> :
          <Table rows={rows} columns={columns} heading={"All Messages"} rowHeight={200} />

      }
    </Container>
  )
}



export default AdminLayout(MessageManagement) 