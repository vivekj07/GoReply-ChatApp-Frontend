import { Search as SearchIcon } from "@mui/icons-material";
import {
    Box,
    Dialog,
    DialogTitle,
    InputAdornment,
    List,
    Skeleton,
    Stack,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCustomMutation, useErrors } from "../../hooks/hooks";
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../../redux/api/api";
import UserItem from "../shared/UserItem";

const Search = ({ isSearch, handleClose }) => {

    const [search, setSearch] = useState("")
    const [searchUsers, { data, isError, error, isLoading }] = useLazySearchUserQuery()
    const [sendRequest, isLoadingSendFriendRequest] = useCustomMutation(useSendFriendRequestMutation)


    useEffect(() => {
        const id = setTimeout(() => {
            searchUsers(search)
        }, 500)

        return () => {
            clearTimeout(id)
        }
    }, [search])

    useErrors([{ isError, error }])

    const addFriendHandler = async (id) => {
        await sendRequest("Sending request...", { id })
    }



    return (
        <Dialog open={isSearch} onClose={handleClose}>
            <Stack direction={"column"}
                sx={{
                    padding: {
                        xs: "1rem",
                        sm: "2rem"
                    },
                    width: {
                        xs: "20rem",
                        sm: "25rem"
                    },
                    position: "relative"

                }}>
                <Box
                    sx={{
                        width: "100%",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        padding: "16px 0",
                        backgroundColor: "white",
                    }}
                >
                    <DialogTitle textAlign={"center"}>Find Your Friends</DialogTitle>
                    <TextField
                        label=""
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            width: "100%",
                        }}


                    />

                </Box>

                <List>
                    {
                        isLoading ? <Skeleton /> :
                            data?.users?.map((i) => (
                                <UserItem
                                    user={i}
                                    key={i._id}
                                    handler={addFriendHandler}
                                    handlerIsLoading={isLoadingSendFriendRequest}
                                />
                            ))}
                </List>
            </Stack>
        </Dialog>
    )
}

export default Search