import axios from 'axios';
import {UserInfo} from "../model/UserState";

class AuthorizationService {
    async login(login: string, password: string): Promise<number> {
        const response = await axios.post(
            process.env.REACT_APP_API_GATEWAY_URL + '/authorization/login',
            { login: login, password: password },
            { withCredentials: true }
        ).catch(function (error) {
            return error.response.status;
        })
    return response.status;
    }

    async registration(login: string, password: string): Promise<number> {
        const response = await axios.post(
            process.env.REACT_APP_API_GATEWAY_URL + '/api/v1/user',
            { login: login, password: password, roleName: "USER"},
            { withCredentials: true }
        ).catch(function (error) {
            return error.response.status;
        })
        return response.status;
    }

    async updateUserInfo(userInfo: UserInfo | undefined): Promise<UserInfo> {
        const response = await axios.post(
            process.env.REACT_APP_API_GATEWAY_URL + '/api/v1/user/update',
            { login: userInfo?.login, mail: userInfo?.mail, age: userInfo?.age, sex: userInfo?.sex, height: userInfo?.height, weight: userInfo?.weight, physicalActivity: userInfo?.physicalActivity, isNotify: userInfo?.isNotify },
            { withCredentials: true }
        ).catch(function (error) {
            return error.response.status;
        })
        return response.status;
    }
}

export default new AuthorizationService();
