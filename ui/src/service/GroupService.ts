import axios from 'axios';
import {Group} from "../model/GroupState";

class GroupService {
    async saveGroup(name: string): Promise<Group> {
        return await axios.post<Group>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/groups`,
            {name: name},
            { withCredentials: true }
        ).then(response => {
            return response.data;
        });
    }

    async getGroupById(groupId: number | undefined): Promise<Group> {
        return await axios.get<Group>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/group/${groupId}`,
            { withCredentials: true }
        ).then(response => {
            return response.data;
        });
    }

    async addGroupSubject(groupId: number, teacherId: number, subjectId: number) {
        return await axios.post(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/group/subjects`,
            {groupId: groupId, teacherId: teacherId, subjectId: subjectId},
            { withCredentials: true }
        ).then(response => {
            return response.data;
        });
    }

    async getGroupList(): Promise<Group[]> {
        return await axios.get<Group[]>(
            process.env.REACT_APP_API_GATEWAY_URL + `/api/v1/groups`,
            { withCredentials: true }
        ).then(response => {
            return response.data;
        });
    }
}

export default new GroupService();
