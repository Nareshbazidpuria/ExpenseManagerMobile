import { Pressable, Text } from 'react-native';
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
  <Pressable
    className={`flex flex-row items-center gap-1 p-2 bg-[${bg}] rounded w-22 justify-center border ${
      disabled ? 'opacity-60' : ''
    } ${bg !== primary ? 'border-gray-300' : `border-[${primary}]`} ${cls}`}
    onPress={onPress}
    disabled={disabled}
  >
    <Text className={`${bg === primary ? 'text-white' : ''} ${txtCls}`}>
      {title}
    </Text>
    <IonIcon
      name={name}
      size={15}
      color={`${bg === primary ? '#fff' : 'black'}`}
    />
  </Pressable>
);

export default Bicon;
