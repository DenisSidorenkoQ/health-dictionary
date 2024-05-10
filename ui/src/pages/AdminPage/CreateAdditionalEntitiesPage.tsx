import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useSessionStore} from "../../store";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from "react";
import './Admin.css'
import Box from "@mui/material/Box";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useEffect} from "react";
import groupService from "../../service/GroupService";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import departmentService from "../../service/DepartmentService";
import {KnowledgeTestType} from "../../model/KnowledgeTestTypeState";
import knowledgeTestTypeService from "../../service/KnowledgeTestTypeService";
import subjectService from "../../service/SubjectService";
import studentService from "../../service/StudentService";
import journalService from "../../service/JournalService";

const theme = createTheme();

const CreateAdditionalEntitiesPage = () => {
    let user = useSessionStore(state => state.user);

    const [selectedEntityId, setSelectedEntityId] = React.useState(0);
    const [selectedGroupName, setSelectedGroupName] = React.useState('');
    const [selectedDepartmentName, setSelectedDepartmentName] = React.useState('');
    const [selectedSubjectName, setSelectedSubjectName] = React.useState('');
    const [knowledgeTestTypeList, setKnowledgeTestTypeList] = React.useState<KnowledgeTestType[]>([]);
    const [selectedTestTypeId, setSelectedTestTypeId] = React.useState(0);
    const [selectedTimeToStudy, setSelectedTimeToStudy] = React.useState(0);
    const [savedGroupId, setSavedGroupId] = React.useState(0);

    const handleEntityChange = (event: any) => {
        const selectedEntityId = parseInt(event.target.value);

        setSelectedEntityId(selectedEntityId);
    }

    const handleSaveGroupButton = () => {
        groupService.saveGroup(selectedGroupName).then(group => setSavedGroupId(group.id));
    };

    const handleSaveDepartmentButton = () => {
        departmentService.saveDepartment(selectedDepartmentName);
    };

    useEffect(() => {
        knowledgeTestTypeService.getKnowledgeTestTypeList().then(testTypeList => setKnowledgeTestTypeList(testTypeList));
    }, [selectedEntityId === 2]);

    useEffect(() => {
        journalService.saveJournal(savedGroupId);
    }, [savedGroupId]);

    const inputGroupInformation = () => {
        const handleGroupNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
            setSelectedGroupName(event.target.value);
        }

        return (
            <>
                <div className="gridElement">
                    <TextField onChange={handleGroupNameChange} id="groupName" label="Group name" variant="outlined" />
                </div>
                <div className="gridElement">
                    <Button onClick={handleSaveGroupButton} variant="contained" color="success">
                        Create
                    </Button>
                </div>
            </>
        )
    }



    const inputSubjectInformation = () => {
        const handleSubjectNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
            setSelectedSubjectName(event.target.value);
        }

        const handleTestTypeChange = (event: any) => {
            const testTypeId = parseInt(event.target.value);

            setSelectedTestTypeId(testTypeId);
        }

        const handleTimeToStudyChange = (event: any) => {
            const timeToStudy = parseInt(event.target.value);

            setSelectedTimeToStudy(timeToStudy);
        }

        const handleSaveSubjectButton = () => {
            subjectService.saveSubject(selectedSubjectName, selectedTestTypeId, selectedTimeToStudy);
        };

        return (
            <>
                <div className="gridElement">
                    <TextField onChange={handleSubjectNameChange} id="subjectName" label="Subject name" variant="outlined" />
                </div>
                <div className="gridElement">
                    <TextField onChange={handleTimeToStudyChange} id="TimeToStudy" label="Time to study" variant="outlined" />
                </div>
                <div className="gridElement">
                    <FormControl>
                        <InputLabel id="KnowledgeTestType">KnowledgeTestType</InputLabel>
                        <Select
                            labelId="KnowledgeTestType"
                            id="KnowledgeTestType"
                            value={selectedTestTypeId.toString()}
                            onChange={handleTestTypeChange}
                            label="KnowledgeTestType"
                            sx={{width: 300}}
                        >
                            {
                                knowledgeTestTypeList.map(knowledgeTestType => {
                                    return (
                                        <MenuItem value={knowledgeTestType.id}>{knowledgeTestType.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className="gridElement">
                    <Button onClick={handleSaveSubjectButton} variant="contained" color="success">
                        Create
                    </Button>
                </div>
            </>
        )
    }

    const inputDepartmentInformation = () => {
        const handleDepartmentNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
            setSelectedDepartmentName(event.target.value);
        }

        return (
            <>
                <div className="gridElement">
                    <TextField onChange={handleDepartmentNameChange} id="departmentName" label="Department name" variant="outlined" />
                </div>
                <div className="gridElement">
                    <Button onClick={handleSaveDepartmentButton} variant="contained" color="success">
                        Create
                    </Button>
                </div>
            </>
        )
    }

    const selectionInputInformationByEntityId = () => {
        if (selectedEntityId === 1) {
            return inputGroupInformation();
        }
        if (selectedEntityId === 2) {
            return inputDepartmentInformation();
        }
        if (selectedEntityId === 3) {
            return inputSubjectInformation();
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box style={{
                position: 'absolute', left: '20%', top: '40%', display: 'flex'
            }}>
                <div className="gridContainer">
                    <div className="gridElement">
                        <FormControl>
                            <InputLabel id="Entity">Entity</InputLabel>
                            <Select
                                labelId="Entity"
                                id="Entity"
                                value={selectedEntityId.toString()}
                                onChange={handleEntityChange}
                                label="Entity"
                                sx={{width: 300}}
                            >
                                <MenuItem value={1}>Group</MenuItem>
                                <MenuItem value={2}>Department</MenuItem>
                                <MenuItem value={3}>Subject</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {selectionInputInformationByEntityId()}
                </div>
            </Box>

        </ThemeProvider>
    );
};

export default CreateAdditionalEntitiesPage;
