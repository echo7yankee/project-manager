export type RegisterUser = {
    confirmPassword: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export type LoginUser = {
    email: string;
    password: string;
}

export type UserDatabase = {
    confirmPassword: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    _id: string;
    role: string;
    date: Date;
}

export type UserDetails = {
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date
    id: string;
    role: string;
}