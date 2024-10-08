import { FormErrors, IAppState, IOrder, IOrderForm, IProductItem } from "../../types";
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
    // корзина с товарами
    basket: Product[] = [];
    // массив со всеми товарами
    catalog: Product[];
    
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

    addProductBasket(item: Product) {
        this.basket.push(item);
    }

    removeProductBasket(id: string) {
        this.basket = this.basket.filter(item => item.id !== id);
    }

    getProductBasket() {
        return this.basket.length;
    }

    // сумма всех товаров в корзине
    getTotalProductBasket() {
        return this.basket.reduce((sum, item) => sum + item.price, 0);
    }

    clearBasket() {
        this.basket.length = 0;
    }

    setItems() {
        this.order.items = this.basket.map(item => item.id);
    }

    // очистить поле заказа после покупки
    clearOrder() {
        this.order = {
          payment: '',
          email: '',
          phone: '',
          address: '',
          total: null,
          items: []
        }
    }

    setOrderAddressInput(field: keyof IOrderForm, value: string) {
        this.order[field] = value;

        if (field === 'address') {
          this.order.address = value;
        }

        if (this.validateOrder()) {
          this.events.emit('order:ready', this.order);
        }
    }

    setOrderContactsInput(field: keyof IOrderForm, value: string) {
      this.order[field] = value;

      if (field === 'email') {
        this.order.email = value;
      } else if (field === 'phone') {
        this.order.phone = value;
      }

      if (this.validateContacts()) {
        this.events.emit('contacts:ready', this.order);
      }
  }

    validateContacts() {
        const errors: typeof this.formErrors = {};

        if (!this.order.email) {
          errors.email = 'Необходимо указать email';
        }

        if (!this.order.phone) {
          errors.phone = 'Необходимо указать телефон';
        }

        this.formErrors = errors;
        this.events.emit('contactsFormErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    validateOrder() {
        const errors: typeof this.formErrors = {};

        if (!this.order.address) {
          errors.address = 'Необходимо указать адрес';
        }

        if (!this.order.payment) {
          errors.payment = 'Необходимо указать способ оплаты';
        }

        this.formErrors = errors;
        this.events.emit('orderFormErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    setCatalog(items: IProductItem[]) {
      this.catalog = items.map(item => new Product({ ...item, selected: false }, this.events));
      this.emitChanges('items:changed', { catalog: this.catalog });
    }

    resetSelected() {
      this.catalog.forEach(item => item.selected = false);
    }
}