export type ClientMapType = {
    user_id: string
    credit_score: string
    age: string
    tenure: string
    balance: string
    products: string
    credit_card: string
    is_active_member: string
    salary: string
    churn: string
    city: string
    gender: string
    predictions: string
    propensity_to_churn: string
    ranking: string
    phone_number: string
}

export const CLIENT_KEY_MAP: ClientMapType = {
    user_id: "Уникальный идентификатор клиента",
    credit_score: "Кредитный рейтинг",
    age: "Возраст клиента",
    tenure: "Время, в течение которого человек является клиентом (в годах)",
    balance: "Текущий баланс на счете",
    products: "Количество продуктов банка",
    credit_card: "Наличие кредитной карты",
    is_active_member: "Активность клиента",
    salary: "Предполагаемая зарплата",
    churn: "Отток клиента",
    city: "Проживание клиента",
    gender: "Пол",
    predictions: "Предсказание оттока(%)",
    propensity_to_churn: "Процент вероятности оттока клиента",
    ranking: "Значения ранжирования",
    phone_number: "Номер телефона"
}

export const ITEMS_PER_PAGE = 20

export const LOCAL_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }