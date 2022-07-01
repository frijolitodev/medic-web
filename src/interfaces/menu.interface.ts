export interface ILink {
    text: string,
    redirectTo: string
}

export interface IMenuProps {
    items: Array<ILink>,
    show: boolean
}
