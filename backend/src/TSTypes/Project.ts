export type ProjectReqBody = {
    name: string
};

export type IProject = {
    name: string,
    userId: string,
};

export type IProjectDatabase = {
    name: string,
    userId: string,
    _id: string
}
