import { FileOpen } from '@mui/icons-material'
import React from 'react'
import { transformImage } from '../../features/features'

const RenderAttachment = ({ url, file }) => {


    if (file == "image") {
        return <img src={transformImage(url, 200)}
            alt="Attachement"
            width={"200px"}
            height={"150px"}
            style={{
                objectFit: "contain",
            }}
        ></img>
    } else if (file == "audio") {
        return <audio src={url} preload="none" controls></audio>
    } else if (file == "video") {
        return <video src={url} preload="none" width={"200px"} controls></video>
    } else {
        return <FileOpen />

    }
}
export default RenderAttachment