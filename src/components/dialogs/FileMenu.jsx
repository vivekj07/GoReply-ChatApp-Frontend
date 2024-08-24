import { ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFileMenu } from '../../redux/reducers/misc'
import { AudioFile, Image, UploadFile, VideoFile } from '@mui/icons-material'
import { useSendAttachmentsMutation } from '../../redux/api/api'
import toast from 'react-hot-toast'

const FileMenu = ({ anchorEl, chatId }) => {
    const { isFileMenu } = useSelector((state) => (state.misc))
    const dispatch = useDispatch()
    const [sendAttachments] = useSendAttachmentsMutation()

    const closeHandler = () => {
        dispatch(setIsFileMenu(false))
    }

    const fileChangeHandler = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length <= 0) return
        if (files.length > 10) {
            return toast.error("Maximum file limit is 10")

        }

        const toastId = toast.loading("Sending files...")
        closeHandler()
        try {
            const formdata = new FormData()
            formdata.append("chatId", chatId)
            files.forEach((file) => {
                formdata.append("files", file)
            })



            const res = await sendAttachments(formdata)

            if (res.data) {
                toast.success("Sent Successfully", { id: toastId })
            } else {
                toast.error(res.error?.data?.message || "Error in Sending Files", { id: toastId })
            }
        } catch (err) {
            console.log(err)
            toast.error(err?.message || "Error in Sending Files", { id: toastId })

        }
    }

    return (
        <Menu anchorEl={anchorEl} open={isFileMenu} onClose={closeHandler}

        >
            <MenuList
                sx={{
                    width: "8rem",

                }}>
                <MenuItem
                    component="label"
                >
                    <ListItemIcon>
                        <Image />
                    </ListItemIcon>
                    <ListItemText>
                        Image
                    </ListItemText>
                    <input
                        type='file'
                        accept='image/*'
                        multiple
                        style={{
                            display: "none"
                        }}
                        onChange={fileChangeHandler}
                    />

                </MenuItem>
                <MenuItem
                    component="label"
                >
                    <ListItemIcon>
                        <AudioFile />
                    </ListItemIcon>
                    <ListItemText>
                        Audio
                    </ListItemText>
                    <input
                        type='file'
                        accept='audio/*'
                        onChange={fileChangeHandler}
                        style={{
                            display: "none"
                        }}
                    />
                </MenuItem>
                <MenuItem
                    component="label"
                >
                    <ListItemIcon>
                        <VideoFile />
                    </ListItemIcon>
                    <ListItemText>
                        Video
                    </ListItemText>
                    <input
                        type='file'
                        accept='video/*'
                        onChange={fileChangeHandler}
                        style={{
                            display: "none"
                        }}
                    />
                </MenuItem>
                <MenuItem
                    component="label"
                >
                    <ListItemIcon>
                        <UploadFile />
                    </ListItemIcon>
                    <ListItemText>
                        File
                    </ListItemText>
                    <input
                        type='file'
                        accept='*'
                        onChange={fileChangeHandler}
                        style={{
                            display: "none"
                        }}
                    />
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default FileMenu