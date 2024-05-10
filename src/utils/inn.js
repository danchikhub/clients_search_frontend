import moment from 'moment';

export function hasInnValidLength(inn) {
  return inn.length === 14 && !inn.match(/\D/g);
}

/***
 * Функция парсит строку ИНН.
 * @param inn
 * @throws Error - при ошибке валидации ИНН
 */
export function parseINN(inn) {
  if (!hasInnValidLength(inn)) {
    throw new Error('ИНН должен состоять из 14-ти цифр');
  }

  const firstSymbol = inn.slice(0, 1);
  if (!['1', '2'].includes(firstSymbol)) {
    throw new Error('Неверный формат ИНН. Первая цифра может быть 1 или 2.');
  }

  const birthDate = moment(inn.slice(1, 9), 'DDMMYYYY');
  console.log('birthDate', birthDate)
  if (!birthDate.isValid()) {
    throw new Error('Неверный формат ИНН. Дата рождения недействительна');
  }

  return {
    isMale: firstSymbol === '1',
    birthDate,
  };
}