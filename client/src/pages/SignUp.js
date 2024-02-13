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

const defaultTheme = createTheme();

export default function SignUp() {
    const [registrationStatus, setRegistrationStatus] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });

            if (response.ok) {
                setRegistrationStatus('Регистрация прошла успешно.');

                let dots = '';
                const interval = setInterval(() => {
                    setRegistrationStatus('Регистрация прошла успешно.\nПереводим на страницу авторизации' + dots);
                    dots += '.';
                }, 400);
                setTimeout(() => {
                    clearInterval(interval);
                    window.location.href = '/login';
                }, 1800);
            } else {
                setRegistrationStatus('Регистрация не удалась. Проверьте, нет ли пустых полей. Вероятно, аккаунт с авшим именем уже занят.');
            }
        } catch (error) {
            setRegistrationStatus('Регистрация не удалась: ' + error );
            console.log('Регистрация не удалась', error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>.
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
                Регистрация
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="name"
                        label="Имя"
                        name="name"
                        autoComplete="name"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Зарегистрироваться
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                    <Link href="/login" variant="body2">
                        Уже есть аккаунт? Войти
                    </Link>
                    </Grid>
                </Grid>
                {registrationStatus && (
                    <Typography style={{ color: registrationStatus.includes('успешно') ? 'green' : 'red' }}>
                        {registrationStatus}
                    </Typography>
                )}
                </Box>
            </Box>
            </Container>
        </ThemeProvider>
    );
};