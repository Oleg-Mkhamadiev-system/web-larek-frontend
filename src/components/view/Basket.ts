import { IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

// интерфейс описания модального окна корзины
export interface IBasket {
    basket: HTMLElement;
    items: HTMLElement[];
    index: number;
    title: string;
    price: number;
    button: HTMLElement;
}

interface BasketActions {
    onClick: (event: MouseEvent) => void;
}

// Класс создания корзины
export class Basket extends Component<IBasket> {
    protected _basket: HTMLElement;
    protected _title: HTMLElement;
    protected _list: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;
    protected _headerBasketCounter: HTMLElement;
    protected _headerBasketButton: HTMLButtonElement;
    
    constructor(
        container: HTMLElement,
        protected events: IEvents
    ) {

        super(container);
        
        this._basket = container.querySelector('.basket');
        this._title = container.querySelector('.modal__title');
        this._list = container.querySelector('.basket__list');
        this._button = container.querySelector('.basket__button');
        this._price = container.querySelector('.basket__price');
        this._headerBasketCounter = document.querySelector('.header__basket-counter');
        this._headerBasketButton = document.querySelector('.header__basket');


        // логика кнопки оформления ведет на модалку заказа
        if (this._button) {
            this._button.addEventListener('click', () => {
                this.events.emit('basket:order')
            })
        }

        this._headerBasketButton.addEventListener('click', () => { this.events.emit('basket:open') });

        this.items = [];
    }

    // метод добавления списка товаров
    set items(items: HTMLElement[]) {
        this._list.replaceChildren(...items);
        // состояние кнопки
        this._button.disabled = items.length ? false : true;
    }

    set price(price: number) {
        this._price.textContent = price + ' синапсов';
    }

    renderHeaderBasketCounter(value: number) {
        this._headerBasketCounter.textContent = String(value);
      }
}

export interface IProductBasket extends IProductItem {
    id: string;
    basketItem: HTMLElement;
    index: number;
    title: string;
    buttonDelete: HTMLButtonElement;
    price: number
}

export class BasketItem extends Component<IProductBasket> {
    protected _basketItem: HTMLElement;
    protected _index: HTMLElement;
    protected _buttonDelete: HTMLButtonElement;
    protected _title: HTMLElement;
    protected _price: HTMLElement

    constructor(
        container: HTMLElement,
        actions?: BasketActions) {

        super(container);

        this._basketItem = container.querySelector('.basket__item');
        this._index = container.querySelector('.basket__item-index');
        this._title = container.querySelector('.card__title');
        this._price = container.querySelector('.card__price');
        this._buttonDelete = container.querySelector('.basket__item-delete');

        if (this._buttonDelete) {
            this._buttonDelete.addEventListener('click', (evt) => {
                this.container.remove();
                actions?.onClick(evt);
        });
        };
    }

    set index(value: number) {
        this._index.textContent = value.toString();
    }

    set title(value: string) {
        this._title.textContent = value;
    }

    set price(value: string) {
        this._price.textContent = value + ' синапсов';
    }
}