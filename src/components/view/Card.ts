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
    //protected _card: HTMLElement;
    protected _image: HTMLImageElement;
    protected _title: HTMLElement;
    protected _category: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(
        //template: HTMLTemplateElement,
        container: HTMLElement,
        actions?: ICardActions) {
            // вызываю абстрактный класс Компонент
        super(container);

        //this._card = container.querySelector('.card') as HTMLElement;
        this._title = container.querySelector('.card__title') as HTMLElement;
        this._image = container.querySelector('.card__image') as HTMLImageElement;
        this._category = container.querySelector('.card__category') as HTMLElement;
        this._price = container.querySelector('.card__price') as HTMLElement;
        this._button = container.querySelector('.gallery__item') as HTMLButtonElement;

        if(actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick)
            }
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

export class CardPreview extends Card {
    protected _description: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container, actions);
        this._description = ensureElement<HTMLElement>('.card__text', container);
    }

    set description (value: string) {
        this._description.textContent = value;
    }
}