import axios from 'axios';
import {User} from "../model/SessionState";

class SessionService {
    async getSession(): Promise<User> {
        const response = await axios.get<User>(
            process.env.REACT_APP_API_GATEWAY_URL + '/api/v1/sessions',
            { withCredentials: true }
        );
        return response.data;
    }
}

export default new SessionService();
