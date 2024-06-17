import * as React from 'react';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Dialog, DialogActions, DialogContent, DialogTitle, IconButton, useMediaQuery} from "@mui/material";
import {useSessionStore} from "../../store";
import {PhysicalActivity} from "../../model/PhysicalActivityState";
import {UserDiet} from "../../model/DietState";
import {useEffect} from "react";
import physicalActivityService from "../../service/PhysicalActivityService";
import dietService from "../../service/DietService";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Button from "@mui/material/Button";

const theme = createTheme();

interface Column {
    id: 'foodName' | 'calories' | 'date';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'foodName', label: 'Название еды', minWidth: 170 },
    { id: 'calories', label: 'Калории (ккал)', minWidth: 100 },
    { id: 'date', label: 'Дата приема пищи', minWidth: 100 },
];

interface Data {
    foodName: string;
    calories: number;
    date: string;
}

function createData(
    foodName: string,
    calories: number,
    date: string,
): Data {
    return { foodName, calories, date };
}

let rows: Data[] = [];

export default function StickyHeadTable() {
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    let user = useSessionStore(state => state.user);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [startDate, setStartDate] = React.useState<string>();
    const [endDate, setEndDate] = React.useState<string>();
    const [physicalActivityList, setPhysicalActivityList] = React.useState<PhysicalActivity[]>([]);
    const [userDietList, setUserDietList] = React.useState<UserDiet[]>([]);

    const [physicalActivityDialogOpen, setPhysicalActivityDialogOpen] = React.useState(false);
    const [newActivityType, setNewActivityType] = React.useState<string>("");
    const [newActivityTime, setNewActivityTime] = React.useState<number>(0);
    const [newActivityDate, setNewActivityDate] = React.useState<string>("")

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        let date: Date = new Date();
        let dateTimeStr: string = date.getFullYear().toString()+"-"+((date.getMonth()+1).toString().length==2?(date.getMonth()+1).toString():"0"+(date.getMonth()+1).toString())+"-"+(date.getDate().toString().length==2?date.getDate().toString():"0"+date.getDate().toString())+" "+(date.getHours().toString().length==2?date.getHours().toString():"0"+date.getHours().toString())+":"+((parseInt(String(date.getMinutes() / 5))*5).toString().length==2?(parseInt(String(date.getMinutes() / 5))*5).toString():"0"+(parseInt(String(date.getMinutes() / 5))*5).toString())+":00";
        let monthStr;
        let dayStr;
        if (date.getMonth() < 10) {
            monthStr = "0" + (date.getMonth() + 1);
        } else {
            monthStr = (date.getMonth() + 1);
        }
        if (date.getDate() < 10) {
            dayStr = "0" + date.getDate();
        } else {
            dayStr = date.getDate();
        }
        let dateStr: string = date.getFullYear() + "-" + monthStr + "-" + dayStr;
        setStartDate(dateStr);
        setEndDate(dateStr);
        setNewActivityDate(dateTimeStr);
    }, [user]);

    useEffect(() => {
        dietService.getAllDietByDate(user?.id, startDate, endDate).then(userDiets => {
            setUserDietList(userDiets);
        });
        physicalActivityService.getAllPhysicalActivityByDate(user?.id, startDate, endDate).then(physicalActivitys => {
            setPhysicalActivityList(physicalActivitys);
        });
    }, [startDate, endDate]);

    useEffect(() => {
        if (physicalActivityList != null && physicalActivityList.length != undefined && physicalActivityList.length > 0) {
            let newRows: Data[] = [];
            for (let i = 0; i < physicalActivityList.length; i++) {
                newRows.push(createData(physicalActivityList[i].activityType, physicalActivityList[i].activityTime, physicalActivityList[i].date));
            }
            rows = newRows;
        } else {
            rows = [];
        }
    }, [physicalActivityList]);

    const handleOpenAddPhysicalActivityDialogButton = () => {
        setPhysicalActivityDialogOpen(true);
    };

    const handleCloseAddPhysicalActivityDialogButton = () => {
        setPhysicalActivityDialogOpen(false);
    };

    const handleSavePhysicalActivityButton = async () => {
        let newActivity: PhysicalActivity;
        // @ts-ignore
        newActivity = {id: null, userId: user?.id, activityType: newActivityType, activityTime: newActivityTime, date: newActivityDate}
        physicalActivityService.saveOrUpdatePhysicalActivity(newActivity)
            .then(response => setPhysicalActivityDialogOpen(false));
    };

    const handlePhysicalActivityTypeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setNewActivityType(event.target.value);
    }

    const handlePhysicalActivityTimeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        let number: number = Number(event.target.value);
        if (!isNaN(number)) {
            setNewActivityTime(number);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <h1 className='PhysicalActivityHeader'>Питание</h1>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <TextField
                        id="date"
                        label="Дата начала"
                        type="date"
                        value={startDate}
                        margin={"normal"}
                        onChange={event => {
                            setStartDate(event.target.value);
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="date"
                        label="Дата окончания"
                        type="date"
                        value={endDate}
                        margin={"normal"}
                        onChange={event => {
                            setEndDate(event.target.value);
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.length > 0 ? rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.foodName}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                }) : null
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <IconButton aria-label="add new lesson" size="large" onClick={handleOpenAddPhysicalActivityDialogButton}>
                    <AddCircleOutlineIcon fontSize="inherit"/>
                </IconButton>
                <div>
                    <Dialog
                        fullScreen={fullScreen}
                        open={physicalActivityDialogOpen}
                        onClose={handleCloseAddPhysicalActivityDialogButton}
                        aria-labelledby="dialog-title"
                    >
                        <DialogTitle id="dialog-title">
                            {"Создание новой активности"}
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="FoodName"
                                label="Название еды"
                                name="FoodName"
                                value={newActivityType}
                                onChange={handlePhysicalActivityTypeChange}/>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="Calories"
                                label="Калории"
                                name="Calories"
                                value={newActivityTime}
                                onChange={handlePhysicalActivityTimeChange}/>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Дата приема пищи"
                                    value={dayjs(newActivityDate)}
                                    onChange={(newValue) => {
                                        if (newValue != null) {
                                            let d: Date = newValue.toDate();
                                            let date: string = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(String(d.getMinutes() / 5))*5).toString().length==2?(parseInt(String(d.getMinutes() / 5))*5).toString():"0"+(parseInt(String(d.getMinutes() / 5))*5).toString())+":00";
                                            setNewActivityDate(date);
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleSavePhysicalActivityButton}>
                                Сохранить
                            </Button>
                            <Button onClick={handleCloseAddPhysicalActivityDialogButton} autoFocus>
                                Отменить
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Paper>
        </ThemeProvider>
    );
}