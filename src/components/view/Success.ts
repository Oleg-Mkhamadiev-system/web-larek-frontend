import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

// интерфейс описания модального окна успешного заказа
interface ISuccess {
    description: number;
}

interface ISuccessAction {
    onClick: (event: MouseEvent) => void;
}

// Класс создания модального окна успешного заказа
export class Success extends Component<ISuccess> {
    protected _description: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ISuccessAction) {
        super(container);

        this._description = ensureElement<HTMLElement>('film__description');
        this._button = ensureElement<HTMLButtonElement>('.modal__close');

        if (actions?.onClick) {
            this._button.addEventListener('click', () => actions.onClick);
        }
    }

    set description(value: number) {
        this._description.textContent = 'Списано' + '' + value + '' + 'синапсов';
    }
}