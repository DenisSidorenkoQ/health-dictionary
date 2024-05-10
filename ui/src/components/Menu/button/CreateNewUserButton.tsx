import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {blue, grey} from "@mui/material/colors";
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import * as React from "react";

const CreateNewUserButton = () => {
    let navigate = useNavigate();

    const handleJournalButton = () => {
        navigate('/admin-panel/create/user');
    };

    return (
        <Button
            type="submit"
            variant="outlined"
            sx={{bgcolor: blue[500], color: grey[900]}}
            size={"large"}
            onClick={handleJournalButton}
        >
            <PersonAddRoundedIcon style={{width: '100%', height: '100%'}}/>
        </Button>
    )
}

export default CreateNewUserButton;
