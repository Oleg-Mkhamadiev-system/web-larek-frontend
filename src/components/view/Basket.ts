import { IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

// интерфейс описания модального окна корзины
interface IBasket {
    // массив карточек в корзине
    list: HTMLElement[];
    // общая стоимость товаров
    price: number;
}

// Класс создания корзины
export class Basket extends Component<IBasket> {
    protected _list: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;
    
    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        
        this._list = container.querySelector(`.basket__list`) as HTMLElement;
        this._price = container.querySelector(`.basket__price`) as HTMLElement;
        this._button = container.querySelector(`.basket__button`) as HTMLButtonElement;

        // логика кнопки оформления ведет на модалку заказа
        if (this._button) {
            this._button.addEventListener('click', () => {
                this.events.emit('basket:order');
            })
        }
    }

    // метод добавления списка товаров
    set list(items: HTMLElement[]) {
        this._list.replaceChildren(...items);
        // состояние кнопки
        this._button.disabled = items.length ? false : true;
    }

    set price(value: number | null) {
        if (value === null) {
            this._price.textContent = 'Бесценно';
        }
        this._price.textContent = value + 'синапсов';  
    }
}

export interface IProductBasket extends IProductItem {
    id: string;
    index: number
}

interface BasketActions {
    onClick: (event: MouseEvent) => void;
}

export class BasketItem extends Component<IProductBasket> {
    protected _index: HTMLElement;
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _buttonDelete: HTMLButtonElement;

    constructor(container: HTMLElement, _actions?: BasketActions) {
        super(container);

        this._index = ensureElement<HTMLElement>(`.basket__item-index`);
        this._title = ensureElement<HTMLElement>(`.card__title`);
        this._price = ensureElement<HTMLElement>(`.card__price`);
        this._buttonDelete = ensureElement<HTMLButtonElement>(`.basket__item-delete`);

        if (_actions?.onClick) {
            this._buttonDelete.addEventListener('click', _actions.onClick)
        }
    }

    set index(value: string) {
        this._index.textContent = value.toString();
    }

    set title(value: string) {
        this._title.textContent = value;
    }

    set price(value: string) {
        this._price.textContent = value + 'синапсов';
    }
}