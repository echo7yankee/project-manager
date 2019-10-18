export type ITaskDatabase = {
    task: string,
    projectId: string,
    projectName: string,
    archived: boolean,
    completed: boolean,
    date: Date,
    _id: string
}

export type ITask = {
    task: string,
    projectId: string,
    archived: boolean,
    completed: boolean,
    date: Date,
}