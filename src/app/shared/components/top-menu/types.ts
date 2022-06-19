export interface TopMenuActionInterface {
    icon: string;
    tooltip: string;
    handler: Function;
}

export interface TopMenuStateInterface {
    title: string;
    actions: TopMenuActionInterface[];
}
