import React from 'react';
import { Dimensions, Modal, View } from 'react-native';

const Popup: React.FC<{
  content: React.ReactNode;
  cls?: string;
  visible?: boolean;
  height?: number;
  width?: number;
}> = ({ content, cls = '', visible = true, height, width }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View
        className={`bg-[#00000055] flex items-center pb-16 justify-center`}
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
        }}
      >
        <View
          // style={{
          //   width: width || Dimensions.get('screen').width - 40,
          //   height: height || Dimensions.get('screen').width,
          // }}
          className={`bg-white rounded m-4 ${cls}`}
        >
          {content}
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
