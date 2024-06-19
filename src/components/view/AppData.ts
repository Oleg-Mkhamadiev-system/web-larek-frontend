import { FormErrors, IAppState, IOrder, IProductItem } from "../../types";
import { Model } from "../base/Model";

// Класс создания объекта данных на основе модели
export class Product extends Model<IProductItem> {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    selected: boolean;
}

export class AppState extends Model<IAppState> {
    // массив товаров
    catalog: Product[];
    // корзина с товарами
    basket: Product[] = [];
    // объект заказа товаров клиентом
    order: IOrder = {
        payment: '',
        email: '',
        phone: '',
        address: '',
        total: null,
        items: []
    };
    // объект валидации форм
    formErrors: FormErrors = {};
}