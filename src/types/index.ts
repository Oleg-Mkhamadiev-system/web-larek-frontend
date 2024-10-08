import { Product } from "../components/view/AppData";

/*
* Интерфейс, описывающий данные товара
**/
export interface IProductItem {
    // айди товара
    id: string;

    // описание товара
    description: string;

    // изображение товара
    image: string;

    // название товара
    title: string;

    // категория товара
    category: string;

    // цена товара
    price: number | null;

    // добавлен ли товар в корзину или нет
    selected: boolean;
};

// интерфейс описания заказа
export type IOrder = {
    // способ оплаты
    payment: string;

    // электронная почта
    email: string;

    // номер телефона
    phone: string;

    // адрес
    address: string;

    // цена
    total: number | null;

    // массив купленных товаров
    items: string[];
}

// интерфейс описания формы заказа товара
export interface IOrderForm {
    payment: string;
    address: string;
    email: string;
    phone: string;
}

// тип описания ошибок валидации форм
export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

// тип описания состояния приложения
export interface IAppState {
    // массив карточек товаров
    catalog: Product[];
    // корзина с выбранными товарами
    basket: Product[];
    // сведения о заказе
    order: IOrder;
    // ошибки валидации форм
    formErrors: FormErrors;
    // метод добавления товара к корзину
    addProductBasket(value: Product): void;
    // метод удаления товара из корзины
    removeProductBasket(id: string): void;
    // метод получения количества товаров в корзине
    getProductBasketAmount(): number;
    // метод получения общей стоимости товаров
    getTotalProductBasket(): number
    // метод очистки корзины
    clearBasket(): void;
    // метод получения данных с сервера
    setCatalog(items: IProductItem[]): void;
    // метод заполнения полей форм
    setValueField(field: keyof IOrderForm, value: string): void;
    // метод валидации формы для модального окна коммуникации
    validateContacts(): boolean;
    // метод валидации формы для модального окна оформления заказа
    validateOrder(): boolean;
}