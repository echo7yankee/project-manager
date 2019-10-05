export type RegisterCredentials = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string
}

export type LoginCredentials = {
    email: string;
    password: string;
}