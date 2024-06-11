
/* 
  * интерфейс получения данных с сервера
  **/
export interface IApiProductList {
    items: IProductItem[];
}

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
    category: CategoryItem;

    // цена товара
    price: number;
}

// тип категорий товара
export type CategoryItem = 'другое'|'софт-скил'|'дополнительное'|'кнопка'|'хард-скил';

// типизирую объект категорий товара
export type CategoryMap = {
    [key in CategoryItem]
}

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
    total: number;

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