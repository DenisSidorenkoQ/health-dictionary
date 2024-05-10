
import {Alert, AlertColor, AlertTitle} from "@mui/material";
import * as React from "react";

const CustomAlert = (alertState: boolean, alertType: AlertColor, alertTitle: string, alertText: string) => {
    if(!alertState) return;
    return (
        <Alert severity={alertType}>
            <AlertTitle>{alertTitle}</AlertTitle>
            <strong>{alertText}</strong>
        </Alert>
    )
}

export default CustomAlert;
