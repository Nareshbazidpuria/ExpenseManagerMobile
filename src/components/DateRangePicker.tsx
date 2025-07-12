import React, { useEffect, useState } from 'react';
import { View, Modal } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import moment from 'moment';
import { primary } from '../utils/global';
import Bicon from './Bicon';
import { showToast } from '../utils/Toast';
import { getMarkedDates } from '../utils/common';

type Props = {
  range: {
    start: string | null;
    end: string | null;
  };
  setRange: React.Dispatch<
    React.SetStateAction<{
      start: string | null;
      end: string | null;
    }>
  >;
  value: {
    start: string | null;
    end: string | null;
  };
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const DateRangePicker: React.FC<Props> = ({ setShow, range, setRange }) => {
  const [markedDates, setMarkedDates] = useState({});

  const onDayPress = (day: DateData) => {
    const selected = day.dateString;

    if (moment(selected).isAfter(moment().endOf('day')))
      return showToast('error', 'Cannot select future date');

    if (!range.start || (range.start && range.end)) {
      setRange({ start: selected, end: null });
      setMarkedDates(getMarkedDates(selected, undefined, primary));
    } else {
      const start = moment(range.start);
      const end = moment(selected);

      if (end.isBefore(start)) {
        setRange({ start: selected, end: null });
        setMarkedDates(getMarkedDates(selected, undefined, primary));
      } else {
        setRange({ start: range.start, end: selected });
        setMarkedDates(getMarkedDates(range.start, selected, primary));
      }
    }
  };

  useEffect(() => {
    if (range.start && range.end) {
      setMarkedDates(getMarkedDates(range.start, range.end, primary));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal visible transparent animationType="slide">
      <View className="flex-1 bg-[#00000080] justify-center p-5">
        <View className="bg-white rounded p-4">
          <Calendar
            markingType="period"
            markedDates={markedDates}
            onDayPress={onDayPress}
            enableSwipeMonths
            theme={{
              selectedDayBackgroundColor: primary,
              todayTextColor: primary,
              arrowColor: primary,
            }}
          />

          <Bicon title="Done" cls="m-3" onPress={() => setShow(false)} />
        </View>
      </View>
    </Modal>
  );
};

export default DateRangePicker;
