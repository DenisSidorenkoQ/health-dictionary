import axios from 'axios';
import {PhysicalActivity} from "../model/PhysicalActivityState";

class PhysicalActivityService {
    saveOrUpdatePhysicalActivity = async (physicalActivity: PhysicalActivity) => {
        const resp = await axios.post<PhysicalActivity>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/physical-activity`,
            {userId: physicalActivity.userId, activityTime: physicalActivity.activityTime, activityType: physicalActivity.activityType, date: physicalActivity.date},
            {withCredentials: true}
        );
        return resp.data;
    }

    deletePhysicalActivity = async (id: number | undefined) => {
        const resp = await axios.delete(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/physical-activity?id=${id}`,
            {withCredentials: true}
        );
        return resp.data;
    }

    async getAllPhysicalActivityByDate(userId: number | undefined, startDate: string | undefined, endDate: string | undefined): Promise<PhysicalActivity[]> {
        const response = await axios.get<PhysicalActivity[]>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/user/${userId}/physical-activity?startDate=${startDate}&endDate=${endDate}`,
            { withCredentials: true }
        ).catch(function (error) {
            return error.response.status;
        })
        return response.data;
    }
}

export default new PhysicalActivityService();