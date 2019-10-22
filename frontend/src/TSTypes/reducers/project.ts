export type IProjectsType = {
    id: string,
    name: string,
    userId: string,
    archived:boolean,
}

export type IProjectType = {
    projects: IProjectsType[];
    isLoading: boolean,
}