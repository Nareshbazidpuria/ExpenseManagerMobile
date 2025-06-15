import { Image, Pressable, Text, View } from "react-native";
import tw from "twrnc";
import { primary } from "../utils/common";
import n from "../assets/n.gif";
import Partner from "../assets/Partner.jpg";
import Popup from "./Popup";
import IonIcon from "@expo/vector-icons/Ionicons";
import { useState } from "react";

const Avatar = ({ value, w = 10 }) => {
  const originalValue = value?.trim?.();
  value = value
    ?.split(" ")
    ?.map((chars) => chars?.[0])
    ?.join("");

  const [visible, setVisible] = useState();

  const renderAvatar = (value, w = 10) => (
    <Pressable onPress={() => setVisible(true)}>
      {["Nᴀʀᴇsʜ Bᴀᴢɪᴅᴘᴜʀɪᴀ", "Naresh Bazidpuria"].includes(originalValue) ? (
        <View
          style={tw`rounded-full overflow-hidden border border-[${primary}]`}
        >
          <Image source={n} style={tw`h-[${w}] w-[${w}] rounded-full `} />
        </View>
      ) : ["Tanvi Negi"].includes(originalValue) ? (
        <View
          style={tw`rounded-full overflow-hidden border border-[${primary}]`}
        >
          <Image source={Partner} style={tw`h-[${w}] w-[${w}] rounded-full `} />
        </View>
      ) : (
        <View
          style={tw`bg-[${
            { S: "#6e0b65", SN: "#6e0b65", HB: "#0f4bab", H: "#0f4bab" }[
              value
            ] || primary
          }] h-[${w}] w-[${w}] rounded-full flex justify-center items-center`}
        >
          <Text
            style={tw`text-${
              w >= 10 ? (w >= 40 ? "5xl" : "xl") : "xs"
            } font-bold text-white text-center`}
          >
            {originalValue === "New Group"
              ? originalValue
              : value?.substring(0, 2)}
          </Text>
        </View>
      )}
    </Pressable>
  );
  return (
    <>
      {renderAvatar(value, w)}
      {visible && (
        <Popup
          cls="p-0 w-60"
          content={
            <>
              <IonIcon
                name="close"
                size={24}
                style={tw`text-right px-2 pt-1`}
                onPress={() => setVisible(false)}
              />
              <Text style={tw`mx-auto pb-2`}> {renderAvatar(value, 50)}</Text>
              <Text style={tw`bg-[#00000020] p-2 text-center text-lg`}>
                {originalValue}
              </Text>
            </>
          }
        />
      )}
    </>
  );
};

export default Avatar;
