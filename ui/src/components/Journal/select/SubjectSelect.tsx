import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import * as React from "react";
import {Subject} from "../../../model/SubjectState";


const SubjectSelect = (subjectList: Array<Subject>, selectedSubjectId: number, setSelectedSubjectId: any) => {
    const handleSubjectChange = (event: SelectChangeEvent) => {
        const subjectId = parseInt(event.target.value);

        setSelectedSubjectId(subjectId);
    };

    if (subjectList.length === 0) return;
    return (
        <div>
            <FormControl sx={{m: 1, minWidth: 80}}>
                <InputLabel id="Subjects">Subjects</InputLabel>
                <Select
                    labelId="Subjects"
                    id="Subjects"
                    value={selectedSubjectId.toString()}
                    onChange={handleSubjectChange}
                    label="Subjects"
                    sx={{width: 300}}
                >
                    {
                        subjectList.map((subject) => (
                            <MenuItem value={subject.id}>{subject.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    )
};

export default SubjectSelect;
