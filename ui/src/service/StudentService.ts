import axios from 'axios';
import {Student} from "../model/StudentState";

class StudentService {
     getStudentByUserId = async (id: number | undefined) => {
         const resp = await axios.get<Student>(
             process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/user/${id}/students`,
             {withCredentials: true}
         );
         return resp.data;
     }

    getStudentsByGroupId = async (id: number | undefined) => {
        const resp = await axios.get<Student[]>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/group/${id}/students`,
            {withCredentials: true}
        );
        return resp.data;
    }

    saveStudent = async (userId: number, groupId: number, fio: string, sex: string): Promise<Student> => {
        const resp = await axios.post<Student>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/students`,
            {userId: userId, groupId: groupId, fio: fio, sex: sex},
            {withCredentials: true}
        );
        return resp.data;
    }
}

export default new StudentService();
