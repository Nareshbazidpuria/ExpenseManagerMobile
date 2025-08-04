import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import Bicon from './Bicon';
import { useState } from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { primary } from '../utils/global';

const Options = ({ setContent, options = [], update }) => {
  const [opts, setOpts] = useState(options),
    [typing, setTyping] = useState('');

  return (
    <View className={`mx-5`}>
      <Text className={`text-center font-bold text-lg mb-2`}>
        Expense Options
      </Text>
      <ScrollView className={`max-h-50`}>
        {opts.map((opt, i) => (
          <View
            className={`bg-green-50 px-2 py-1 mb-1 rounded flex flex-row items-center justify-between`}
            key={'opts-' + i}
          >
            <Text className={`text-sm font-semibold`}>
              {i + 1}. {opt}
            </Text>
            <IonIcon
              name="close"
              onPress={setOpts.bind(
                {},
                [...opts].filter((_, index) => index !== i),
              )}
            />
          </View>
        ))}
      </ScrollView>
      <View className={`flex flex-row items-end justify-between`}>
        <TextInput
          value={typing}
          onChangeText={setTyping}
          placeholder="Enter here"
          className={`border-b border-gray-400 h-10 p-0 w-[85%]`}
        />
        <Pressable
          className={`p-1 rounded-full`}
          style={{ backgroundColor: primary }}
          onPress={() => {
            if (typing) {
              setOpts([...opts, typing.trim()]);
              setTyping('');
            }
          }}
        >
          <IonIcon className={`text-white`} name="add" size={16} />
        </Pressable>
      </View>
      <View className={`flex flex-row justify-between mt-4`}>
        <Bicon
          title="Cancel"
          cls="w-[48%]"
          bg="#ffffff"
          txtCls="font-bold text-base"
          onPress={setContent.bind({}, null)}
        />
        <Bicon
          title="Update"
          cls="w-[48%]"
          txtCls="font-bold text-base"
          onPress={update.bind({}, { options: opts })}
        />
      </View>
    </View>
  );
};

export default Options;
