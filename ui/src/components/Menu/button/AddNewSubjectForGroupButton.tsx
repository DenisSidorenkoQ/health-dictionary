import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {blue, grey} from "@mui/material/colors";
import AttachmentIcon from '@mui/icons-material/Attachment';
import * as React from "react";

const AddNewSubjectForGroupButton = () => {
    let navigate = useNavigate();

    const handleAddNewSubjectForGroupButton = () => {
        navigate('/admin-panel/connection/group-subject-teacher');
    };

    return (
        <Button
            type="submit"
            variant="outlined"
            sx={{bgcolor: blue[500], color: grey[900]}}
            size={"large"}
            onClick={handleAddNewSubjectForGroupButton}
        >
            <AttachmentIcon style={{width: '100%', height: '100%'}}/>
        </Button>
    )
}

export default AddNewSubjectForGroupButton;
