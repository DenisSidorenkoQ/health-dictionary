import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Alert, AlertColor, AlertTitle, Link} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSessionStore} from "../../store";
import authorizationService from "../../service/AuthorizationService";

const theme = createTheme();

const RegistrationPage = () => {
    const infoAlertType = "info" as AlertColor;
    const warningAlertType = "warning" as AlertColor;
    const successAlertType = "success" as AlertColor;

    const [alertType, setAlertType] = React.useState(infoAlertType);
    const [alertText, setAlertText] = React.useState('Введите данные');
    const [alertTitle, setAlertTitle] = React.useState('Info');

    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigate = useNavigate();

    const authorize = useSessionStore(state => state.authorize)

    const handleLoginChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setLogin(event.target.value);
    }

    const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const registrationStatus = authorizationService.registration(login, password);
        console.log(registrationStatus);
        await handleAlert(await registrationStatus);
    };

    const handleToAuthorizationLink = () => {
        navigate("/login")
    }

    const handleAlert = async (status: number) => {
        if (status === 200) {
            await authorize({login, password});

            setAlertType(successAlertType);
            setAlertTitle('Success');
            setAlertText('Пользователь создан');
            navigate('/menu');
            return;
        } else {
            setAlertType(warningAlertType);
            setAlertTitle('Warning');
            setAlertText('Пользователь уже существует');
            return;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end'
            }}
            >
            </Box>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <PersonIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Регистрация
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            label="Логин"
                            name="login"
                            autoComplete="current-login"
                            autoFocus
                            value = {login}
                            onChange={handleLoginChange}
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
                            value = {password}
                            onChange={handlePasswordChange}
                        />
                        <Alert severity={alertType}>
                            <AlertTitle>{alertTitle}</AlertTitle>
                            <strong>{alertText}</strong>
                        </Alert>
                        <Link sx={{ cursor: 'pointer' }} onClick={handleToAuthorizationLink}>
                            Перейти на страницу авторизации
                        </Link>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Зарегистрироваться
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default RegistrationPage;
