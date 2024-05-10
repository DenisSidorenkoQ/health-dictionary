import axios from "axios";
import {Teacher} from "../model/TeacherState";

class TeacherService {
    getTeacherByUserId = (id: number | undefined): Promise<Teacher> => {
        return axios.get<Teacher>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/user/${id}/teachers`,
            {withCredentials: true}
        ).then(response => response.data);
    }

    saveTeacher = (userId: number, departmentId: number, fio: string): Promise<Teacher> => {
        return axios.post<Teacher>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/teachers`,
            {userId: userId, departmentId: departmentId, fio: fio},
            {withCredentials: true}
        ).then(response => response.data);
    }

    getTeacherList() {
        return axios.get<Teacher[]>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/teachers`,
            {withCredentials: true}
        ).then(response => response.data);
    }
}

export default new TeacherService();
