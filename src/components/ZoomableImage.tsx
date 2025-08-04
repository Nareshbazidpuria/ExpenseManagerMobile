import React from 'react';
import { Image, View } from 'react-native';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const ZoomableImage = ({ uri }) => {
  const scale = useSharedValue(1);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: event => {
      scale.value = event.scale;
    },
    onEnd: () => {
      scale.value = 1;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View>
        <Animated.Image
          source={{ uri }}
          style={[{ width: '100%', height: 400 }, animatedStyle]}
          resizeMode="contain"
        />
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default ZoomableImage;
