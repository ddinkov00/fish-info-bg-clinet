import type { Dayjs } from 'dayjs';

import { EMPTY_STRING } from './constants';

const mapMonthToString = (month: number) => {
  switch (month) {
    case 0:
      return 'Януари';
    case 1:
      return 'Февруари';
    case 2:
      return 'Март';
    case 3:
      return 'Април';
    case 4:
      return 'Май';
    case 5:
      return 'Юни';
    case 6:
      return 'Юли';
    case 7:
      return 'Август';
    case 8:
      return 'Септември';
    case 9:
      return 'Октомври';
    case 10:
      return 'Ноември';
    case 11:
      return 'Декември';
    default:
      return EMPTY_STRING;
  }
};

export const mapDateToDayAndMonth = (date: Dayjs): string => {
  return `${date.date()} ${mapMonthToString(date.month())}`;
};
