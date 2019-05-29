export interface Roles{
    lecturer?: boolean;
    admin?: boolean;
    superadmin?: boolean;
}

export interface User{
    uid: string;
    email: string;
    roles: Roles;
}