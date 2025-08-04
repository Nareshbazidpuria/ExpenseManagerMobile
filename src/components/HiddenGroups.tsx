import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Bicon from './Bicon';
import { useEffect, useState } from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { groupListAPI } from '../api/apis';
import { primary } from '../utils/global';

const HiddenGroups = ({ setContent, hiddenGroups, unhide }) => {
  const [selected, setSelected] = useState([]),
    [list, setList] = useState([]),
    [loading, setLoading] = useState();

  const groupList = async () => {
    let data = [];
    try {
      setLoading(true);
      setSelected([]);
      const res = await groupListAPI({ hiddenGroups });
      if (res?.status === 200) data = res?.data?.data;
    } catch (error) {
      console.log(error?.data || error);
    } finally {
      setLoading(false);
      setList(data);
    }
  };

  useEffect(() => {
    groupList();
  }, [hiddenGroups]);

  return (
    <View className={`p-2`}>
      {hiddenGroups.length ? (
        <View>
          <Text className={`text-center font-bold text-lg`}>Hidden Groups</Text>
          <ScrollView className={`max-h-70`}>
            {loading ? (
              <View className={`p-20`}>
                <ActivityIndicator color={primary} size={50} />
              </View>
            ) : (
              list.map(({ _id, name }, i) => (
                <Pressable
                  key={'hidden-groups-' + i}
                  className={`flex flex-row justify-between p-2 bg-green-50 rounded mb-1`}
                  onPress={
                    selected.includes(_id)
                      ? setSelected.bind(
                          {},
                          [...selected].filter(id => id !== _id),
                        )
                      : setSelected.bind({}, [...selected, _id])
                  }
                >
                  <Text>{name}</Text>
                  <IonIcon
                    name={
                      selected.includes(_id) ? 'ellipse' : 'ellipse-outline'
                    }
                    color={primary}
                    size={20}
                  />
                </Pressable>
              ))
            )}
          </ScrollView>
          <View className={`flex flex-row justify-between mt-2`}>
            <Bicon
              title="Cancel"
              cls="w-[48%]"
              bg="#ffffff"
              txtCls="font-bold text-base"
              onPress={() => setContent(null)}
            />
            <Bicon
              title="Make Visible"
              cls="w-[48%]"
              txtCls="font-bold text-base"
              disabled={!selected.length}
              onPress={unhide.bind({}, selected)}
            />
          </View>
        </View>
      ) : (
        <View className={`mx-5`}>
          <Text className={`text-center font-bold text-lg mb-5`}>
            You don't have any hidden group!
          </Text>
          <Bicon
            title="Ok"
            cls="w-full"
            txtCls="font-bold text-base"
            onPress={setContent.bind({}, null)}
          />
        </View>
      )}
    </View>
  );
};

export default HiddenGroups;
