import React,{useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../components/Copyright';

import AuthService from "../services/auth_service"





export default function SignIn(props) {
  const theme = createTheme();
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  let [e_or_u, setE_or_u] = useState("");
  let [password, setPassword] = useState("");
  // let [message, setMessage] = useState("");
  const handleChangeE_or_u = (e) => {
    setE_or_u(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSignin = () => {
    AuthService.signin(e_or_u, password)
      .then((response) => {
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        window.alert(
          "Login successfully, you are now redirected to the profile page."
        );
        setCurrentUser(AuthService.getCurrentUser());
        
        navigate("/")
      })
      .catch((error) => {
        alert(error.response.data)
        // setMessage(error.response.data);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email/Username  "
              name="email_or_username"
              autoFocus
              onChange={handleChangeE_or_u}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChangePassword}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor:'#CAE5BC'}}
              onClick={handleSignin}
              >
              Sign In
            </Button>
            <Grid container>

              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}