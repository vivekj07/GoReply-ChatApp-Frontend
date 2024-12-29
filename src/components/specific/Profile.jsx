import {
    CalendarMonth as CalendarIcon,
    CameraAlt as CameraAltIcon,
    Lock,
    LockOpen,
    Person,
    AlternateEmail as UserNameIcon
} from "@mui/icons-material";
import { Avatar, Button, IconButton, Stack, styled, TextField, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { tomato } from "../../constants/colors";
import { useCustomMutation } from "../../hooks/hooks";
import { useUpdateProfileMutation } from "../../redux/api/api";
import { VisuallyHiddenInput } from "../styles/StyledComponents";
import { useDispatch } from "react-redux";
import { userExist } from "../../redux/reducers/auth";

const Profile = ({ user }) => {
    const [edit,setEdit]=useState(false);
    const [username, setUsername] = useState(user?.username)
    const [password, setPassword] = useState("")
    const [name, setName] = useState(user?.name)
    const [bio, setBio] = useState(user?.bio)
    const [avatar, setAvatar] = useState(null)
    const [avatarSrc, setAvatarSrc] = useState(user.avatar.url);

    const dispatch=useDispatch();

    const [updateMyProfile,isLoading,data]=useCustomMutation(useUpdateProfileMutation);

    useEffect(()=>{
        if(data?.user){
            dispatch(userExist(data.user))
        }
    },[data])

    const updateProfile= async ()=>{
        const formdata = new FormData()
        formdata.append("name", name)
        formdata.append("username", username)
        formdata.append("bio", bio)

        if(avatar){
            formdata.append("avatar", avatar)
        }

        if(password){
            formdata.append("password", password)
        }

        await updateMyProfile("Updating Profile...",formdata)

        setEdit(false)
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setAvatar(file)
        if (file) {

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                setAvatarSrc(reader.result); 
            };

        }
    };

    return (
        edit ?
        <Stack spacing={"2rem"} direction={"column"} alignItems={"center"} height={"100%"}
        sx={{
            overflowY:"auto",
            "&::-webkit-scrollbar":{
                display:"none"
            },
            padding:{
                xs:"5px",
                md:"10px"
            },

            backgroundColor:"white"
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

                                            <CustomTextField
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                label="Username"
                                                fullWidth
                                                margin="normal"
                                            />
                                            <CustomTextField
                                                value={bio}
                                                onChange={(e) => setBio(e.target.value)}
                                                label="Bio"
                                                margin="normal"
                                                fullWidth
                                            />
                                            
                                             <CustomTextField
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                label="Name"
                                                fullWidth
                                                margin="normal"
                                            />
                                            <CustomTextField
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                label=" New Password ?"
                                                type='password'
                                                margin="normal"
                                                fullWidth
                                            />

            <Button onClick={updateProfile}
            sx={{
                backgroundColor:"black",
                color:"white",
                borderRadius:"2rem",
                height:"2.5rem",
                width:"2.5rem",
            }}
            >
                <Lock />
            </Button>

    </Stack>
     :
        <Stack spacing={"2rem"} direction={"column"} alignItems={"center"} height={"100%"}
        sx={{
            overflowY:"auto",
            "&::-webkit-scrollbar":{
                display:"none"
            },
        }}
        >
            <Avatar src={user.avatar.url}
                sx={{
                    width: 200,
                    height: 200,
                    objectFit: "contain",
                    marginBottom: "1rem",
                    border: "5px solid white",
                }}
            />
            <ProfileCard
                heading={"Username"}
                text={user.username}
                Icon={<UserNameIcon />}
            />
            <ProfileCard heading={"Bio"} text={user.bio} />
            <ProfileCard heading={"Name"} text={user.name} Icon={<Person />} />

            <Button onClick={()=>setEdit(true)}
            sx={{
                backgroundColor:"white",
                color:"black",
                borderRadius:"2rem",
                height:"2.5rem",
                width:"2.5rem",
            }}
            >
                <LockOpen />
            </Button>
            
            <ProfileCard
                heading={"Joined"}
                text={moment(user.createdAt).fromNow()}
                Icon={<CalendarIcon />}
            />
        </Stack>
    );
};

const ProfileCard = ({ text, Icon, heading }) => (
    <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        color={"white"}
        textAlign={"center"}
    >
        {Icon && Icon}

        <Stack>
            <Typography variant="body1">{text}</Typography>
            <Typography color={"gray"} variant="caption">
                {heading}
            </Typography>
        </Stack>
    </Stack>
);

const CustomTextField = styled(TextField)({
    "& .MuiInputLabel-root": {
      color: tomato, // Default label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "green", // Focused label color
    },
    backgroundColor:"white",
  });
  

export default Profile;
