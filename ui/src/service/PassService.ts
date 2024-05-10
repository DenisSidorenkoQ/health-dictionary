import axios, {AxiosResponse} from "axios";
import {Pass} from "../model/PassState";

class PassService {
    async upsertPass(lessonId: number, studentId: number, pass: boolean): Promise<AxiosResponse<Pass>> {
        return await axios.post<Pass>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/study-pass`,
            { lessonId: lessonId, pass: pass, studentId: studentId },
            { withCredentials: true }
        ).then(response => response);
    }
}

export default new PassService();
