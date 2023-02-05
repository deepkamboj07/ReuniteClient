import React from 'react';
import {Typography} from '@mui/material'
const FriendsTitle=({title})=>{
    return(
        <Typography
            sx={{
                textTransform:'uppercase',
                color:'#707376e2',
                fontSize:'12px',
                marginTop:'10px'
            }}
        >
            {title}
        </Typography>
    )
}

export default FriendsTitle;