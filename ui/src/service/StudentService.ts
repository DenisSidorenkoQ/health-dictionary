import axios from 'axios';
import {User} from "../model/ГыукState";

class StudentService {
     getStudentByUserId = async (id: number | undefined) => {
         const resp = await axios.get<User>(
             process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/user/${id}/students`,
             {withCredentials: true}
         );
         return resp.data;
     }
}

export default new StudentService();
