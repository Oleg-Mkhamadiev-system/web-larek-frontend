import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

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

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._counter = ensureElement<HTMLElement>('.header__basket-counter');
        this._catalog = ensureElement<HTMLElement>('.gallery');
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
        this._basket = ensureElement<HTMLElement>('.header__basket');

        this._basket.addEventListener('click', () => {
            this.events.emit('basket:open');
        })
    }

    // сеттер для счетчика товаров в корзине
    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    // сеттер для карточек товаров на странице
    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }

    // сеттер для блока прокрутки
    set locked(value: boolean) {
        if (value) {
            this._wrapper.classList.add('.page__wrapper_locked');
        } else {
            this._wrapper.classList.remove('.page__wrapper_locked');
        }
    }
}