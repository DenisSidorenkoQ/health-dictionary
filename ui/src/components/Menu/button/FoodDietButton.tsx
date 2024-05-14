import * as React from "react";
import {blue, grey} from "@mui/material/colors";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';

const FoodDietButton = () => {
    let navigate = useNavigate();

    const handleFoodDietButton = () => {
        navigate('/note/food-diet');
    };

    return (
        <Button
            type="submit"
            variant="outlined"
            sx={{bgcolor: blue[500], color: grey[900]}}
            size={"large"}
            onClick={handleFoodDietButton}
        >
            <BakeryDiningIcon style={{width: '100%', height: '100%'}}/>
        </Button>
    )
}

export default FoodDietButton;
