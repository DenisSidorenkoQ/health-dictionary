import axios from "axios/index";
import {UserDiet} from "../model/DietState";
import {PhysicalActivity} from "../model/PhysicalActivityState";

class DietService {
    saveOrUpdateDiet = async (userDiet: UserDiet) => {
        const resp = await axios.post<UserDiet>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/diets`,
            {withCredentials: true}
        );
        return resp.data;
    }

    deleteDiet = async (id: number | undefined) => {
        const resp = await axios.delete(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/diets?id=${id}`,
            {withCredentials: true}
        );
        return resp.data;
    }

    async getAllDietByDate(userId: number | undefined, startDate: string | undefined, endDate: string | undefined): Promise<UserDiet[]> {
        const resp = await axios.get<UserDiet[]>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/users/${userId}/diets?startDate=${startDate}&endDate=${endDate}`,
            {withCredentials: true}
        ).catch(function (error) {
            return error.response.status;
        });
        return resp.data;
    }
}

export default new DietService();