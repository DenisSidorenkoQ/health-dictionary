import axios from 'axios';
import {Lesson} from "../model/LessonState";

class LessonService {
    async getAllLessonsByGroupIdAndSubjectId(groupId: number, subjectId: number): Promise<Lesson[]> {
        return await axios.get<Lesson[]>(
            process.env.REACT_APP_API_GATEWAY_URL + '/api/v1/lessons',
            { withCredentials: true,  params: { groupId: groupId, subjectId: subjectId } }
        ).then(response => response.data);
    }

    async saveLesson(journalId: number | undefined, subjectId: number, themeName: string, dateTimestamp: number): Promise<Lesson> {
        return await axios.post<Lesson>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/lessons`,
            {journalId: journalId, subjectId: subjectId, themeName: themeName, dateTimestamp: dateTimestamp},
            {withCredentials: true}).then(request => request.data);
    }
}

export default new LessonService();
