import * as React from "react";
import {blue, grey} from "@mui/material/colors";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';

const DietButton = () => {
    let navigate = useNavigate();

    const handleDietButton = () => {
        navigate('/note/diet');
    };

    return (
        <Button
            type="submit"
            variant="outlined"
            sx={{bgcolor: blue[500], color: grey[900]}}
            size={"large"}
            onClick={handleDietButton}
        >
            <BakeryDiningIcon style={{width: '100%', height: '100%'}}/>
        </Button>
    )
}

export default DietButton;
