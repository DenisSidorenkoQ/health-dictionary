import * as React from "react";
import {blue, grey} from "@mui/material/colors";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const DoctorVisitButton = () => {
    let navigate = useNavigate();

    const handleDoctorVisitButton = () => {
        navigate('/note/doctor-visit');
    };

    return (
        <Button
            type="submit"
            variant="outlined"
            sx={{bgcolor: blue[500], color: grey[900]}}
            size={"large"}
            onClick={handleDoctorVisitButton}
        >
            <LocalHospitalIcon style={{width: '100%', height: '100%'}}/>
        </Button>
    )
}

export default DoctorVisitButton;
