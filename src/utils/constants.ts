export const CATEGORIZED_TEXT: {
    id: number;
    text: string;
}[]= [
    {id: 1,
    text: 'Системное ПО'}, 
    {id: 2,
    text: 'Прикладное ПО'},
    {id: 3,
    text: 'Инструментальное ПО'},
    {id: 4,
    text: 'Системное ПО'},
    {id: 5,
    text: 'Системное ПО'},
    {id: 6,
    text: 'Windows'},
    {id: 7,
    text: 'Adobe'},
    {id: 8,
    text: 'Антивирусы'},
    {id: 9,
    text: 'Утилиты'},
    {id: 10,
    text: 'Корпоративные системы'},
]

export const FOOTER_LINKS: {
    id: number;
    text: string;
    link: string;
}[]= [
    {id: 1,
    text: 'Каталог', link: '/catalog'}, 
    {id: 2,
    text: 'Производители', link: '/manufacturers'},
    {id: 3,
    text: 'FAQ', link: '/faq'},
    {id: 4,
    text: 'Контакты', link: '/contacts'},
    {id: 5,
    text: 'Условия пользования', link: '/terms-of-use'},
    {id: 6,
    text: 'Политика конфиденциальности', link: '/privacy-policy'}
]
export const CATALOGUE_NAMES:{name: string; img: string}[] = [
  {name: 'Офисные приложения', img: ''},
  {name: 'Системное ПО', img: ''},
  {name: 'Мультимедиа', img: ''},
  {name: 'Конвекторы', img: ''},
  {name: 'Архиваторы', img: ''},
  {name: 'Безопасность', img: ''},
  {name: 'Интернет', img: ''},
  {name: 'ERP & CRM', img: ''},
];
export const FAQ_INFO: {
    id: number;
    question: string;
    answer: string[];
}[] = [
    {id: 1, question: 'Где найти свой оплаченный заказ?', answer: ['Посетите личный кабинет, раздел Мои покупки.']},
    {id: 2, question: 'Как с вами связаться?', answer: ['Все доступные способы связи на странице Контакты.']},
    {id: 3, question: 'Правила обмена и возврата', answer: ['По действующему российскому законодательству, покупатель может в течение 14 календарных дней вернуть любой товар без каких‑либо причин. В такой ситуации главное, чтобы продукция не была ни разу использована и сохранила свой первоначальный вид.', 'Стоит отметить, что программное обеспечение, различные приложения и операционные системы не подпадают под действие данного закона. Однако наши клиенты все равно могут воспользоваться таким правом в течение 14 дней со дня покупки. Нужно помнить, что вернуть можно лишь физические носители — диски. Ключи активации, полученные по электронной почте, не обладают такой гарантией.', 'Такой подход не прихоть, а мера безопасности от взлома компьютеров, хакерских атак и разработки вредоносных программ.']}
]

export const TITLE_FOR_BREADCRUMBS:  {
    id: number;
    title: string;
    url: string;
}[] = [{id: 1, title: 'Главная', url:''}, {id: 2, title: 'FAQ', url: 'faq'}]

export const CATEGORIZED_TEXT_VENDOR: {
    id: number;
    text: string;
}[]= [
    {id: 1,
    text: 'Фоторедактор'}, 
    {id: 2,
    text: 'Видеоредактор'},
    {id: 3,
    text: 'Векторная графика'},
    {id: 4,
    text: 'Дизайн'},
    {id: 5,
    text: 'Анимирование'},
    {id: 6,
    text: 'Web-разработка'},
    {id: 7,
    text: 'Adobe'},
    {id: 8,
    text: 'Аудиоредактор'},
]

export const SELECT_OPTIONS: {
    label: string;
    value: string;
}[] = [
    {
      value: 'popularity',
      label: 'По популярности',
    },
    {
      value: 'recency',
      label: 'По новизне',
    },
    {
      value: 'price',
      label: 'По цене',
    },
  ];
