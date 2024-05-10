import axios from "axios";
import {StudyPass} from "../model/StudyPassState";

class PassService {
    async getStudyPassBySubjectIdAndGroupId(subjectId: number, groupId: number): Promise<StudyPass[]> {
        return await axios.get<StudyPass[]>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/group/${groupId}/subject/${subjectId}/pass`,
            { withCredentials: true }
        ).then(response => response.data);
    }
}

export default new PassService();
