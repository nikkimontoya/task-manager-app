// TODO Long awkward names. Seems wrong

export interface AddTaskDialogProjectInterface {
    id: number;
    name: string;
}

export interface AddTaskDialogUserInterface {
    id: number;
    fullName: string;
}

export interface AddTaskDialogDataInterface {
    projects: AddTaskDialogProjectInterface[];
    users: AddTaskDialogUserInterface[];
}
