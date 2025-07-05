import { Pressable, Text, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { primary } from '../utils/global';

const CollapsibleHeader = ({ col, setCol, Key, title }) => {
  return (
    <>
      <Pressable
        onPress={() =>
          setCol({
            ...col,
            [Key]: !(col?.[Key] || !col?.hasOwnProperty?.(Key)),
          })
        }
        style={{ backgroundColor: primary }}
        className={`p-2 flex flex-row justify-between items-center mt-2`}
      >
        <Text className={`text-white text-base font-semibold`}>{title}</Text>
        <View className={`flex flex-row gap-2 items-center`}>
          <IonIcon
            className={`text-base text-white`}
            name={`chevron-${
              col?.[Key] || !col?.hasOwnProperty?.(Key) ? 'forward' : 'down'
            }-outline`}
          />
        </View>
      </Pressable>
    </>
  );
};

export default CollapsibleHeader;
