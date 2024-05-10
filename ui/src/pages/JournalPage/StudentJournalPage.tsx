import * as React from 'react';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useSessionStore} from "../../store";
import StudentService from "../../service/StudentService";
import SubjectService from "../../service/SubjectService";
import {Subject} from "../../model/SubjectState";
import {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import './Journal.css';
import StudentDataGrid from "../../components/Journal/data-grid/StudentDataGrid";
import SubjectSelect from "../../components/Journal/select/SubjectSelect";

const theme = createTheme();

const StudentJournalPage = () => {
    const [selectedSubjectId, setSelectedSubjectId] = React.useState(0);
    const [groupId, setGroupId] = React.useState(0);
    const [subjectList, setSubjectList] = React.useState<Subject[]>([]);
    let user = useSessionStore(state => state.user);

    useEffect(() => {
        StudentService.getStudentByUserId(user?.id).then(student => setGroupId(student.groupId));
    }, [user]);

    useEffect(() => {
        SubjectService.getGroupSubjects(groupId).then(subjects => setSubjectList(subjects));
    }, [groupId]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                {SubjectSelect(subjectList, selectedSubjectId, setSelectedSubjectId)}
            </Container>
            {StudentDataGrid(groupId, selectedSubjectId)}

        </ThemeProvider>
    );
};

export default StudentJournalPage;
