import axios from 'axios';

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
}

export default new AuthorizationService();
