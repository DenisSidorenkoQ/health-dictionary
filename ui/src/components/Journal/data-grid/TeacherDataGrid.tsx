import * as React from "react";
import Table from "react-bootstrap/Table";
import {Mark} from "../../../model/MarkState";
import {StudyPass} from "../../../model/StudyPassState";
import {useEffect} from "react";
import lessonService from "../../../service/LessonService";
import studentService from "../../../service/StudentService";
import markService from "../../../service/MarkService";
import studyPassService from "../../../service/StudyPassService";
import {Student} from "../../../model/StudentState";
import {Lesson} from "../../../model/LessonState";
import { Util } from "../../../util/Util";
import passService from "../../../service/PassService";
import {AlertColor} from "@mui/material";
import CustomAlert from "../alert/CustomAlert";


const TeacherDataGrid = (reRenderTableCount: number, selectedGroupId: number, selectedSubjectId: number) => {
    const ALERT_TEXT = [
        "The number must be greater than 0 and less than 10",
        "Н - student did not come to lesson\nX - student came to lesson",
        "Success",
        "Something went wrong"
    ]
    const ALERT_TYPE = [
        "success" as AlertColor, "warning" as AlertColor, "error" as AlertColor
    ]

    const [alertState, setAlertState] = React.useState(false);
    const [alertType, setAlertType] = React.useState(ALERT_TYPE[0]);
    const [alertText, setAlertText] = React.useState('');
    const [alertTitle, setAlertTitle] = React.useState('');
    const [studentList, setStudentList] = React.useState<Student[]>([]);
    const [markList, setMarkList] = React.useState<Mark[]>([]);
    const [passList, setPassList] = React.useState<StudyPass[]>([]);
    const [lessonList, setLessonList] = React.useState<Lesson[]>([]);

    useEffect(() => {
        lessonService.getAllLessonsByGroupIdAndSubjectId(selectedGroupId, selectedSubjectId).then(lessons => setLessonList(lessons));
        console.log(reRenderTableCount);
    }, [selectedSubjectId, reRenderTableCount]);

    useEffect(() => {
        studentService.getStudentsByGroupId(selectedGroupId).then(students => setStudentList(students));

        markService.getMarkBySubjectIdAndGroupId(selectedSubjectId, selectedGroupId).then(marks => {
            setMarkList(marks);
        });

        studyPassService.getStudyPassBySubjectIdAndGroupId(selectedSubjectId, selectedGroupId).then(pass => {
            setPassList(pass);
        })
    }, [lessonList]);

    const handleChangeMark = (event: any) => {
        const number: number = event.target.textContent;
        const studentId: number = event.currentTarget.dataset.studentid;
        const lessonId: number = event.currentTarget.dataset.lessonid;

        if (number > 0 && number < 11 ) {
            markService.upsertMark(lessonId, studentId, number).then(() => {
                setAlertType(ALERT_TYPE[0]);
                setAlertTitle("OK");
                setAlertText(ALERT_TEXT[2]);
                setAlertState(true);
            }).catch(error => {
                setAlertType(ALERT_TYPE[2]);
                setAlertTitle("Error");
                setAlertText(ALERT_TEXT[3]);
                setAlertState(true);
            });
        } else {
            setAlertType(ALERT_TYPE[1]);
            setAlertTitle("Info");
            setAlertText(ALERT_TEXT[0]);
            setAlertState(true);
        }
    };

    const handleChangePass = (event: any) => {
        const pass: string = event.target.textContent;
        const studentId: number = event.currentTarget.dataset.studentid;
        const lessonId: number = event.currentTarget.dataset.lessonid;

        if(pass === "Н" || pass === "н") {
            passService.upsertPass(lessonId, studentId, true).then(() => {
                setAlertType(ALERT_TYPE[0]);
                setAlertTitle("OK");
                setAlertText(ALERT_TEXT[2]);
                setAlertState(true);
            }).catch(error => {
                setAlertType(ALERT_TYPE[2]);
                setAlertTitle("Error");
                setAlertText(ALERT_TEXT[3]);
                setAlertState(true);
            });
        } else if (pass === "" || pass === " ") {
            passService.upsertPass(lessonId, studentId, false).then(() => {
                setAlertType(ALERT_TYPE[0]);
                setAlertTitle("OK");
                setAlertText(ALERT_TEXT[2]);
                setAlertState(true);
            }).catch(error => {
                setAlertType(ALERT_TYPE[2]);
                setAlertTitle("Error");
                setAlertText(ALERT_TEXT[3]);
                setAlertState(true);
            });
        } else {
            setAlertType(ALERT_TYPE[1]);
            setAlertTitle("Info");
            setAlertText(ALERT_TEXT[1]);
            setAlertState(true);
        }
    };

    if (lessonList.length === 0) return;
    return (
        <>
            <Table className="table w-50" bordered size="sm" style={{border: '1px solid'}}>
                <thead style={{backgroundColor: "#2B3A70",  color: "white", textAlign: "center"}}>
                <tr>
                    <th rowSpan={2} colSpan={1}>
                        Students
                    </th>
                    {lessonList.map(lesson => {
                        return (
                            <th rowSpan={1} colSpan={2}>
                                {lesson.themeName + "\t" + Util.getDateFromTimestamp(lesson.dateTimestamp)}
                            </th>
                        );
                    })}
                </tr>
                <tr>
                    {lessonList.map(lesson => {
                        return (
                            <>
                                <th>Mark</th>
                                <th>Pass</th>
                            </>
                        );
                    })}
                </tr>
                </thead>
                <tbody>
                {
                    studentList.map(student => {
                    return (
                        <tr>
                            <td>{student.fio}</td>
                            {lessonList.map(lesson => {
                                let lessonMark: Mark | undefined;
                                let lessonPass: StudyPass | undefined;

                                lessonMark = markList.find(mark => {
                                    return mark.studentId === student.id && mark.lessonId === lesson.id;
                                });

                                lessonPass = passList.find(pass => {
                                    return pass.studentId === student.id && pass.lessonId === lesson.id;
                                });

                                if (lessonMark !== undefined && lessonPass !== undefined) {
                                    return (
                                        <React.Fragment>
                                            <td id={lessonMark.id.toString()} data-studentId={student.id} data-lessonId={lesson.id} contentEditable suppressContentEditableWarning onBlur={handleChangeMark}>
                                                {lessonMark.number}
                                            </td>
                                            <td id={lessonPass.id.toString()} data-studentId={student.id} data-lessonId={lesson.id} contentEditable suppressContentEditableWarning onBlur={handleChangePass}>{Util.studyPassConverter(lessonPass.pass)}</td>
                                        </React.Fragment>
                                    );
                                }
                                if (lessonMark !== undefined && lessonPass === undefined) {
                                    return (
                                        <React.Fragment>
                                            <td id={lessonMark.id.toString()} data-studentId={student.id} data-lessonId={lesson.id} contentEditable suppressContentEditableWarning onBlur={handleChangeMark}>{lessonMark.number}</td>
                                            <td data-studentId={student.id} data-lessonId={lesson.id} contentEditable suppressContentEditableWarning onBlur={handleChangePass}></td>
                                        </React.Fragment>
                                    );
                                }
                                if (lessonPass !== undefined && lessonMark === undefined) {
                                    return (
                                        <React.Fragment>
                                            <td data-studentId={student.id} data-lessonId={lesson.id} contentEditable suppressContentEditableWarning onBlur={handleChangeMark}/>
                                            <td id={lessonPass.id.toString()} data-studentId={student.id} data-lessonId={lesson.id} contentEditable suppressContentEditableWarning onBlur={handleChangePass}>
                                                {Util.studyPassConverter(lessonPass.pass)}
                                            </td>
                                        </React.Fragment>
                                    );
                                }
                                if (lessonPass === undefined && lessonMark === undefined) {
                                    return (
                                        <React.Fragment>
                                            <td data-studentId={student.id} data-lessonId={lesson.id} contentEditable suppressContentEditableWarning onBlur={handleChangeMark}/>
                                            <td data-studentId={student.id} data-lessonId={lesson.id} contentEditable suppressContentEditableWarning onBlur={handleChangePass}></td>
                                        </React.Fragment>
                                    );
                                }
                            })}
                        </tr>
                        );
                    })
                }
                </tbody>
            </Table>
            <div style={{width: "20%"}}>
                {CustomAlert(alertState, alertType, alertTitle, alertText)}
            </div>
        </>
    )
};

export default TeacherDataGrid;
