import { Typography, Stack, Box } from '@mui/material';
import moment from 'moment';
import React, { memo } from 'react'
import RenderAttachment from './RenderAttachment';
import { fileFormatReader } from "../../features/features"
import { motion } from "framer-motion"

const Meassage = ({ message, user }) => {
    const { sender, content, attachments = [], createdAt } = message
    const sameSender = sender?._id === user?._id;
    return (

        <motion.div
            initial={{
                opacity: 0,
                x: "-100%"
            }}
            whileInView={{
                opacity: 1,
                x: 0
            }}
            style={{
                alignSelf: sameSender ? "end" : 'start',
                padding: "1rem",
                gap: "0.3rem",
                borderRadius: "10px",
                backgroundColor: "white",
                // width: "fit-content",

            }}>
            {
                !sameSender && (
                    <Typography variant="caption" color={"rgb(198, 61, 219)"}>{sender.name}</Typography>
                )
            }
            {
                content && (
                    <Typography>{content}</Typography>
                )
            }

            {
                attachments.length > 0 &&
                attachments.map((attachment) => {
                    const url = attachment.url;
                    const file = fileFormatReader(url)
                    return (
                        <Box key={attachment.public_id}>
                            <a
                                href={url}
                                target='_blanck'
                                download
                                style={{
                                    color: "black",
                                }}
                            >
                                <RenderAttachment url={url} file={file} />
                            </a>
                        </Box>
                    )
                })
            }

            <Typography variant='caption'>{moment(createdAt).fromNow()}</Typography>


        </motion.div>

    )
}

export default memo(Meassage) 