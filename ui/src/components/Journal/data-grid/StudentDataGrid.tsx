import Table from "react-bootstrap/Table";
import {Mark} from "../../../model/MarkState";
import {StudyPass} from "../../../model/StudyPassState";
import * as React from "react";
import {Lesson} from "../../../model/LessonState";
import {Student} from "../../../model/StudentState";
import {useEffect} from "react";
import LessonService from "../../../service/LessonService";
import studentService from "../../../service/StudentService";
import markService from "../../../service/MarkService";
import studyPassService from "../../../service/StudyPassService";
import {Util} from "../../../util/Util";

const StudentDataGrid = (groupId: number, selectedSubjectId: number) => {
    const [lessonList, setLessonList] = React.useState<Lesson[]>([]);
    const [studentList, setStudentList] = React.useState<Student[]>([]);
    const [markList, setMarkList] = React.useState<Mark[]>([]);
    const [passList, setPassList] = React.useState<StudyPass[]>([]);

    useEffect(() => {
        LessonService.getAllLessonsByGroupIdAndSubjectId(groupId, selectedSubjectId).then(lessons => setLessonList(lessons));
    }, [selectedSubjectId]);

    useEffect(() => {
        studentService.getStudentsByGroupId(groupId).then(students => setStudentList(students));

        markService.getMarkBySubjectIdAndGroupId(selectedSubjectId, groupId).then(marks => {
            setMarkList(marks);
        });

        studyPassService.getStudyPassBySubjectIdAndGroupId(selectedSubjectId, groupId).then(pass => {
            setPassList(pass);
        })
    }, [lessonList]);

    if (lessonList.length === 0) return;
    return (
        <Table className="table w-50" bordered size="sm" style={{border: '1px solid'}}>
            <thead style={{backgroundColor: "#2B3A70",  color: "white", textAlign: "center"}}>
            <tr>
                <th rowSpan={2} colSpan={1}>
                    Students
                </th>
                {
                    lessonList.map(lesson => {
                        return (
                            <th rowSpan={1} colSpan={2}>
                                {
                                    lesson.themeName + "\t" + Util.getDateFromTimestamp(lesson.dateTimestamp)
                                }
                            </th>
                        )
                    })
                }
            </tr>
            <tr>
                {
                    lessonList.map(lesson => {
                        return (
                            <>
                                <th>Mark</th>
                                <th>Pass</th>
                            </>
                        )
                    })
                }
            </tr>
            </thead>
            <tbody>
            {
                studentList.map(student => {
                    return (
                        <tr>
                            <td>{student.fio}</td>
                            {
                                lessonList.map(lesson => {
                                    let lessonMark: Mark | undefined;
                                    let lessonPass: StudyPass | undefined;

                                    lessonMark = markList.find(mark => {
                                        return mark.studentId === student.id && mark.lessonId === lesson.id;
                                    })

                                    lessonPass = passList.find(pass => {
                                        return pass.studentId === student.id && pass.lessonId === lesson.id;
                                    })

                                    if (lessonMark !== undefined && lessonPass !== undefined) {
                                        return (
                                            <React.Fragment>
                                                <td>{lessonMark.number}</td>
                                                <td>{Util.studyPassConverter(lessonPass.pass)}</td>
                                            </React.Fragment>
                                        )
                                    } if (lessonMark !== undefined && lessonPass === undefined) {
                                        return (
                                            <React.Fragment>
                                                <td>{lessonMark.number}</td>
                                                <td></td>
                                            </React.Fragment>
                                        )
                                    } if (lessonPass !== undefined && lessonMark === undefined) {
                                        return (
                                            <React.Fragment>
                                                <td></td>
                                                <td>
                                                    {Util.studyPassConverter(lessonPass.pass)}
                                                </td>
                                            </React.Fragment>
                                        )
                                    } if (lessonPass === undefined && lessonMark === undefined) {
                                        return (
                                            <React.Fragment>
                                                <td></td>
                                                <td></td>
                                            </React.Fragment>
                                        )
                                    }
                                })
                            }
                        </tr>
                    )
                })

            }
            </tbody>
        </Table>
    );
};

export default StudentDataGrid;
