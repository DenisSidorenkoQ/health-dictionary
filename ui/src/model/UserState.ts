export interface User {
    id: number;
    login: string;
    password: string;
    roleId: number;
}

export interface SaveUserResponse {
    id: number;
    login: string;
    roleId: number;
}
