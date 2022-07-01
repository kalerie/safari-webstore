export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender?: string;
    dateOfBirth?: string;
    // password: string;
    newsletters: boolean;
}
