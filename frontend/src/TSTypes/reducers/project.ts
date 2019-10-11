export type IProjects = {
    id: string,
    name: string,
    userId: string,
}

export type IProject = {
    projects: IProjects[];
    isLoading: boolean,
}