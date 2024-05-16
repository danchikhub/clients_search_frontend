const moment = require('moment')
 function hasInnValidLength(inn) {
  return inn.length === 14 && !inn.match(/\D/g);
}

/***
 * Функция парсит строку ИНН.
 * @param inn
 * @throws Error - при ошибке валидации ИНН
 */
function parseINN(inn) {
  if (!(inn.length === 14 && !inn.match(/\D/g))) {
    throw new Error('ИНН должен состоять из 14-ти цифр');
  }

  const firstSymbol = inn.slice(0, 1);
  if (!['1', '2'].includes(firstSymbol)) {
    throw new Error('Неверный формат ИНН. Первая цифра может быть 1 или 2.');
  }

  const birthDate = moment(inn.slice(1, 9), 'DDMMYYYY');

  if (!birthDate.isValid()) {
    throw new Error('Неверный формат ИНН. Дата рождения недействительна');
  }

  return {
    isMale: firstSymbol === '1',
    birthDate,
  };
}

module.exports = parseINN