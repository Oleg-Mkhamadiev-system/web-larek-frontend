import { Component } from "../base/Component";

// тип описания страницы
interface IPage {
    // счетчик выбранных товаров в корзине
    counter: number;
    // массив карточек с товарами на странице
    catalog: HTMLElement[];
    // отключатель прокрутки страницы
    locked: boolean;
}

// Класс создания главной страницы
export class Page extends Component<IPage> {
    protected _counter: HTMLElement;
    protected _catalog: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;
}