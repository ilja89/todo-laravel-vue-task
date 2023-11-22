<template>
<section class="list">
    <div v-for="task in tasks" class="card">
        <v-btn icon @click="$emit('toggle', task)">
            <v-icon size="large" v-if="task.done" icon="mdi-check" color="var(--color-success)"/>
            <v-icon size="large" v-else icon="mdi-window-close" color="var(--color-error)"/>
        </v-btn>
        <div class="card-content">
            <strong>{{ task[TaskColumn.TITLE] }}</strong>
            <p>{{ task[TaskColumn.DESCRIPTION] }}</p>
        </div>
        <div class="card-actions">
            <v-btn icon @click="$emit('edit', task)">
                <v-icon size="large" icon="mdi-pencil" color="var(--color-primary)"/>
            </v-btn>
            <v-btn icon @click="$emit('delete', task)">
                <v-icon size="large" icon="mdi-delete" color="var(--color-error)"/>
            </v-btn>
        </div>
    </div>
</section>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import type {PropType} from "vue";
import type {Task} from "@src/js/types/task";
import {TaskColumn} from "@src/js/types/task";

export default defineComponent({
    name: "TasksList",
    emits: ['toggle', 'delete', 'edit'],
    props: {
        tasks: {
            type: [] as PropType<Task[]>,
            required: true
        }
    },
    computed: {
        TaskColumn() {
            return TaskColumn
        }
    }
})
</script>
<style scoped>
.list {
    display: flex;
    flex-direction: column;
    padding: var(--padding-2);
    gap: var(--padding-2);
    background-color: var(--color-bg-secondary);
}
.card {
    background-color: var(--color-bg-main);
    display: flex;
    padding: var(--padding-2);
    gap: var(--padding-2);
    align-items: center;
    border: solid medium lightgray;
}
.card-actions {
    display: flex;
    flex-direction: column;
    gap: var(--padding-2);
}
.card-content {
    flex-grow: 1;
}
</style>
