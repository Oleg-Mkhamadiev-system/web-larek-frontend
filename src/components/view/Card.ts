import { Component } from "../base/Component";
import { CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";

// описание интерфейса модального окна карточки товара
export interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    selected: boolean;
}

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

// Класс создания модального окна карточки товара
export class Card extends Component<ICard> {
    protected _card: HTMLElement;
    protected _image: HTMLImageElement;
    protected _title: HTMLElement;
    protected _category: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;
    protected _categories = <Record<string, string>>{
        "дополнительное": "additional",
        "софт-скил": "soft",
        "кнопка": "button",
        "хард-скил": "hard",
        "другое": "other"
        }

    constructor(
        protected blockName: string,
        container: HTMLElement,
        actions?: ICardActions) {
            // вызываю абстрактный класс Компонент
        super(container);

        this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
        this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
        this._category = container.querySelector(`.${blockName}__category`);
        this._price = container.querySelector(`.${blockName}__price`);
        this._button = container.querySelector(`.${blockName}__item`);

        if(actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        };

    };

    get id(): string {
        return this.container.dataset.id || '';
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get title(): string {
        return this._title.textContent || '';
    }

    // устанавливаю текст
    set title(value: string) {
        this._title.textContent = String(value);
    }

    // устанавливаю категорию
    set category(value: string) {
        this._category.textContent = value;
        this._category.className = `card__category card__category_${this._categories[value]}`;
    }

    // устанавливаю картинку
    set image(value: string) {
        this._image.src = CDN_URL + value;
    }

    // устанавливаю цену
    set price(value: number | null) {
        if (value === null) {
            this._price.textContent = 'Бесценно';
        } else {
            this._price.textContent = value + ' синапсов';
        }

        if (this._button && !value) {
            this._button.disabled = true;
        };
    }

    // сеттер для определения, выбран ли товар или нет
    set selected(value: boolean) {
        if (!this._button.disabled) {
            this._button.disabled = value;
        };
    }
}

export class CardPreview extends Card {
    protected _description: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        actions?: ICardActions) {

        super('card', container, actions);

        this._description = ensureElement<HTMLElement>(`.${this.blockName}__text`, container);
        this._button = container.querySelector(`.${this.blockName}__button`);
        this._button.addEventListener('click', () => actions.onClick );

    }

    set description (value: string) {
        this._description.textContent = value;
    }
}

export class CardItem extends Card  {
    constructor(
        container: HTMLElement,
        actions?: ICardActions) {
        super('card', container, actions);
    }
}