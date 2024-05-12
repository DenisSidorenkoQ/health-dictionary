import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from "@mui/material/Box";
import PhysicalActivityButton from "../../components/Menu/button/PhysicalActivityButton";
import './Menu.css';
import DietButton from "../../components/Menu/button/DietButton";
import DoctorVisitButton from "../../components/Menu/button/DoctorVisitButton";

const theme = createTheme();


const UserMenuPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box style={{
                position: 'absolute', left: '30%', top: '40%', display: 'flex'
            }}>
                <div className="gridContainer">
                    <div className="gridElement">
                        {PhysicalActivityButton()}
                    </div>
                    <div className="gridElement">
                        {DietButton()}
                    </div>
                    <div className="gridElement">
                        {DoctorVisitButton()}
                    </div>
                </div>
            </Box>
        </ThemeProvider>
    );
};

export default UserMenuPage;
