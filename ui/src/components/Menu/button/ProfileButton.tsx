import * as React from "react";
import {blue, grey} from "@mui/material/colors";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import {Card, CardContent, CardMedia} from "@mui/material";

const ProfileButton = () => {
    let navigate = useNavigate();

    const handleProfileButton = () => {
        navigate('/profile');
    };

    return (
        <Button
            type="submit"
            variant="outlined"
            sx={{bgcolor: blue[500], color: grey[900]}}
            size={"large"}
            onClick={handleProfileButton}
        >
            <AccountBoxIcon style={{width: '100%', height: '100%'}}/>
        </Button>
    )
}

export default ProfileButton;
