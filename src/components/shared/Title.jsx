import React from 'react'
import { Helmet } from "react-helmet-async"

const Title = ({
    title = "GoReply.",
    description = "Chat Happily"
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" description={description}></meta>
        </Helmet>
    )
}

export default Title