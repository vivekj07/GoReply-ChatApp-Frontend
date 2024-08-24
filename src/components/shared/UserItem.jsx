import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";

const UserItem = ({
    user,
    handler,
    handlerIsLoading = false,
    isAdded = false,
    styling = {},
}) => {
    const { name, _id, avatar } = user;

    return (
        <ListItem>
            <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={"1rem"}
                width={"100%"}
                sx={{
                    ...styling
                }}
            >
                <Avatar
                    src={avatar} />

                <Typography
                    variant="body1"
                    sx={{
                        flexGlow: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        width: "100%",
                    }}
                >
                    {name}
                </Typography>

                <IconButton
                    size="small"
                    sx={{
                        bgcolor: isAdded ? "error.main" : "primary.main",
                        color: "white",
                        "&:hover": {
                            bgcolor: isAdded ? "error.dark" : "primary.dark",
                        },
                    }}
                    onClick={() => { handler(_id) }}
                    disabled={handlerIsLoading}
                >
                    {isAdded ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
            </Stack>
        </ListItem>
    );
};

export default memo(UserItem);
