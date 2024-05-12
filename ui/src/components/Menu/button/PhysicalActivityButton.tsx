import * as React from "react";
import {blue, grey} from "@mui/material/colors";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const PhysicalActivityButton = () => {
    let navigate = useNavigate();

    const handlePhysicalActivityButton = () => {
        navigate('/note/physicalActivity');
    };

    return (
        <Button
            type="submit"
            variant="outlined"
            sx={{bgcolor: blue[500], color: grey[900]}}
            size={"large"}
            onClick={handlePhysicalActivityButton}
        >
            <DirectionsRunIcon style={{width: '100%', height: '100%'}}/>
        </Button>
    )
}

export default PhysicalActivityButton;
