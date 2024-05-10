import axios from "axios";
import {GroupHasSubject, Subject} from "../model/SubjectState";

class SubjectService {
    saveSubject = (name: string, testTypeId: number, timeToStudy: number): Promise<Subject> => {
        return axios.post<Subject>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/subjects`,
            {name: name, timeToStudy: timeToStudy, knowledgeTestTypeId: testTypeId},
            {withCredentials: true}
        ).then(request => request.data);
    }

    getGroupSubjects = (id: number | undefined): Promise<Subject[]> => {
        return axios.get<Subject[]>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/group/${id}/subjects`,
            {withCredentials: true}
        ).then(subjects => {
            if (subjects.data.length != null) {
                return subjects.data;
            } else {
                return [];
            }
        });

    }

    getTeacherSubjects = (id: number): Promise<GroupHasSubject[]> => {
        return axios.get<GroupHasSubject[]>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/teacher/${id}/subjects`,
            {withCredentials: true}
        ).then(request => request.data);
    }

    getSubjectList = (): Promise<Subject[]> => {
        return axios.get<Subject[]>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/subjects`,
            {withCredentials: true}
        ).then(request => request.data);
    }

    getSubjectsByTeacherIdAndGroupId = (teacherId: number, groupId: number): Promise<Subject[]> => {
        return axios.get<Subject[]>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/teacher/${teacherId}/group/${groupId}/subjects`,
            {withCredentials: true}
        ).then(request => request.data);
    }
}

export default new SubjectService();
