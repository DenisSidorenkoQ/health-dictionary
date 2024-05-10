import {Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Theme, useMediaQuery} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import journalService from "../../../service/JournalService";
import lessonService from "../../../service/LessonService";

const AddLessonDialog = (reRenderTableCount: number, setReRenderTableCount: any, theme: Theme, selectedGroupId: number, selectedSubjectId: number) => {
    const [lessonTitle, setLessonTitle] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleOpenAddLessonDialogButton = () => {
        setOpen(true);
    };

    const handleCloseAddLessonDialog = () => {
        setOpen(false);
    };

    const handleSaveLessonButton = async () => {
        if (lessonTitle === "") return;

        const currentTimestamp = Math.floor(Date.now() / 1000);
        const journalBuffer = await journalService.getJournalByGroupId(selectedGroupId);
        await lessonService.saveLesson(journalBuffer.id, selectedSubjectId, lessonTitle, currentTimestamp);

        setLessonTitle("");
        setReRenderTableCount(reRenderTableCount + 1);
        setOpen(false);
    };

    const handleLessonTitleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setLessonTitle(event.target.value);
    }

    if (!selectedSubjectId) return;
    return (
        <>
            <IconButton aria-label="add new lesson" size="large" onClick={handleOpenAddLessonDialogButton}>
                <AddCircleOutlineIcon fontSize="inherit"/>
            </IconButton>
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleCloseAddLessonDialog}
                    aria-labelledby="dialog-title"
                >
                    <DialogTitle id="dialog-title">
                        {"Creating a new lesson"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lessonTitle"
                            label="lesson title"
                            name="lessonTitle"
                            value={lessonTitle}
                            onChange={handleLessonTitleChange}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSaveLessonButton}>
                            Save
                        </Button>
                        <Button onClick={handleCloseAddLessonDialog} autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default AddLessonDialog;
