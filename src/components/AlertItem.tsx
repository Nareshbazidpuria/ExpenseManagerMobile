import { Dimensions, Pressable, Text, View } from 'react-native';
import { expenseTypes, primary } from '../utils/global';
import moment from 'moment';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { readAlertAPI } from '../api/notification';

const AlertItem = ({ alert, navigation }: any) => {
  const {
    unread,
    user,
    group,
    time,
    amount,
    purpose,
    prevAmount,
    prevPurpose,
    _id,
  } = alert || {};

  const onPress = async () => {
    try {
      await readAlertAPI(_id);
      navigation.navigate('Expenses', {
        data: { ...group, type: expenseTypes.group },
      });
    } catch (error) {}
  };

  return (
    <Pressable
      className={`p-2 py-3 border-b border-gray-300 flex flex-row items-center gap-3`}
      style={{ backgroundColor: unread ? '#defff7' : '#ffffff' }}
      onPress={onPress}
    >
      <View className={`p-3 rounded-full`} style={{ backgroundColor: primary }}>
        <IonIcon name="notifications" size={20} color="white" />
      </View>
      <View
        style={{
          width: unread
            ? Dimensions.get('screen').width / 1.35
            : Dimensions.get('screen').width / 1.22,
        }}
      >
        <Text className={`mb-1`}>
          <Text className={`font-semibold`}>{user}</Text> has edited an expense
          from <Text className={`font-semibold`}>{group?.name}</Text>
        </Text>
        <View className={`flex flex-row items-center flex-wrap`}>
          <View className={`flex flex-row items-center gap-1 mr-2`}>
            <IonIcon name="arrow-back" color="red" />
            <Text>
              {prevPurpose} -&nbsp;
              <Text className={`font-semibold`}>₹{prevAmount}</Text>
            </Text>
          </View>
          <View className={`flex flex-row items-center gap-1`}>
            <IonIcon name="arrow-forward" color="green" />
            <Text>
              {purpose}&nbsp;-{' '}
              <Text className={`font-semibold`}>₹{amount}</Text>
            </Text>
          </View>
        </View>
        <View className={`flex flex-row items-center gap-1 mt-1`}>
          <IonIcon name="time" color="gray" />
          <Text className={`text-xs`}>
            {moment(time).format('DD MMM, YYYY hh:mm A')}
          </Text>
        </View>
      </View>
      {unread && (
        <View
          className={`p-1 rounded-full`}
          style={{ backgroundColor: primary }}
        />
      )}
    </Pressable>
  );
};
export default AlertItem;
