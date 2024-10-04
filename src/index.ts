import './scss/styles.scss';
import { Api, ApiListResponse } from '../src/components/base/api';
import { API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { AppState, Product } from './components/view/AppData';
import { Page } from './components/view/Page';
import { Modal } from './components/common/Modal';
import { Basket, BasketItem } from './components/view/Basket';
import { Order } from './components/view/Order';
import { Contacts } from './components/view/Contacts';
import { Success } from './components/view/Success';
import { IOrderForm, IProductItem } from './types';
import { Card, CardItem, CardPreview } from './components/view/Card';

const api = new Api(API_URL);
const events = new EventEmitter();

// Чтобы мониторить все события для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

const successTemplate = document.querySelector('#success') as HTMLTemplateElement;
const cardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const success = new Success(cloneTemplate(successTemplate), {
    onClick: () => {
        events.emit('modal:close');
        modal.close();
    }
});

// Модель данных приложения
const appData = new AppState({}, events);

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order('order', cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);


api.get('/product')
   .then((response: ApiListResponse<IProductItem>) => {
    appData.setCatalog(response.items as IProductItem[])
}).catch(error => {
    console.log(error);
});

// изменились элементы каталога
events.on('items:changed', () => {
    page.catalog = appData.catalog.map((item)=> {
        const card = new CardItem(
            cloneTemplate(cardTemplate),
        { 
            onClick: () => events.emit('card:select', item)
        });
        return card.render({
            id: item.id,
            title: item.title,
            image: item.image,
            category: item.category,
            price: item.price,
        });
    });

    page.counter = appData.getProductBasket();
});

// открытие карточки
events.on('card:select', (item: Product) => {
    page.locked = true;
    const card = new CardPreview(
        cloneTemplate(cardPreviewTemplate),
        { 
            onClick: () => events.emit('card:addBasket', item)
    });
    modal.render({
        content: card.render({
          id: item.id,
          title: item.title,
          image: item.image,
          category: item.category,
          description: item.description,
          price: item.price,
          selected: item.selected
        }),
    });
});

// добавление товара в корзину
events.on('card:addBasket', (item: Product) => {
    item.selected = true;
    appData.addProductBasket(item);
    page.counter = appData.getProductBasket();
    modal.close();
});

console.log(appData.addProductBasket)

// открытие корзины с блокировкой прокрутки страницы
events.on('basket:open', () => {
    page.locked = true;
    const basketItems = appData.basket.map((item, index) => {
        const basketItem = new BasketItem(
            cloneTemplate(cardBasketTemplate),
            {
                onClick: () => events.emit('basket:delete', item)
        });
        return basketItem.render({
            index: index + 1,
            title: item.title,
            price: item.price
        });
    });
    modal.render({
      content: basket.render({
            items: basketItems,
            price: appData.getTotalProductBasket(),
        }),
    });
});


// удаление товара из корзины
events.on('basket:delete', (item: Product) => {
    appData.removeProductBasket(item.id);
    item.selected = false;
    basket.price = appData.getTotalProductBasket();
    page.counter = appData.getProductBasket();
});

// Изменилось состояние валидации заказа
events.on('orderFormErrors:change', (errors: Partial<IOrderForm>) => {
    const { payment, address } = errors;
    order.valid = !payment && ! address;
    order.errors = Object.values({ payment, address }).filter(i => !!i).join('; ');
});

// Изменилось состоянии валидации контактов
events.on('contactsFormErrors:change', (errors: Partial<IOrderForm>) => {
    const { email, phone } = errors;
    contacts.valid = !email && !phone;
    contacts.errors = Object.values({ email, phone }).filter(i => !!i).join('; ');
});

// оформление заказа
events.on('basket:order', () => {
    modal.render({
        content: order.render({
            address: '',
            valid: false,
            errors: []
        }),
    });
});

// Изменилось поле адреса
events.on(/^order\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
    appData.setOrderAddressInput(data.field, data.value);
});

// Изменилось одно из полей контактов
events.on(/^contacts\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
    appData.setOrderContactsInput(data.field, data.value);
});

// Заполнить телефон и почту
events.on('order:submit', () => {
    appData.order.total = appData.getTotalProductBasket();
    appData.setItems();
    modal.render({
        content: contacts.render({
            email: '',
            phone: '',
            valid: false,
            errors: []
        })
    })
});

// Покупка товаров
events.on('contacts:submit', () => {
    api.post('/order', appData.order)
    .then(res => {
        events.emit('order:success', res);
        appData.clearBasket();
        appData.clearOrder();
        order.disableButtons();
        page.counter = 0;
        appData.resetSelected();
    }).catch(error => {
        console.log(error);
    })
});

// Успешно завершить покупку
events.on('order:success', (res: ApiListResponse<string>) => {
    modal.render({
        content: success.render({
            description: res.total
        }),
    });
});

// Закрыть модальное окно
events.on('modal:close', () => {
    page.locked = false;
    appData.clearOrder();
})