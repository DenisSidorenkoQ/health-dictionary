import {createTheme, ThemeProvider} from "@mui/material/styles";
import * as React from "react";
import {useSessionStore} from "../../store";
import './Profile.css'
import {Student} from "../../model/StudentState";
import {useEffect} from "react";
import studentService from "../../service/StudentService";
import groupService from "../../service/GroupService";
import markService from "../../service/MarkService";
import {SubjectAvgMark} from "../../model/MarkState";

const theme = createTheme();

const StudentProfilePage = () => {
    let user = useSessionStore(state => state.user);

    const [student, setStudent] = React.useState<Student>();
    const [subjectAvgMarkList, setSubjectAvgMarkList] = React.useState<SubjectAvgMark[]>([]);
    const [groupName, setGroupName] = React.useState('');

    useEffect(() => {
        studentService.getStudentByUserId(user?.id).then(student => setStudent(student));
    }, [user]);

    useEffect(() => {
        groupService.getGroupById(student?.groupId).then(group => setGroupName(group.name));
    }, [student]);

    useEffect(() => {
        markService.getAvgMarksByStudentId(student?.id).then(avgSubjectList => setSubjectAvgMarkList(avgSubjectList));
    }, [student]);

    return (
        <ThemeProvider theme={theme}>
            <h1 className='ProfileHeader'>Student profile</h1>
            <div className="gridContainer">
                <div className="gridUserInfo">
                    <ul className="list-group">
                        <li className="list-group-item">Name: {student?.fio}</li>
                        <li className="list-group-item">Group: {groupName}</li>
                        <li className="list-group-item">Sex: {student?.sex}</li>
                    </ul>
                </div>
                <div className="dataGrid">
                    <table className="table table-bordered">
                        <thead style={{backgroundColor: "#2B3A70",  color: "white", textAlign: "center"}}>
                            <tr>
                                <th scope="col">Subject</th>
                                <th scope="col">Studying time (h)</th>
                                <th scope="col">Knowledge test type</th>
                                <th scope="col">Average mark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                subjectAvgMarkList.map(subject => {
                                    return (
                                        <tr>
                                            <td>{subject.subjectName}</td>
                                            <td>{subject.timeToStudy}</td>
                                            <td>{subject.knowledgeTestType}</td>
                                            <td>{subject.avgMark}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default StudentProfilePage;
