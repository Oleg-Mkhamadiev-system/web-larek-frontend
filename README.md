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