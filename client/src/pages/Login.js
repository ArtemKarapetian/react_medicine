import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useAuth } from '../AuthContext';

const defaultTheme = createTheme();

export default function Login() {
    const [loginStatus, setLoginStatus] = useState('');
    const { isLoggedin, login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });

            if (response.ok) {
                setLoginStatus('Вы успешно авторизовались.');
                login();
                
                window.localStorage.setItem('username', name);

                let dots = '';
                const interval = setInterval(() => {
                    setLoginStatus('Вы успешно авторизовались.\nПереводим на главную страницу' + dots);
                    dots += '.';
                }, 400);
                setTimeout(() => {
                    clearInterval(interval);
                    window.location.href = '/';
                }, 1800);
            } else {
                setLoginStatus('Авторизация не удалась. Перепроверьте введённые данные.');
            }
        } catch (error) {
            setLoginStatus('Авторизация не удалась: ' + error );
            console.log('Авторизация не удалась', error);
        }
    };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Войти
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Имя"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Войти
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Нет аккаунта? Зарегистрируйся!"}
                </Link>
              </Grid>
              {loginStatus && (
                    <Typography style={{ color: loginStatus.includes('успешно') ? 'green' : 'red' }}>
                        {loginStatus}
                    </Typography>
                )}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}