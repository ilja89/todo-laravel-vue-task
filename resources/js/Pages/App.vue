<template>
<div class="root">
    <TodoListOptions @options-applied="onOptionsApplied"/>
    <TasksList class="tasks-list"
               :tasks="tasks"
               @toggle="onToggleTask"
               @delete="onDeleteTask"
               @edit="onEditTask"/>
    <TaskEditor :task="editedTask"
                @title-update="editedTask.title = $event"
                @description-update="editedTask.description = $event"
                @toggle="editedTask.done = !editedTask.done"
                @save="onSaveEditedTask"/>
</div>
</template>
<script lang="ts">
import {defineComponent, toRaw} from "vue";
import type {AppliedOptions} from "@src/js/components/TodoListOptions/types";
import type {Task, TaskCreationParams} from "@src/js/types/task";
import {TaskColumn} from "@src/js/types/task";
import TodoListOptions from "@src/js/components/TodoListOptions/TodoListOptions.vue";
import TasksList from "@src/js/components/TasksList.vue";
import TasksClient from "@src/js/Api/TasksClient";
import TaskEditor from "@src/js/components/TaskEditor.vue";

function getTemplateTask(): TaskCreationParams {
    return {
        title: '',
        description: '',
        done: false
    }
}

export default defineComponent({
    name: "App",
    components: {TaskEditor, TasksList, TodoListOptions},
    data: () => ({
        tasks: [] as Task[],
        editedTask: getTemplateTask() as Task | TaskCreationParams
    }),
    methods: {
        onOptionsApplied(options: AppliedOptions) {
            this.fetchTasks(options)
        },
        onToggleTask(task: Task) {
            TasksClient.update(task).then(() => {
                const taskToUpdate = this.tasks.find(item => item[TaskColumn.ID] === task[TaskColumn.ID])
                if (!taskToUpdate) {
                    return
                }
                taskToUpdate[TaskColumn.DONE] = !taskToUpdate[TaskColumn.DONE]
            })
        },
        onDeleteTask(task: Task) {
            TasksClient.delete(task.id)
                .then(() => {
                    this.tasks = this.tasks.filter(item => item[TaskColumn.ID] !== task[TaskColumn.ID])
                })
        },
        onEditTask(task: Task) {
            console.log(task)
            this.editedTask = structuredClone(toRaw(task))
        },
        onSaveEditedTask() {
            const isNew = !(this.editedTask as Task)[TaskColumn.ID]

            if (isNew) {
                TasksClient.create(this.editedTask)
                    .then(() => this.fetchTasks())
            } else {
                const updatedTask = this.editedTask as Task
                TasksClient.update(updatedTask)
                    .then(() => {
                        const index = this.tasks.findIndex(task => task.id === updatedTask.id)
                        if (index === -1) {
                            return
                        }

                        this.tasks[index] = updatedTask
                    })
            }

            this.editedTask = getTemplateTask()
        },
        fetchTasks(options?: AppliedOptions) {
            TasksClient.getFiltered(options)
                .then(tasks => this.tasks = tasks)
        }
    },
    mounted() {
        this.fetchTasks()
    }
})
</script>
<style>
@import "@src/css/service.css";
@import "@src/css/palette.css";
</style>
<style scoped>
.root {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    gap: var(--padding-2);
    padding: var(--padding-2);
}
.tasks-list {
    flex-grow: 1;
    overflow: auto;
}
</style>
