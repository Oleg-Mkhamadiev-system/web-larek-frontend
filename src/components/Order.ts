import { Form } from "./common/Form";

// интерфейс описания модального окна оформления товара
interface IOrder {
    payment: string;
    address: string;
}

// Класс создания модального окна оформления товара 
export class Order extends Form<IOrder> {}