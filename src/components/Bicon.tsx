import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { primary } from '../utils/global';

const Bicon = ({
  title = '',
  name = '',
  bg = primary,
  onPress = () => {},
  cls = '',
  txtCls = '',
  disabled = false,
  borderColor = '',
  txtStyle = {},
  loading = false,
}) => (
  <TouchableOpacity
    className={`flex flex-row items-center gap-1 p-2 rounded w-22 justify-center border ${
      disabled ? 'opacity-60' : ''
    } ${cls}`}
    onPress={onPress}
    // eslint-disable-next-line react-native/no-inline-styles
    style={{
      backgroundColor: bg,
      borderColor: borderColor || (bg !== primary ? bg : 'transparent'),
    }}
    disabled={disabled || loading}
  >
    <Text
      className={`${bg === primary ? 'text-white' : ''} ${txtCls}`}
      style={txtStyle}
    >
      {title}
    </Text>
    {loading && (
      <ActivityIndicator
        size={20}
        color={borderColor || (bg !== primary ? bg : '#ffffff')}
      />
    )}
    {name && (
      <IonIcon
        name={name}
        size={15}
        color={bg === primary ? '#fff' : 'black'}
      />
    )}
  </TouchableOpacity>
);

export default Bicon;
