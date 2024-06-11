import { Component } from "./base/Component";

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

// Класс создания модального окна карточки товара
export class Card extends Component<ICard> {
    protected _image: HTMLImageElement;
    protected _title: HTMLElement;
    protected _category: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;
}