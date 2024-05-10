import {Group} from "../model/GroupState";
import axios from "axios";
import {Department} from "../model/DepartmentState";

class DepartmentService {
    async getDepartmentList(): Promise<Department[]> {
        return await axios.get<Department[]>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/departments`,
            { withCredentials: true }
        ).then(response => {
            return response.data;
        });
    }

    saveDepartment(name: string): Promise<Department> {
        return axios.post<Department>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/departments`,
            {name: name},
            { withCredentials: true }
        ).then(response => {
            return response.data;
        })
    }
}

export default new DepartmentService();
