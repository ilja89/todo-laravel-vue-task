export enum TaskColumn {
    ID = "id",
    TITLE = "title",
    DESCRIPTION = "description",
    DONE = "done",
    CREATED_AT = "created_at",
    UPDATED_AT = "updated_at"
}

export interface Task {
    [TaskColumn.ID]: number,
    [TaskColumn.TITLE]: string,
    [TaskColumn.DESCRIPTION]: string,
    [TaskColumn.DONE]: boolean,
    [TaskColumn.CREATED_AT]: string,
    [TaskColumn.UPDATED_AT]: string
}

export type TaskCreationParams = Omit<Task, 'id' | 'created_at' | 'updated_at'>
