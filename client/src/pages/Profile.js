import React from 'react';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';


export default function Profile({currentUser}) {
    const theme = createTheme();
    console.log(currentUser)


  return (
    <>
        <Typography component="h1" variant="h5">
         <h3>UserId: </h3> {currentUser.user._id}
        </Typography>
        <Typography component="h1" variant="h5">
        <h3>UserName: </h3> {currentUser.user.username}
        </Typography>
        <Typography component="h1" variant="h5">
        <h3>Email: </h3> {currentUser.user.email}
        </Typography>
        <Typography component="h1" variant="h5" style={{wordWrap:'break-word'}}>
        <h3>Token: </h3>  <p>{currentUser.token}</p>
        </Typography>
    </>
    )
}
