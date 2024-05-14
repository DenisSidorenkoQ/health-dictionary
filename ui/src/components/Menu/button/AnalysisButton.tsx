import * as React from "react";
import {blue, grey} from "@mui/material/colors";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const AnalysisButton = () => {
    let navigate = useNavigate();

    const handleAnalysisButton = () => {
        navigate('/note/analysis');
    };

    return (
        <Button
            type="submit"
            variant="outlined"
            sx={{bgcolor: blue[500], color: grey[900]}}
            size={"large"}
            onClick={handleAnalysisButton}
        >
            <SearchIcon style={{width: '100%', height: '100%'}}/>
        </Button>
    )
}

export default AnalysisButton;
