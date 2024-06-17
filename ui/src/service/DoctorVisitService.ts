import axios from "axios/index";
import {DoctorVisit} from "../model/DoctorVisitState";

class DoctorVisitService {
    saveOrUpdateDoctorVisit = async (doctorVisit: DoctorVisit) => {
        const resp = await axios.post<DoctorVisit>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/visits`,
            {withCredentials: true}
        );
        return resp.data;
    }

    deleteDoctorVisit = async (id: number | undefined) => {
        const resp = await axios.delete(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/visits/${id}`,
            {withCredentials: true}
        );
        return resp.data;
    }

    getAllDoctorVisitByDate = async (userId: number | undefined, startDate: string | undefined, endDate: string | undefined) => {
        const resp = await axios.get<DoctorVisit[]>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/users/${userId}/visits?startDate=${startDate}&endDate=${endDate}`,
            {withCredentials: true}
        );
        return resp.data;
    }
}

export default new DoctorVisitService();