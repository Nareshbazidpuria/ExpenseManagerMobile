import {Dimensions, GestureResponderEvent} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export const useSwipe = (
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  rangeOffset: number = 4,
) => {
  let firstTouch = 0,
    firstTouchY = 0;

  const onTouchStart = (e: GestureResponderEvent) => {
    firstTouch = e.nativeEvent.pageX;
    firstTouchY = e.nativeEvent.pageY;
  };

  const onTouchEnd = (e: GestureResponderEvent) => {
    const positionX = e.nativeEvent.pageX,
      range = windowWidth / rangeOffset;

    if (Math.abs(firstTouchY - e.nativeEvent.pageY) < 120) {
      // eslint-disable-next-line curly
      if (positionX - firstTouch > range) onSwipeRight?.();
      // eslint-disable-next-line curly
      else if (firstTouch - positionX > range) onSwipeLeft?.();
    }
  };

  return {onTouchStart, onTouchEnd};
};
