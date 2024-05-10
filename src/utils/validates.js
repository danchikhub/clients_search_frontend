import moment from 'moment/moment';

export function validateBirthDate(date) {
  const f = 'YYYY.MM.DD';
  if (!moment(date, f).isValid()) return;
  if (!moment(date, f).isBefore(moment(new Date(), f))) return 'Дата рождения не может быть в будущем';
}