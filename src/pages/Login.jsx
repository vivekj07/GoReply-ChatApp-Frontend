import React, { useState } from 'react'
import { Stack, Typography, Container, TextField, Paper, Button, Avatar, IconButton } from "@mui/material"
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import axios from 'axios';
import { server } from '../constants/config';
import { useDispatch } from 'react-redux';
import { userExist } from '../redux/reducers/auth';
import toast from 'react-hot-toast';

const Login = () => {

    const dispatch = useDispatch()

    const [isLogin, setIslogin] = useState(true)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [avatarSrc, setAvatarSrc] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setAvatar(file)
        if (file) {

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                setAvatarSrc(reader.result); // Set the file's URL as the avatar source
            };

        }
    };

    const signUpHandler = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("name", name)
        formdata.append("username", username)
        formdata.append("password", password)
        formdata.append("bio", bio)
        formdata.append("avatar", avatar)
        setIsLoading(true)

        const toastId = toast.loading("Signing Up...")
        try {
            const { data } = await axios.post(`${server}/api/v1/user/create`,
                formdata,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
            dispatch(userExist(data.user))
            toast.success(data.message, { id: toastId })

        } catch (err) {
            toast.error(err.response.data.message || "Something went wrong", { id: toastId })
        } finally {
            setIsLoading(false)
        }
    }


    const loginHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const toastId = toast.loading("Logging In...")
        try {
            const { data } = await axios.post(`${server}/api/v1/user/login`,
                {
                    username,
                    password,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            dispatch(userExist(data.user))
            toast.success(data.message, { id: toastId })

        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong", { id: toastId })
        } finally {
            setIsLoading(false)
        }
    }

    // const avatar = useFileHandler("single")



    return (
        <div style={{ backgroundColor: "rgba(235, 162, 52,.3)" }}>
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
                    {
                        isLogin ?
                            <>
                                <Typography
                                    variant='h5'
                                    sx={{
                                        textAlign: "center"
                                    }}
                                >Login</Typography>
                                <form
                                    style={{
                                        width: "100%",

                                    }}
                                >
                                    <TextField
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        label="Username"
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        label="Password"
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
                                        disabled={isLoading}
                                        onClick={loginHandler}

                                    > Login
                                    </Button>

                                    <Typography

                                        sx={{
                                            textAlign: "center"
                                        }}
                                    >
                                        OR
                                    </Typography>
                                    <Button
                                        variant='contained'
                                        fullWidth
                                        sx={{
                                            margin: "1rem 0"
                                        }}
                                        disabled={isLoading}
                                        onClick={(e) => setIslogin(false)}

                                    > Sign up
                                    </Button>
                                </form>

                            </> :

                            <><Typography
                                variant='h5'
                                sx={{
                                    textAlign: "center"
                                }}
                            >Sign Up</Typography>
                                <form
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "1rem"

                                    }}
                                >
                                    <Stack
                                        sx={{
                                            position: "relative",
                                            height: "8rem",
                                            width: "8rem",


                                        }}>
                                        <Avatar
                                            src={avatarSrc}
                                            sx={{
                                                height: "8rem",
                                                width: "8rem",

                                            }}
                                        ></Avatar>
                                        <IconButton
                                            sx={{
                                                position: "absolute",
                                                right: "-0.4rem",
                                                bottom: "-0.4rem",
                                                zIndex: "10",
                                                backgroundColor: "rgb(91, 92, 91,.7)",
                                                ":hover": {
                                                    backgroundColor: "rgb(91, 92, 91,.9)",
                                                },
                                                color: "white"
                                            }}
                                            component="label"
                                        ><>
                                                <CameraAltIcon />
                                                <VisuallyHiddenInput
                                                    type='file'
                                                    accept='image/*'
                                                    onChange={handleFileChange} />
                                            </>


                                        </IconButton>

                                    </Stack>
                                    <TextField
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        label="Name"
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        required
                                        label="Bio"
                                        margin="normal"
                                        fullWidth
                                    />
                                    <TextField
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        label="Username"
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        label="Password"
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
                                        disabled={isLoading}
                                        onClick={signUpHandler}

                                    > Sign Up
                                    </Button>

                                    <Typography

                                        sx={{
                                            textAlign: "center"
                                        }}
                                    >
                                        OR
                                    </Typography>
                                    <Button
                                        variant='contained'
                                        fullWidth
                                        sx={{
                                            margin: "1rem 0"
                                        }}
                                        disabled={isLoading}

                                        onClick={(e) => setIslogin(true)}

                                    > Login
                                    </Button>
                                </form>
                            </>
                    }
                </Paper>
            </Container>
        </div>
    )
}

export default Login