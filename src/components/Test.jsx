import { Text, TouchableHighlight } from "react-native";
import Swipeable from "react-native-swipeable";

const leftContent = <Text>Pull to activate</Text>;

const rightButtons = [
  <TouchableHighlight>
    <Text>Button 1</Text>
  </TouchableHighlight>,
  <TouchableHighlight>
    <Text>Button 2</Text>
  </TouchableHighlight>,
];

export default function MyListItem() {
  return (
    <Swipeable rightButtons={rightButtons} rightButtonsOpen={false}>
      <Text>My swipeable content</Text>
    </Swipeable>
  );
}
