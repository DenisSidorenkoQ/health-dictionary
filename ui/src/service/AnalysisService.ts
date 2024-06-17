import axios from "axios/index";
import {UserAnalysis} from "../model/AnalysisState";

class AnalysisService {
    getAnalysisByDate = async (userId: number | undefined, startDate: string | undefined, endDate: string | undefined) => {
        const resp = await axios.get<UserAnalysis[]>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/user`,
            {withCredentials: true}
        );
        return resp.data;
    }
}

export default new AnalysisService();