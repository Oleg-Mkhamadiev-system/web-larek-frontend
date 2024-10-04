import { IEvents } from "../base/events";
import { Form } from "../common/Form";

// интерфейс описания модального окна для коммуникации
interface IContacts {
    email: string;
    phone: string;
}

// Класс создания модального окна формы для коммуникации
export class Contacts extends Form<IContacts> {

    // конструктор принимает родительский элемент формы и обработчик
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    // сеттер для номера телефона
    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    // сеттер для электронной почты
    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }
}