export interface User {
    id: number;
    login: string;
    password: string;
    roleName: string;
}

export interface SaveUserResponse {
    id: number;
    login: string;
    roleName: string;
}

export interface UserInfo {
    id: number;
    login: string;
    roleName: string;
    mail: string;
    age: number;
    sex: string;
    height: number;
    weight: number;
    physicalActivity: string;
    isNotify: boolean;
}
