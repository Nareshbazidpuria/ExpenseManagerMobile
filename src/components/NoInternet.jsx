import { Dimensions, Image, Modal, Text, View } from "react-native";
import tw from "twrnc";
import Bicon from "./Bicon";
import { primary } from "../utils/common";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import offline from "../assets/offline.gif";

const NoInternet = () => {
  const [visible, setVisible] = useState();

  useEffect(() => {
    if (!visible)
      NetInfo.fetch().then(({ isConnected }) => {
        setVisible(!isConnected);
      });
  }, [visible]);

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View
        style={tw`bg-[${primary}] flex items-center justify-center h-[${
          Dimensions.get("screen").height / 4
        }]`}
      >
        <View
          style={tw`bg-white w-[90%] p-4 rounded shadow flex items-center justify-center gap-3`}
        >
          <Text style={tw`text-xl font-bold text-center mb-2`}>
            {"You're offline. \n check your connection"}
          </Text>
          <Image style={tw`h-96 w-80`} source={offline} alt="Offline" />
          <Bicon
            title="Tap to retry"
            cls="w-full"
            onPress={() => setVisible(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default NoInternet;
