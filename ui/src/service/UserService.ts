import axios from "axios";
import {SaveUserResponse, User} from "../model/UserState";

class UserService {
    saveUser = (login: String, password: String, roleId: number): Promise<SaveUserResponse> => {
        return axios.post<SaveUserResponse>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/users`,
            {login: login, password: password, roleId: roleId},
            {withCredentials: true}
        ).then(response => response.data);
    }
}

export default new UserService();
