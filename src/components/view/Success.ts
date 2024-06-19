import { Component } from "../base/Component";

// интерфейс описания модального окна успешного заказа
interface ISuccess {
    description: string;
}

// Класс создания модального окна успешного заказа
export class Success extends Component<ISuccess> {
    protected _description: HTMLElement;
    protected _button: HTMLButtonElement;
}