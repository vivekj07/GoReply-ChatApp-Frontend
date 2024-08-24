import { Avatar, AvatarGroup, Box, Stack } from '@mui/material'
import React from 'react'

const AvatarCard = ({ avatar = [], max = 5 }) => {
    return (
        <Stack direction={"row"} spacing={"0.5rem"} height={"3rem"}

            sx={{
                width: avatar.length > 2 ? "5rem" : "3rem"
            }}>
            <AvatarGroup max={max} width={"auto"}

                sx={{
                    position: "relative",
                    // backgroundColor: "green",
                    width: "3rem",
                    height: "3rem",

                }}>
                {/* <Box width={"5rem"} height={"3rem"}> */}
                {
                    avatar.map((src, ind) => (
                        <Avatar

                            key={ind}
                            src={src}
                            sx={{
                                width: "3rem",
                                height: "3rem",
                                position: "absolute",
                                left: {
                                    sm: `${ind * 10}px`,
                                    md: `${ind * 15}px`,
                                },
                            }}
                        />
                    ))
                }
                {/* </Box> */}
            </AvatarGroup>
        </Stack>
    )
}

export default AvatarCard


// import { Avatar, AvatarGroup, Stack, Box } from '@mui/material';
// import React from 'react';

// const AvatarCard = ({ avatar = [], max = 2 }) => {
//     return (
//         <Box width="auto" height={"3rem"}>
//             <AvatarGroup max={max} sx={{ justifyContent: "flex-start", position: "relative" }}>
//                 {avatar.map((src, ind) => (
//                     <Avatar
//                         key={ind}
//                         src={src}
//                         sx={{
//                             width: "3rem",
//                             height: "3rem",
//                             position: "absolute",
//                             left: {
//                                 xs: `${ind * 4}px`,
//                                 sm: `${ind * 5}px`,
//                             },
//                         }}
//                     />
//                 ))}
//             </AvatarGroup>
//         </Box>
//     );
// };

// export default AvatarCard;
