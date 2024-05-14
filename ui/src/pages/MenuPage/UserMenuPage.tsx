import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from "@mui/material/Box";
import PhysicalActivityButton from "../../components/Menu/button/PhysicalActivityButton";
import './Menu.css';
import FoodDietButton from "../../components/Menu/button/FoodDietButton";
import DoctorVisitButton from "../../components/Menu/button/DoctorVisitButton";
import AnalysisButton from "../../components/Menu/button/AnalysisButton";

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
                        <span>Физическая активность</span>
                    </div>
                    <div className="gridElement">
                        {FoodDietButton()}
                        <span>Питание</span>
                    </div>
                    <div className="gridElement">
                        {DoctorVisitButton()}
                        <span>Посещение врачей</span>
                    </div>
                    <div className="gridElement">
                        {AnalysisButton()}
                        <span>Анализ данных</span>
                    </div>
                </div>
            </Box>
        </ThemeProvider>
    );
};

export default UserMenuPage;
