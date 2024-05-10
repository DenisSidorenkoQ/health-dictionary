import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from "@mui/material/Box";
import JournalButton from "../../components/Menu/button/JournalButton";
import './Menu.css';

const theme = createTheme();


const TeacherMenuPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box style={{
                position: 'absolute', left: '40%', top: '40%', display: 'flex'
            }}>
                <div className="gridContainer">
                    <div className="gridElement">
                        {JournalButton()}
                    </div>
                </div>
            </Box>

        </ThemeProvider>
    );
};

export default TeacherMenuPage;
