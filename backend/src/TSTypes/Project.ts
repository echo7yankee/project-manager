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
    archived:boolean,
    _id: string
}
