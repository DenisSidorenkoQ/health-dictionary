import {createTheme, ThemeProvider} from "@mui/material/styles";
import * as React from "react";
import groupService from "../../service/GroupService";
import {useEffect} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Box from "@mui/material/Box";
import {Group} from "../../model/GroupState";
import teacherService from "../../service/TeacherService";
import {Teacher} from "../../model/TeacherState";
import {Subject} from "../../model/SubjectState";
import subjectService from "../../service/SubjectService";
import Button from "@mui/material/Button";

const theme = createTheme();

const AddGroupSubjectPage = () => {
    const [groupList, setGroupList] = React.useState<Group[]>([]);
    const [teacherList, setTeacherList] = React.useState<Teacher[]>([]);
    const [subjectList, setSubjectList] = React.useState<Subject[]>([]);
    const [selectedGroupId, setSelectedGroupId] = React.useState(0);
    const [selectedTeacherId, setSelectedTeacherId] = React.useState(0);
    const [selectedSubjectId, setSelectedSubjectId] = React.useState(0);

    useEffect(() => {
        groupService.getGroupList().then(groups => setGroupList(groups));
    }, []);

    useEffect(() => {
        teacherService.getTeacherList().then(teachers => setTeacherList(teachers));
    }, []);

    useEffect(() => {
        subjectService.getSubjectList().then(subjects => setSubjectList(subjects));
    }, []);

    const handleGroupChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedGroupId(parseInt(event.target.value.toString()));
    }

    const handleTeacherChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedTeacherId(parseInt(event.target.value.toString()));
    }

    const handleSubjectChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedSubjectId(parseInt(event.target.value.toString()));
    }

    const handleAddGroupSubjectButton = () => {
        groupService.addGroupSubject(selectedGroupId, selectedTeacherId, selectedSubjectId);
    }

    return (
        <ThemeProvider theme={theme}>
            <Box style={{
                position: 'absolute', left: '20%', top: '40%', display: 'flex'
            }}>
                <div className="gridContainer">
                    <div className="gridElement">
                        <FormControl>
                            <InputLabel id="Group">Group</InputLabel>
                            <Select
                                labelId="Group"
                                id="Group"
                                value={selectedGroupId.toString()}
                                onChange={handleGroupChange}
                                label="Group"
                                sx={{width: 300}}
                            >
                                {
                                    groupList.map(group => {
                                        return (
                                            <MenuItem value={group.id}>{group.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="gridElement">
                        <FormControl>
                            <InputLabel id="Teacher">Teacher</InputLabel>
                            <Select
                                labelId="Teacher"
                                id="Teacher"
                                value={selectedTeacherId.toString()}
                                onChange={handleTeacherChange}
                                label="Teacher"
                                sx={{width: 300}}
                            >
                                {
                                    teacherList.map(teacher => {
                                        return (
                                            <MenuItem value={teacher.id}>{teacher.fio}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="gridElement">
                        <FormControl>
                            <InputLabel id="Subject">Subject</InputLabel>
                            <Select
                                labelId="Subject"
                                id="Subject"
                                value={selectedSubjectId.toString()}
                                onChange={handleSubjectChange}
                                label="Subject"
                                sx={{width: 300}}
                            >
                                {
                                    subjectList.map(subject => {
                                        return (
                                            <MenuItem value={subject.id}>{subject.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="gridElement">
                        <Button onClick={handleAddGroupSubjectButton} variant="contained" color="success">
                            Connect
                        </Button>
                    </div>
                </div>
            </Box>

        </ThemeProvider>
    );
};

export default AddGroupSubjectPage;
