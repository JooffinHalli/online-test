module.exports = [
  {
    id: 1,
    question: 'Что такое yaml?',
    type: 'radio',
    responses: [
      { id: 1, content: 'Язык разметки' },
      { id: 2, content: 'Не язык разметки' }
    ]
  },
  {
    id: 2,
    question: 'Что из перечисленного не является ООП принципом?',
    type: 'checkbox',
    responses: [
      { id: 1, content: 'Наследование' },
      { id: 2, content: 'Замыкание' },
      { id: 3, content: 'Инкапсуляция' },
      { id: 4, content: 'Декомпозиция' },
      { id: 5, content: 'Полиморфизм' }
    ]
  },
  {
    id: 3,
    question: 'Что из перечисленного язык программирования?',
    type: 'radio',
    responses: [
      { id: 1, content: 'Jenkins' },
      { id: 2, content: 'Go' },
      { id: 3, content: 'Git' },
      { id: 4, content: 'Html' },
      { id: 5, content: 'Oracle' }
    ]
  },
  {
    id: 4,
    question: 'Какова сложность? <pre>[1, 2, 3].reduce((acc, item) => ([...acc, item], acc))</pre>',
    type: 'radio',
    responses: [
      { id: 1, content: 'константная' },
      { id: 2, content: 'линейная' },
      { id: 3, content: 'логарифмическая' },
      { id: 4, content: 'квадратичная' }
    ]
  },
  {
    id: 5,
    question: 'Что такое инкапсуляция в ООП?',
    type: 'textarea'
  },
  {
    id: 6,
    question: 'Как расшифровывается DRY?',
    type: 'input'
  },
  {
    id: 7,
    question: 'Какие плюсы и минусы есть у мьютабельности?',
    type: 'textarea'
  },
  {
    id: 8,
    question: 'Javascript это:',
    type: 'radio',
    responses: [
      { id: 1, content: 'функциональный ЯП' },
      { id: 2, content: 'объектно ориентированный ЯП' },
      { id: 3, content: 'Свой вариант', type: 'textarea' }
    ]
  },
  {
    id: 9,
    question: 'Реакт это фреймворк или библиотека?',
    type: 'textarea'
  },
  {
    id: 10,
    question: 'Сколько типов данных в js?',
    type: 'input'
  }
];