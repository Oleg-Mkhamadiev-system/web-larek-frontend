import { CategoryMap } from "../types";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {

};

// задаю объект категорий в утилитах для дальнейшего использования в коде
export const categoryMap: CategoryMap = {
    'софт-скил': 'card__category_soft',
    'другое': 'card__category_other',
    'хард-скил': 'card__category_hard',
    'дополнительное': 'card__category_additional',
    'кнопка': 'card__category_button'
};