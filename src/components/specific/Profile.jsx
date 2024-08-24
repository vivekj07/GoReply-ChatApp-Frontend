import {
    CalendarMonth as CalendarIcon,
    Face as FaceIcon,
    Person,
    AlternateEmail as UserNameIcon,
} from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";

const Profile = ({ user }) => {
    return (
        <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
            <Avatar src={user.avatar.url}
                sx={{
                    width: 200,
                    height: 200,
                    objectFit: "contain",
                    marginBottom: "1rem",
                    border: "5px solid white",
                }}
            />
            <ProfileCard heading={"Bio"} text={user.bio} />
            <ProfileCard
                heading={"Username"}
                text={user.username}
                Icon={<UserNameIcon />}
            />
            <ProfileCard heading={"Name"} text={user.name} Icon={<Person />} />
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

export default Profile;
