import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "../common/Form";

// интерфейс описания модального окна оформления товара
interface IOrder {
    payment: string;
    address: string;
}

// Класс создания модального окна оформления товара 
export class Order extends Form<IOrder> {
    protected _card: HTMLButtonElement;
    protected _cash: HTMLButtonElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container, events);
        
        this._card = container.elements.namedItem('card') as HTMLButtonElement;
        this._cash = container.elements.namedItem('cash') as HTMLButtonElement;

        // выделение поля - онлайн
        if (this._card) {
            this._card.addEventListener('click', () => {
                this._card.classList.add('button_alt-active');
                this._cash.classList.remove('button_alt-active');
                this.onInputChange('payment', 'card');
            })
        };

        // выделение поля - при получении
        if (this._cash) {
            this._cash.addEventListener('click', () => {
                this._cash.classList.add('button_alt-active');
                this._card.classList.remove('button_alt-active');
                this.onInputChange('payment', 'cash');
            })
        };
    }
}