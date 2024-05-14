import {createTheme, ThemeProvider} from "@mui/material/styles";
import * as React from "react";
import {useSessionStore} from "../../store";
import './Profile.css'
import {UserInfo} from "../../model/UserState";
import {useEffect} from "react";
import userService from "../../service/UserService";
import {
    Button,
    Avatar,
    Typography,
    Container,
    Grid,
    Paper,
    MenuItem,
    FormControlLabel,
    Switch,
    FormGroup
} from '@mui/material';
import TextField from "@mui/material/TextField";
import {blue, deepPurple} from "@mui/material/colors";
import authorizationService from "../../service/AuthorizationService";

const theme = createTheme();

const UserProfilePage = () => {
    let user = useSessionStore(state => state.user);

    const [userInfo, setUserInfo] = React.useState<UserInfo>();
    const [bufferUserInfo, setBufferUserInfo] = React.useState<UserInfo>();
    const [startChange, setStartChange] = React.useState<Boolean>(false);

    useEffect(() => {
        userService.getUserByUserId(user?.id).then(userInfo => {
            setUserInfo(userInfo)
            setBufferUserInfo(userInfo);
        });
    }, [user]);

    const handleChange = (event: { preventDefault: () => void; }) => {
        if (startChange) {
            authorizationService.updateUserInfo(bufferUserInfo);
            setUserInfo(bufferUserInfo);
            setStartChange(false);
        } else {
            setBufferUserInfo(userInfo);
            setStartChange(true);
        }
    };

    const sexItems = [
        {
            value: 'Мужчина'
        },
        {
            value: 'Женщина'
        },
    ];

    const physicalActivityItems = [
        {
            value: 'Сидячий образ без нагрузок'
        },
        {
            value: 'Тренировки 1-3 дней в неделю'
        },
        {
            value: 'Занятия 3-5 дней в неделю'
        },
        {
            value: 'Занятия 6 дней в неделю'
        },
        {
            value: 'Занятия 7 дней в неделю'
        },
    ];

    return (
        <ThemeProvider theme={theme}>
            <h1 className='DoctorVisitHeader'>Профиль пользователя</h1>
            <Container maxWidth="sm">
                <Paper elevation={4} style={{ padding: '16px' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Avatar sx={{ bgcolor: deepPurple[500] }}>{userInfo?.login[0]}</Avatar>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4">{userInfo?.login}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                Почта: {
                                startChange
                                    ? <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        value={bufferUserInfo?.mail}
                                        size="small"
                                        onChange={event => {
                                            let mailStr: string | undefined = event.target.value;
                                            const updatedUserInfo : UserInfo = {
                                                ...bufferUserInfo,
                                                mail: mailStr,
                                            } as UserInfo;
                                            setBufferUserInfo(updatedUserInfo);
                                        }}
                                    />
                                    : userInfo?.mail
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                Пол: {
                                startChange
                                    ? <TextField
                                        id="outlined-select-currency"
                                        select
                                        label={bufferUserInfo?.sex}
                                        helperText="Пожалуйста выберите свой пол"
                                        onChange={event => {
                                            let sexStr: string | undefined = event.target.value;
                                            const updatedUserInfo : UserInfo = {
                                                ...bufferUserInfo,
                                                sex: sexStr,
                                            } as UserInfo;
                                            setBufferUserInfo(updatedUserInfo);
                                        }}
                                    >
                                        {sexItems.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    : userInfo?.sex
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                Возраст: {
                                startChange
                                    ? <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        value={bufferUserInfo?.age}
                                        size="small"
                                        onChange={event => {
                                            let ageNum: number | undefined = Number(event.target.value);
                                            const updatedUserInfo : UserInfo = {
                                                ...bufferUserInfo,
                                                age: ageNum,
                                            } as UserInfo;
                                            setBufferUserInfo(updatedUserInfo);
                                        }}
                                    />
                                    : userInfo?.age + " лет"
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                Рост: {
                                startChange
                                    ? <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        value={bufferUserInfo?.height}
                                        size="small"
                                        onChange={event => {
                                            let heightNum: number | undefined = Number(event.target.value);
                                            const updatedUserInfo : UserInfo = {
                                                ...bufferUserInfo,
                                                height: heightNum,
                                            } as UserInfo;
                                            setBufferUserInfo(updatedUserInfo);
                                        }}
                                    />
                                    : userInfo?.height + " см"
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                Вес: {
                                startChange
                                    ? <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        value={bufferUserInfo?.weight}
                                        size="small"
                                        onChange={event => {
                                            let weightNum: number | undefined = Number(event.target.value);
                                            const updatedUserInfo : UserInfo = {
                                                ...bufferUserInfo,
                                                weight: weightNum,
                                            } as UserInfo;
                                            setBufferUserInfo(updatedUserInfo);
                                        }}
                                    />
                                    : userInfo?.weight + " кг"
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                Вид физической активности: {
                                startChange
                                    ? <TextField
                                        id="outlined-select-currency"
                                        select
                                        label={bufferUserInfo?.physicalActivity}
                                        helperText="Пожалуйста выберите вид своей физической активности"
                                        onChange={event => {
                                            let physicalActivityStr: string | undefined = event.target.value;
                                            const updatedUserInfo : UserInfo = {
                                                ...bufferUserInfo,
                                                physicalActivity: physicalActivityStr,
                                            } as UserInfo;
                                            setBufferUserInfo(updatedUserInfo);
                                        }}
                                    >
                                        {physicalActivityItems.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    : userInfo?.physicalActivity
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                {
                                startChange
                                    ? <FormControlLabel
                                        control={
                                            <Switch checked={bufferUserInfo?.isNotify} name="notification" onChange={event => {
                                                let isNotifyValue: boolean | undefined = Boolean(event.target.checked);
                                                const updatedUserInfo : UserInfo = {
                                                    ...bufferUserInfo,
                                                    isNotify: isNotifyValue,
                                                } as UserInfo;
                                                setBufferUserInfo(updatedUserInfo);
                                            }} />
                                        }
                                        label="Отправка уведомлений"
                                      />
                                    : (userInfo?.isNotify ? "Уведомления включены" : "Уведомления отключены")
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={handleChange}>
                                {startChange ? "Сохранить изменения" : "Изменить профиль"}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default UserProfilePage;
