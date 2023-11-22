import type {TaskColumn} from "@src/js/types/task";

export enum DoneFilterOption {
    DONE = "DONE",
    NOT_DONE = "NOT_DONE",
    ANY = "ANY"
}

export enum SortOrderOption {
    ASCENDING = "asc",
    DESCENDING = "desc"
}

export type AppliedOptions = {
    done?: boolean,
    shouldContain?: string,
    sortBy: TaskColumn,
    orderBy: SortOrderOption
}
