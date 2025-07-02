import React from 'react';
import { Dimensions, Modal, View } from 'react-native';

const Popup: React.FC<{
  content: React.ReactNode;
  cls?: string;
  visible?: boolean;
}> = ({ content, cls = '', visible = true }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View
        className={`bg-[#00000055] flex items-center pt-[200] `}
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
        }}
      >
        <View
          style={{
            width: Dimensions.get('screen').width - 40,
            height: Dimensions.get('screen').width,
          }}
          className={`bg-white rounded shadow ${cls}`}
        >
          {content}
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
