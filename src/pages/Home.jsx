import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material'

const Home = () => {
    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
            <Typography variant='h5'>Let's Start Conversation!</Typography>
        </Box>

    )
}

export default AppLayout()(Home)