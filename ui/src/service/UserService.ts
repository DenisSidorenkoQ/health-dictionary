import axios from "axios";
import {SaveUserResponse, UserInfo} from "../model/UserState";

class UserService {
    saveUser = (login: String, password: String, roleId: number): Promise<SaveUserResponse> => {
        return axios.post<SaveUserResponse>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/users`,
            {login: login, password: password, roleId: roleId},
            {withCredentials: true}
        ).then(response => response.data);
    }

    getUserByUserId = async (id: number | undefined) => {
        const resp = await axios.get<UserInfo>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/user/${id}`,
            {withCredentials: true}
        );
        return resp.data;
    }
}

export default new UserService();
