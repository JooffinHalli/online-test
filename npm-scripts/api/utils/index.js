module.exports = {
  Files: require('./Files'),
  Git: require('./Git'),
  Link: require('./Link'),
  Logger: require('./Logger'),
  Path: require('./Path'),
  Process: require('./Process'),
  Template: require('./Template'),

  /** Проверяет является ли объектом или массивом */
  isObj: (x) => (typeof x === 'object') && (x !== null),

  /** Приводит объект к строке, и приводит его к надлежащему виду */
  toString: (obj) => {
    return JSON.stringify(obj, null, 2)
      .replaceAll(/(")(\w*)(")(:)/g, (match, p1, p2) => `${p2}:`) // убрали кавычки у ключей
      .replaceAll(/(")/g, "'") // поменяли двойные ковычки на одинарные
      .replaceAll(/('__)(.*)(__')/g, (match, p1, p2) => p2); // вырезали служебные экранирующие символы
  },

  /** Поля в openApi, с которыми не нужно работать */
  ignoredFields: {
    'summary': true,
    'description': true,
    'tags': true,
    'title': true,
    'example': true,
    'format': true
  }
}