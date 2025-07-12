import moment from 'moment';
import { DateData } from 'react-native-calendars';

export const stringToDateData = (dateString: string): DateData => {
  const date = moment(dateString, 'YYYY-MM-DD');
  return {
    dateString: date.format('YYYY-MM-DD'),
    day: date.date(),
    month: date.month() + 1,
    year: date.year(),
    timestamp: date.valueOf(),
  };
};

export const getMarkedDates = (
  startDate: string,
  endDate?: string,
  color: string = '#00bcd4',
  textColor: string = 'white',
) => {
  const marked: any = {};

  const start = moment(startDate);
  const end = endDate ? moment(endDate) : start.clone();

  const current = start.clone();

  while (current.isSameOrBefore(end)) {
    const dateStr = current.format('YYYY-MM-DD');
    marked[dateStr] = { color, textColor };
    current.add(1, 'day');
  }

  // Mark boundaries
  marked[start.format('YYYY-MM-DD')].startingDay = true;
  marked[end.format('YYYY-MM-DD')].endingDay = true;

  return marked;
};
