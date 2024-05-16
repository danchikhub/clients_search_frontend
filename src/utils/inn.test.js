const parseINN = require('./innRequire')
const moment = require('moment')
describe('parseINN', () => {
  test('возвращает объект с isMale равным true для мужского ИНН', () => {
    const inn = '11505202401234';
    const result = parseINN(inn);
    expect(result.isMale).toBe(true);
  });

  test('возвращает объект с isMale равным false для женского ИНН', () => {
    const inn = '21505202401234';
    const result = parseINN(inn);
    expect(result.isMale).toBe(false);
  });

  test('возвращает объект с правильной датой рождения', () => {
    const inn = '21505202401234';
    const result = parseINN(inn);
    const expectedDate = moment('15052024', 'DDMMYYYY').format('DDMMYYYY');
    expect(result.birthDate.format('DDMMYYYY')).toBe(expectedDate);
  });

  test('выбрасывает ошибку, если ИНН не состоит из 14 цифр', () => {
    const inn = '1234567890';
    expect(() => {
      parseINN(inn);
    }).toThrow('ИНН должен состоять из 14-ти цифр');
  });

  test('выбрасывает ошибку, если первая цифра ИНН не 1 или 2', () => {
    const inn = '32345678901234';
    expect(() => {
      parseINN(inn);
    }).toThrow('Неверный формат ИНН. Первая цифра может быть 1 или 2.');
  });

  test('выбрасывает ошибку, если дата рождения недействительна', () => {
    const inn = '12293428901234'; // Неверный месяц (29 февраля в невисокосном году)
    expect(() => {
      parseINN(inn);
    }).toThrow('Неверный формат ИНН. Дата рождения недействительна');
  });
});