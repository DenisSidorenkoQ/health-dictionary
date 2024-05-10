import axios, {AxiosResponse} from "axios";
import {Mark, SubjectAvgMark} from "../model/MarkState";

class MarkService {
    async getMarkBySubjectIdAndGroupId(subjectId: number, groupId: number): Promise<Mark[]> {
        return await axios.get<Mark[]>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/group/${groupId}/subject/${subjectId}/marks`,
            { withCredentials: true }
        ).then(response => response.data);
    }

    async upsertMark(lessonId: number, studentId: number, number: number): Promise<AxiosResponse<Mark>> {
        return await axios.post<Mark>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/marks`,
            { lessonId: lessonId, number: number, studentId: studentId },
            { withCredentials: true }
        );
    }

    async getAvgMarksByStudentId(studentId: number | undefined): Promise<SubjectAvgMark[]> {
        return await axios.get<SubjectAvgMark[]>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/student/${studentId}/subjects/marks/avg`,
            { withCredentials: true }).then(resource => resource.data);
    }
}

export default new MarkService();
