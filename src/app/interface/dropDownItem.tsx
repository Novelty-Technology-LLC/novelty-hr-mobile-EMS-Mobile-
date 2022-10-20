export interface DropDownItem {
    label: any;
    value: any;
    icon?: () => JSX.Element;
    hidden?: boolean;
    disabled?: boolean;
    selected?: boolean;
}