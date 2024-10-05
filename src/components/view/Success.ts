import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

// интерфейс описания модального окна успешного заказа
interface ISuccess {
    description: number;
}

// Класс создания модального окна успешного заказа
export class Success extends Component<ISuccess> {
    protected _description: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._description = container.querySelector('.order-success__description') as HTMLElement;
        this._button = container.querySelector('.order-success__close') as HTMLButtonElement;

        if (this._button) {
          this._button.addEventListener('click', () => events.emit('success:close'));
        }       
    }

    set description(value: number) {
        this._description.textContent = 'Списано ' + '' + value + '' + ' синапсов';
    }
}