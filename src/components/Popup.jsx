import { Dimensions, Modal, View } from "react-native";
import tw from "twrnc";

const Popup = ({ content, cls, visible = true }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View
        style={tw`bg-[#00000055] flex items-center pt-[200] h-[${
          Dimensions.get("screen").height / 4
        }]`}
      >
        <View style={tw`bg-white w-80 py-4 rounded shadow ${cls}`}>
          {content}
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
