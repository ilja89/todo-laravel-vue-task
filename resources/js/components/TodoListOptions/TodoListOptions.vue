<template>
<div class="options-container">
    <template v-if="!collapsed">
        <section class="options-block">
            <strong>Выполнено:</strong>
            <v-btn icon size="x-small" @click="onDoneFilterOptionClick">
                <v-icon size="large" v-if="done === DoneFilterOption.DONE" icon="mdi-check" color="var(--color-success)"/>
                <v-icon size="large" v-else-if="done === DoneFilterOption.ANY" icon="mdi-minus" color="var(--color-intermediate)"/>
                <v-icon size="large" v-else-if="done === DoneFilterOption.NOT_DONE" icon="mdi-window-close" color="var(--color-error)"/>
            </v-btn>
        </section>
        <section class="options-block">
            <strong>Содержит:</strong>
            <v-text-field v-model="shouldContain"
                          density="compact"
                          variant="underlined"/>
        </section>
        <section class="options-block">
            <strong>Сортировать по:</strong>
            <v-select v-model="sortBy"
                      density="compact"
                      :items="sortOptions"
                      :item-value="item => item.column"
                      :item-title="item => item.text"
                      variant="underlined"/>
        </section>
        <section class="options-block">
            <strong>Сортировать в порядке:</strong>
            <v-select v-model="orderBy"
                      density="compact"
                      :items="orderOptions"
                      :item-value="item => item.option"
                      :item-title="item => item.text"
                      variant="underlined"/>
        </section>
        <v-btn color="var(--color-success)" @click="onApplyOptions">
            <span class="apply-text">
                Применить
            </span>
        </v-btn>
        <br/>
    </template>
    <v-btn color="var(--color-primary)" @click="collapsed = !collapsed">
        <span class="apply-text">
            {{ collapsed ? "Открыть поиск" : "Свернуть"}}
        </span>
    </v-btn>
</div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import type {AppliedOptions} from "@src/js/components/TodoListOptions/types";
import {DoneFilterOption, SortOrderOption} from "@src/js/components/TodoListOptions/types";
import {TaskColumn} from "@src/js/types/task";

const sortOptions: {
    text: string,
    column: TaskColumn
}[] = [
    {
        text: "Имени",
        column: TaskColumn.TITLE
    },
    {
        text: "Описанию",
        column: TaskColumn.DESCRIPTION
    },
    {
        text: "Завершённости",
        column: TaskColumn.DONE
    }
]
const orderOptions: {
    text: string,
    option: SortOrderOption
}[] = [
    {
        text: "Возрастания",
        option: SortOrderOption.ASCENDING
    },
    {
        text: "Убывания",
        option: SortOrderOption.DESCENDING
    }
]

export default defineComponent({
    name: "TodoListOptions",
    emits: ['options-applied'],
    data: () => ({
        done: DoneFilterOption.ANY as DoneFilterOption,
        shouldContain: '',
        sortBy: TaskColumn.TITLE,
        orderBy: SortOrderOption.ASCENDING,
        collapsed: true
    }),
    computed: {
        DoneFilterOption() {
            return DoneFilterOption
        },
        sortOptions() {
            return sortOptions
        },
        orderOptions() {
            return orderOptions
        }
    },
    methods: {
        onDoneFilterOptionClick() {
            if (this.done === DoneFilterOption.DONE) {
                this.done = DoneFilterOption.NOT_DONE
            } else if (this.done === DoneFilterOption.NOT_DONE) {
                this.done = DoneFilterOption.ANY
            } else if (this.done === DoneFilterOption.ANY) {
                this.done = DoneFilterOption.DONE
            }
        },
        onApplyOptions() {
            const done = {
                [DoneFilterOption.DONE]: true,
                [DoneFilterOption.NOT_DONE]: false,
                [DoneFilterOption.ANY]: undefined
            }[this.done]

            this.$emit('options-applied', {
                done,
                shouldContain: this.shouldContain ? this.shouldContain : undefined,
                sortBy: this.sortBy,
                orderBy: this.orderBy
            } as AppliedOptions)
        }
    }
})
</script>
<style scoped>
.options-container {
    display: flex;
    flex-direction: column;
    padding: var(--padding-2);
    background-color: var(--color-bg-secondary);
}
.options-block {
    display: flex;
    align-items: center;
    gap: var(--padding-4);
}
.apply-text {
    color: var(--color-text-light);
    font-size: 1.4em;
}
</style>
