import { Form } from "../common/Form";

// интерфейс описания модального окна для коммуникации
interface IContacts {
    email: string;
    phone: string;
}

// Класс создания модального окна формы для коммуникации
export class Contacts extends Form<IContacts> {}