import axios from "axios";
import {Admin} from "../model/AdminState";

class AdminService {
    saveAdmin = (userId: number, fio: string): Promise<Admin> => {
        return axios.post<Admin>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/admins`,
            {userId: userId, fio: fio},
            {withCredentials: true}
        ).then(response => response.data);
    }
}

export default new AdminService();
