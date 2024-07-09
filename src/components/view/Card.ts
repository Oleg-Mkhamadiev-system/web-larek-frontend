import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { CategoryItem } from "../../types";
import { CDN_URL, categoryMap } from "../../utils/constants";

// описание интерфейса модального окна карточки товара
interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    selected: boolean;
}

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

// Класс создания модального окна карточки товара
export class Card extends Component<ICard> {
    protected _image: HTMLImageElement;
    protected _title: HTMLElement;
    protected _category: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;
    constructor(
        container: HTMLElement,
        actions?: ICardActions) {
            // вызываю абстрактный класс Компонент
        super(container);
        this._title = ensureElement<HTMLElement>('.card__title');
        this._image = ensureElement<HTMLImageElement>('.card__image');
        this._category = ensureElement<HTMLElement>('.card__category');
        this._price = ensureElement<HTMLElement>('.card__price');
        this._button = ensureElement<HTMLButtonElement>('.card__button');

        if(actions?.onClick) {
            this._button.addEventListener('click', actions.onClick);
        };
    };

    // устанавливаю текст
    set title(value: string) {
        this._title.textContent = value;
    }

    // устанавливаю категорию
    set category(value: CategoryItem) {
        this._category.textContent = value;
        this._category.classList.add(categoryMap[value]);
    }

    // устанавливаю картинку
    set image(value: string) {
        this._image.src = CDN_URL + value;
    }

    // устанавливаю цену
    set price(value: number | null) {
        if(value === null) {
            this._price.textContent = `Бесценно`;
        } else {
            this._price.textContent = value + `синапсов`;
        }
    }

    set selected(value: boolean) {
        if(!this._button.disabled) {
            this._button.disabled = value;
        }
    }
}