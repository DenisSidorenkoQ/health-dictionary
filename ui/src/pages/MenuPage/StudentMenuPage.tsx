import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from "@mui/material/Box";
import JournalButton from "../../components/Menu/button/JournalButton";
import ProfileButton from "../../components/Menu/button/ProfileButton";
import './Menu.css';

const theme = createTheme();


const StudentMenuPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box style={{
                position: 'absolute', left: '30%', top: '40%', display: 'flex'
            }}>
                <div className="gridContainer">
                    <div className="gridElement">
                        {JournalButton()}
                    </div>
                    <div className="gridElement">
                        {ProfileButton()}
                    </div>
                </div>

            </Box>

        </ThemeProvider>
    );
};

export default StudentMenuPage;
