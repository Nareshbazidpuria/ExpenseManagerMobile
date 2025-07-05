import { Text, TouchableOpacity } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { primary } from '../utils/global';

const Bicon = ({
  title,
  name,
  bg = primary,
  onPress,
  cls,
  txtCls,
  disabled,
}) => (
  <TouchableOpacity
    className={`flex flex-row items-center gap-1 p-2 rounded w-22 justify-center border ${
      disabled ? 'opacity-60' : ''
    } ${cls}`}
    onPress={onPress}
    // eslint-disable-next-line react-native/no-inline-styles
    style={{
      backgroundColor: bg,
      borderColor: bg !== primary ? bg : 'transparent',
    }}
    disabled={disabled}
  >
    <Text className={`${bg === primary ? 'text-white' : ''} ${txtCls}`}>
      {title}
    </Text>
    <IonIcon name={name} size={15} color={bg === primary ? '#fff' : 'black'} />
  </TouchableOpacity>
);

export default Bicon;
