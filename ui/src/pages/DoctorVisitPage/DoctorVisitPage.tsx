import {createTheme, ThemeProvider} from "@mui/material/styles";
import * as React from "react";
import {useSessionStore} from "../../store";
import {UserInfo} from "../../model/UserState";
import {useEffect} from "react";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Container from "@mui/material/Container";
import {Switch} from "@mui/material";

const theme = createTheme();

const DoctorVisitPage = () => {
    let user = useSessionStore(state => state.user);

    const [userInfo, setUserInfo] = React.useState<UserInfo>();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {

    }, [user]);

    function createData(
        name: string,
        description: string,
        doctorName: string,
        date: string,
        isNotified: boolean,
    ) {
        return {
            name,
            doctorName,
            date,
            isNotified,
            description,
        };
    }

    const rows = [
        createData('Офтальмолог', "Посещение врача офтальмолога", 'Иван Сидоров', "01-05-2024 13:36:11", true),
        createData('Зубной', 'Не забыть посетить', 'Денис Иванович', "11-07-2024 08:36:11", true),
        createData('Хирург', '', 'Герман Александрович', "11-07-2024 16:36:11", true),
    ];

    return (
        <ThemeProvider theme={theme}>
            <h1>Посещение врачей</h1>
            <CollapsibleTable/>
        </ThemeProvider>
    );

    function Row(props: { row: ReturnType<typeof createData> }) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell>{row.doctorName}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                        <Switch checked={row.isNotified} name="notification"/>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Описание
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                    </TableHead>
                                    <TableBody>
                                        {row.description}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    function CollapsibleTable() {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Врач</TableCell>
                            <TableCell>ФИО врача</TableCell>
                            <TableCell>Дата</TableCell>
                            <TableCell>Уведомлять</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default DoctorVisitPage;
