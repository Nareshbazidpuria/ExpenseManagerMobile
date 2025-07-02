import { Pressable, Text, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const ProfileOpt = ({ label, icon, onPress, value, extra, extraValue }) => (
  <Pressable
    className={`px-5 py-2 border-b border-gray-300 flex flex-row items-center gap-5`}
    onPress={onPress}
  >
    <IonIcon name={icon} size={20} />
    <View>
      <Text className={`font-semibold`}>{label}</Text>
      {value && (
        <Text selectable={true} className={`text-gray-500 text-xs`}>
          {value}
        </Text>
      )}
      {extraValue}
    </View>
    {extra}
  </Pressable>
);
export default ProfileOpt;
