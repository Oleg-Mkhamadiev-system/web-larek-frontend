import { Component } from "../base/Component";

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
}