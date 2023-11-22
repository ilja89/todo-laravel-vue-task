import axios from "axios";
import {handleError} from "./error";
import type {Task, TaskCreationParams} from "../types/task";
import {TaskColumn} from "../types/task";
import type {AppliedOptions} from "@src/js/components/TodoListOptions/types";

const root = '/api/tasks/'

export default {
    get(id: number): Promise<Task> {
        return axios.get(root + id)
            .then(response => response.data)
            .catch(error => handleError(error))
    },
    getFiltered(options?: AppliedOptions): Promise<Task[]> {
        return axios.get(root, {
            params: {
                options: JSON.stringify(options)
            }
        })
            .then(response => response.data)
            .catch(error => handleError(error))
    },
    create(newTaskParams: TaskCreationParams): Promise<Task> {
        return axios.post(root, {
            newTaskParams
        })
            .then(response => response.data)
            .catch(error => handleError(error))
    },
    update(updatedTask: Task): Promise<Task> {
        const id = updatedTask[TaskColumn.ID]
        const updatedTaskParams = {
            [TaskColumn.TITLE]: updatedTask[TaskColumn.TITLE],
            [TaskColumn.DESCRIPTION]: updatedTask[TaskColumn.DESCRIPTION],
            [TaskColumn.DONE]: updatedTask[TaskColumn.DONE]
        }

        return axios.put(root + id, {
            updatedTaskParams
        })
            .then(response => response.data)
            .catch(error => handleError(error))
    },
    delete(id: number): Promise<boolean> {
        return axios.delete(root + id)
            .then(response => response.data)
            .catch(error => handleError(error))
    }
}
