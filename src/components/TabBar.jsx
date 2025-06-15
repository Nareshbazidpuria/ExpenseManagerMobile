import { Text, TouchableOpacity, View } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { primary } from "../utils/common";

const TabBar = ({ state, descriptors, navigation }) => (
  <View style={tw`flex-row bg-white items-end h-15`}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key],
        label = options.tabBarLabel || options.title || route.name,
        isFocused = state.index === index;

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

      return (
        <TouchableOpacity
          key={"tabbar-" + index}
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          style={tw`flex-1 items-center py-2`}
        >
          <View
            style={tw`absolute h-8 w-16 bg-white ${
              isFocused
                ? "bottom-7 rounded-b-full bg-[#f2f2f2] p-4"
                : "bottom-6"
            }`}
          />
          <View
            style={tw`absolute bg-white ${
              isFocused ? "bottom-8 rounded-full p-4 shadow-sm" : "bottom-6"
            }`}
          >
            <IonIcon
              size={24}
              color={isFocused ? primary : "gray"}
              name={
                {
                  Groups: "home-outline",
                  Own: "wallet-outline",
                  Report: "pie-chart-outline",
                  Profile: "person-outline",
                }[label]
              }
            />
          </View>
          <Text style={tw`font-bold text-[${isFocused ? primary : "#787878"}]`}>
            {label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default TabBar;
