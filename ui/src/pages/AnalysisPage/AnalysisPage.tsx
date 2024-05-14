import {createTheme, ThemeProvider} from "@mui/material/styles";
import * as React from "react";
import {useSessionStore} from "../../store";
import {useEffect} from "react";
import {
    Container,
} from '@mui/material';

const theme = createTheme();

const AnalysisPage = () => {
    let user = useSessionStore(state => state.user);

    useEffect(() => {
    }, [user]);

    return (
        <ThemeProvider theme={theme}>
            <h1 className='AnalysisHeader'>Анализ данных</h1>
            <Container maxWidth="sm">
            </Container>
        </ThemeProvider>
    );
}

export default AnalysisPage;
