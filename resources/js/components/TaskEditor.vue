<template>
<section class="editor">
    <v-btn icon @click="$emit('toggle')">
        <v-icon size="large" v-if="task.done" icon="mdi-check" color="var(--color-success)"/>
        <v-icon size="large" v-else icon="mdi-window-close" color="var(--color-error)"/>
    </v-btn>
    <div class="text-inputs">
        <v-text-field :model-value="task.title"
                      density="compact"
                      variant="underlined"
                      @change="onTitleChange"/>
        <textarea :value="task.description"
                  rows="4"
                  @change="onDescriptionChange"/>
    </div>
    <v-btn icon @click="$emit('save')">
        <v-icon size="large" icon="mdi-content-save" color="var(--color-success)"/>
    </v-btn>
</section>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import type {PropType} from "vue";
import type {Task, TaskCreationParams} from "@src/js/types/task";

export default defineComponent({
    name: "TaskEditor",
    emits: ['save', 'title-update', 'description-update'],
    props: {
        task: {
            type: {} as PropType<Task | TaskCreationParams>,
            required: true
        }
    },
    methods: {
        onTitleChange(e: InputEvent) {
            this.$emit('title-update', (e.target as HTMLTextAreaElement).value)
        },
        onDescriptionChange(e: InputEvent) {
            this.$emit('description-update', (e.target as HTMLTextAreaElement).value)
        }
    }
})
</script>
<style scoped>
.editor {
    background-color: var(--color-bg-secondary);
    display: flex;
    padding: var(--padding-2);
    gap: var(--padding-4);
    align-items: flex-start;
}
.text-inputs {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}
textarea {
    outline: none;
    border: solid thin;
    border-radius: var(--padding-2);
    padding: var(--padding-2);
}
</style>
