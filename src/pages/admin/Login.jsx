import { Button, Container, Paper, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { setIsAdmin } from "../../redux/reducers/auth"
import { useCustomMutation, useErrors } from "../../hooks/hooks"
import { useAdminLoginMutation, useGetIsAdminQuery } from "../../redux/api/api"

const Login = () => {
    const { isAdmin } = useSelector((state) => (state.auth))

    const dispatch = useDispatch()

    const [password, setPassword] = useState("")

    const [adminLogin, isLoading, data] = useCustomMutation(useAdminLoginMutation)

    const { data: IsAdmindata, isLoading: isLoadingGetAdmin, isError, error } = useGetIsAdminQuery()


    // useErrors([{ isError, error }])

    useEffect(() => {
        if (IsAdmindata?.success) {
            dispatch(setIsAdmin(IsAdmindata.isAdmin))
        }
        // console.log(IsAdmindata)
    })

    const loginHandler = async () => {
        await adminLogin("Logging In...", { secretKey: password })

    }

    useEffect(() => {
        if (data?.success) {
            dispatch(setIsAdmin(true))
        } else {
            dispatch(setIsAdmin(false))
        }
    }, [data])

    if (isAdmin) return <Navigate to={"/admin/dashboard"} />

    return (
        <Container maxWidth="sm"
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    padding: 4,
                    margin: 4,
                    width: "80%",
                    maxHeight: "90%",
                    overflow: "auto",
                    "&::-webkit-scrollbar": {
                        display: "none"
                    }

                }}
            >
                <Typography
                    variant='h5'
                    sx={{
                        textAlign: "center"
                    }}
                >Admin Login</Typography>
                <form
                    style={{
                        width: "100%",

                    }}
                >

                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        label="Secret Key"
                        type='password'
                        margin="normal"
                        fullWidth
                    />

                    <Button
                        variant='contained'
                        fullWidth
                        sx={{
                            margin: "1rem 0"
                        }}
                        onClick={loginHandler}

                    > Login
                    </Button>


                </form>
            </Paper>
        </Container>

    )
}

export default Login