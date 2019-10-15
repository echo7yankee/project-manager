export type ITaskDatabase = {
    task: string,
    projectId: string,
    projectName: string,
    archived: boolean,
    date: Date,
    _id: string
}

export type ITask = {
    task: string,
    projectId: string,
    archived: boolean,
    date: Date,
}