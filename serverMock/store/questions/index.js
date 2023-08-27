module.exports = [
  {
    id: 1,
    question: 'Что такое yaml?',
    isMulti: false,
    responses: [
      { id: 1, content: 'Язык разметки' },
      { id: 1, content: 'Не язык разметки' }
    ]
  },
  {
    id: 2,
    question: 'Что из перечисленного не является ООП принципом',
    isMulti: true,
    responses: [
      { id: 1, content: 'Наследование' },
      { id: 2, content: 'Замыкание' },
      { id: 3, content: 'Инкапсуляция' },
      { id: 4, content: 'Декомпозиция' },
      { id: 5, content: 'Полиморфизм' }
    ]
  },
  {
    id: 1,
    question: 'Что из перечисленного язык программирования?',
    isMulti: false,
    responses: [
      { id: 1, content: 'Jenkins' },
      { id: 1, content: 'Go' },
      { id: 1, content: 'Git' },
      { id: 1, content: 'Html' },
      { id: 1, content: 'Oracle' }
    ]
  },
  {
    id: 1,
    question: 'Какова сложность <pre>[1, 2, 3].reduce(acc, item => ([...acc, item], acc))</pre>?',
    isMulti: true,
    responses: [
      { id: 1, content: 'константная' },
      { id: 1, content: 'линейная' },
      { id: 1, content: 'логарифмическая' },
      { id: 1, content: 'квалратичная' }
    ]
  }
];