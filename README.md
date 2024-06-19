# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Документация

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

/*
 * тип категорий товара
  **/
export type CategoryItem = 'другое'|'софт-скил'|'дополнительное'|'кнопка'|'хард-скил';

/* 
 * типизирую объект категорий товара
 **/
export type CategoryMap = {
    [key in CategoryItem]
}

/*
 * интерфейс описания заказа
 **/
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

/*
 * интерфейс описания формы заказа товара
 **/
export interface IOrderForm {
    payment: string;
    address: string;
    email: string;
    phone: string;
}

/*
 * тип описания ошибок валидации форм
 **/
export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

/* 
 * тип описания состояния приложения
 **/
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

/*
 * интерфейс описания модального окна корзины
 **/
interface IBasket {
    // массив карточек в корзине
    list: HTMLElement[];
    // общая стоимость товаров
    price: number;
}

/*
 * описание интерфейса модального окна карточки товара
 **/
interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    selected: boolean;
}

/*
 * интерфейс описания модального окна для коммуникации
 **/
interface IContacts {
    email: string;
    phone: string;
}

/*
 * интерфейс описания модального окна оформления товара
 **/
interface IOrder {
    payment: string;
    address: string;
}

/*
 * тип описания страницы
 **/
interface IPage {
    // счетчик выбранных товаров в корзине
    counter: number;
    // массив карточек с товарами на странице
    catalog: HTMLElement[];
    // отключатель прокрутки страницы
    locked: boolean;
}

/*
 * интерфейс описания модального окна успешного заказа
 **/
interface ISuccess {
    description: string;
}

/*
 * Класс создания объекта данных на основе модели
 **/
export class Product extends Model<IProductItem> {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    selected: boolean;
}

## Модели данных
В данной работе реализуется MVP-паттерн.
Модели реализуют работу с загрузкой данных из Api,
сохраняют и работают с данными, полученными от пользователя.
Производные классы отображают интерфейс для взаимодействия с пользователем.
EventEmitter выступает в качестве Презентера - связывает модели данных с отображением интерфейсов при срабатывании события, управляя взаимодействием между ними.

Класс Component
Базовый класс предназначен для управления компонентом.

Абстрактный класс, который является базовым компонентом, предоставляет ряд методов для работы с DOM элементами.
Конструктор принимает один параметр - контейнер типа HTMLElement, в котором компонент будет рендериться.

Form
Класс представляет компонент формы с возможностью управления состоянием валидации и отображения ошибок. Конструктор класса принимает контейнер формы container типа HTMLFormElement и объект событий events типа EventEmitter.

AppData
Класс представляет хранилище данных приложения. Он содержит информацию о продуктах, корзине, предпросмотре товара, заказе и ошибках формы заказа.

Basket
Класс представляет компонент корзины с возможностью отображения списка товаров,
общей суммы и управления состоянием кнопки оформления заказа.

Card
Класс представляет компонент карточки товара с возможностью отображения
информации о товаре.

Contacts
Класс представляет форму для ввода информации (электронной почты и номера телефона) для коммуникации при оформлении заказа.

Order
Класс представляет форму заказа с возможностью выбора способа оплаты.

Page
Класс представляет компонент страницы с некоторыми элементами и функциональностью для управления ими.

Success
Класс представляет компонент для отображения сообщения об успешном оформлении заказа.