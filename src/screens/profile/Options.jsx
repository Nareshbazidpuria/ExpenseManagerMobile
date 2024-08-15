import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import tw from "twrnc";
import Bicon from "../../components/Bicon";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { primary } from "../../utils/common";

const Options = ({ setContent, options = [], update }) => {
  const [opts, setOpts] = useState(options),
    [typing, setTyping] = useState("");

  return (
    <View style={tw`mx-5`}>
      <Text style={tw`text-center font-bold text-lg mb-2`}>
        Expense Options
      </Text>
      <ScrollView style={tw`max-h-50`}>
        {opts.map((opt, i) => (
          <View
            style={tw`bg-green-50 px-2 py-1 mb-1 rounded flex flex-row items-center justify-between`}
            key={"opts-" + i}
          >
            <Text style={tw`text-sm font-semibold`}>
              {i + 1}. {opt}
            </Text>
            <Ionicons
              name="close"
              onPress={setOpts.bind(
                {},
                [...opts].filter((_, index) => index !== i)
              )}
            />
          </View>
        ))}
      </ScrollView>
      <View style={tw`flex flex-row items-end justify-between`}>
        <TextInput
          value={typing}
          onChangeText={setTyping}
          placeholder="Enter here"
          style={tw`border-b border-gray-400 h-10 p-0 w-[85%]`}
        />
        <Pressable
          style={tw`bg-[${primary}] p-1 rounded-full`}
          onPress={() => {
            if (typing) {
              setOpts([...opts, typing.trim()]);
              setTyping("");
            }
          }}
        >
          <Ionicons style={tw`text-white`} name="add" size={16} />
        </Pressable>
      </View>
      <View style={tw`flex flex-row justify-between mt-4`}>
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
