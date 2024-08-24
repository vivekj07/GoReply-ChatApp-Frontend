import { Grid, Box, Skeleton, Stack } from '@mui/material'
import React from 'react'
import { LayoutBackground } from '../../constants/colors'


export const LayoutLoader = () => (
    <>
        <Box
            sx={{
                height: "4rem",
            }}
        >
            <Skeleton height={"3rem"} variant="rectangular" />

        </Box>
        <Grid container spacing={"1rem"} sx={{
            height: "calc(100vh - 4rem)",
        }}>

            <Grid item sm={4} md={3} sx={{
                display: { xs: "none", sm: "block" },

            }}>
                <Skeleton height={"100vh"} variant="rectangular" />
            </Grid>

            <Grid item xs={12} sm={8} md={6}
            >
                <Stack sx={{
                    gap: "1rem"
                }}>
                    <Skeleton height={"10vh"} variant="rounded" />
                    <Skeleton height={"10vh"} variant="rounded" />
                    <Skeleton height={"10vh"} variant="rounded" />
                    <Skeleton height={"10vh"} variant="rounded" />
                    <Skeleton height={"10vh"} variant="rounded" />
                    <Skeleton height={"10vh"} variant="rounded" />
                    <Skeleton height={"10vh"} variant="rounded" />
                    <Skeleton height={"10vh"} variant="rounded" />
                    <Skeleton height={"10vh"} variant="rounded" />
                    <Skeleton height={"10vh"} variant="rounded" />

                </Stack>



            </Grid>

            <Grid item md={3}
                sx={{
                    display: {
                        xs: "none", md: "block",

                    }
                }}>
                <Skeleton height={"100vh"} variant="rectangular" />


            </Grid>
        </Grid>


    </>

)