import axios from "axios";
import {KnowledgeTestType} from "../model/KnowledgeTestTypeState";

class KnowledgeTestTypeService {
    async getKnowledgeTestTypeList(): Promise<KnowledgeTestType[]> {
        return await axios.get<KnowledgeTestType[]>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/test-type`,
            { withCredentials: true }
        ).then(response => {
            return response.data;
        });
    }
}

export default new KnowledgeTestTypeService();
