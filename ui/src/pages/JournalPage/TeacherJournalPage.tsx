import * as React from 'react';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useSessionStore} from "../../store";
import SubjectService from "../../service/SubjectService";
import {GroupHasSubject, Subject} from "../../model/SubjectState";
import {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import './Journal.css';
import TeacherService from "../../service/TeacherService";
import {Group} from "../../model/GroupState";
import GroupService from "../../service/GroupService";
import subjectService from "../../service/SubjectService";
import SubjectSelect from "../../components/Journal/select/SubjectSelect";
import GroupSelect from "../../components/Journal/select/GroupSelect";
import TeacherDataGrid from "../../components/Journal/data-grid/TeacherDataGrid";
import AddLessonDialog from "../../components/Journal/dialog/AddLessonDialog";

const theme = createTheme();

const TeacherJournalPage = () => {
    const [teacherId, setTeacherId] = React.useState(0);
    const [selectedGroupId, setSelectedGroupId] = React.useState(0);
    const [selectedSubjectId, setSelectedSubjectId] = React.useState(0);
    const [groupHasSubjectList, setGroupHasSubjectList] = React.useState<GroupHasSubject[]>([]);
    const [groupIdSet, setGroupIdSet] = React.useState(() => new Set());
    const [groupList, setGroupList] = React.useState<Group[]>([]);
    const [subjectList, setSubjectList] = React.useState<Subject[]>([]);
    const [reRenderTableCount, setReRenderTableCount] = React.useState(0);

    let user = useSessionStore(state => state.user);

    useEffect(() => {
        TeacherService.getTeacherByUserId(user?.id).then(teacher => setTeacherId(teacher.id));
    }, [user]);

    useEffect(() => {
        SubjectService.getTeacherSubjects(teacherId).then(subjects => setGroupHasSubjectList(subjects));
    }, [teacherId]);

    useEffect(() => {
        setGroupIdSet(new Set<number>(groupHasSubjectList.map(groupHasSubject => groupHasSubject.groupId)));
    }, [groupHasSubjectList]);

    useEffect(() => {
        const iterator = groupIdSet.values();
        let groupId: number;
        setGroupList([]);

        for (let i = 0; i < groupIdSet.size; i++) {
            groupId = iterator.next().value;

            GroupService.getGroupById(groupId).then(group => {
                setGroupList((oldArray) => [...oldArray, group]);
            })
        }

    }, [groupIdSet]);

    useEffect(() => {
        subjectService.getSubjectsByTeacherIdAndGroupId(teacherId, selectedGroupId).then(subjects => setSubjectList(subjects));
    }, [selectedGroupId]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                {GroupSelect(groupList, selectedGroupId, setSelectedGroupId)}
                {SubjectSelect(subjectList, selectedSubjectId, setSelectedSubjectId)}
            </Container>
            {AddLessonDialog(reRenderTableCount, setReRenderTableCount, theme, selectedGroupId, selectedSubjectId)}
            {TeacherDataGrid(reRenderTableCount, selectedGroupId, selectedSubjectId)}
        </ThemeProvider>
    );
};

export default TeacherJournalPage;
