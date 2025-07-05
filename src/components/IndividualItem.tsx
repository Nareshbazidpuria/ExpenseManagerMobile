import { Pressable, Text, View } from 'react-native';
import Avatar from './Avatar';
import moment from 'moment';
import IonIcon from 'react-native-vector-icons/Ionicons';

const IndividualItem = ({ avatar, e, onPress }) => (
  <Pressable
    className={`flex flex-row items-center gap-2 min-w-1/2 my-1`}
    onLongPress={onPress}
  >
    <Avatar value={avatar} />
    <View>
      <View className={`flex flex-row items-center gap-2`}>
        {e?.edited && <IonIcon name="pencil" color="gray" />}
        <Text>{e?.purpose}:</Text>
        <Text className={`font-semibold text-base`}>₹{e?.amount}</Text>
      </View>
      <Text style={{ fontSize: 11 }}>
        {moment(e?.createdAt).format('hh:mm A DD-MM-YY')}
      </Text>
    </View>
  </Pressable>
);

export default IndividualItem;
