import { TouchableOpacity, View } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { primary } from "../utils/common";

const TabBar = ({ state, descriptors, navigation }) => (
  <View style={tw`flex-row bg-white`}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name, route.params);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: "tabLongPress",
          target: route.key,
        });
      };

      return (
        <TouchableOpacity
          key={"tabbar-" + index}
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          style={tw`flex-1 items-center py-2 bg-[${
            isFocused ? primary : "#ffffff"
          }]`}
        >
          <IonIcon
            size={label === "Report" ? 22 : 28}
            color={isFocused ? "white" : "gray"}
            name={
              {
                Team: "people-circle-outline",
                Groups: "people-circle-outline",
                Own: "person-circle-outline",
                Report: "stats-chart",
              }[label]
            }
          />
        </TouchableOpacity>
      );
    })}
  </View>
);

export default TabBar;
