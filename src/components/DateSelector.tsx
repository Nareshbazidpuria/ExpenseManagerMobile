import moment from 'moment';
import { Text, View } from 'react-native';
import { primary } from '../utils/global';
import IonIcon from 'react-native-vector-icons/Ionicons';

const DateSelector = ({ date, setDate, cls = '' }) => (
  <View
    className={`flex flex-row items-center justify-between p-2 ${cls}`}
    style={{ backgroundColor: primary }}
  >
    <IonIcon
      color={'white'}
      size={25}
      name="chevron-back-outline"
      onPress={() => setDate(moment(date).subtract(1, 'month'))}
    />
    <Text className={`text-xl text-white font-semibold`}>
      {moment(date).format('MMM YYYY')}
    </Text>
    {moment(date).startOf('month').toString() !==
    moment().startOf('month').toString() ? (
      <IonIcon
        color={'white'}
        size={25}
        name="chevron-forward-outline"
        onPress={() => setDate(moment(date).add(1, 'month'))}
      />
    ) : (
      <Text className={`w-5`} />
    )}
  </View>
);

export default DateSelector;
