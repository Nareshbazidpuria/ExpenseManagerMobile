import * as React from 'react';
import { Platform, Pressable, View } from 'react-native';
import { Text } from '@react-navigation/elements';
import { useTheme } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { active, background, primary, screens } from '../utils/global';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const TabBar = ({ descriptors, navigation, state }: BottomTabBarProps) => {
  const { colors } = useTheme();

  return (
    <View className="absolute bottom-0 w-full">
      <LinearGradient
        colors={['transparent', '#00000050']}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          className={`rounded-full flex-row justify-around w-4/5 z-10 mt-2 ${
            Platform.OS === 'ios' ? 'mb-6' : 'mb-3'
          }`}
          style={{ backgroundColor: background }}
        >
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
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && event && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () =>
              navigation.emit({ type: 'tabLongPress', target: route.key });

            return (
              <Pressable
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                className="flex items-center justify-center p-3"
                key={route.key}
              >
                <View
                  className="flex flex-row gap-2 rounded-full items-center justify-center py-1 px-2"
                  style={{
                    backgroundColor: isFocused ? active : background,
                  }}
                >
                  <IonIcon
                    size={20}
                    color={isFocused ? primary : 'gray'}
                    name={
                      {
                        [screens.Home]: 'home',
                        [screens.Insights]: 'analytics',
                        [screens.Reports]: 'pie-chart',
                        [screens.Profile]: 'person-circle',
                      }[typeof label !== 'function' ? label : screens.Home] ||
                      'home'
                    }
                  />
                  {isFocused && (
                    <Text
                      className="p-1 rounded-full"
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{ color: primary, fontWeight: 700 }}
                    >
                      {typeof label === 'function'
                        ? label({
                            focused: isFocused,
                            color: colors.primary,
                            position: 'beside-icon',
                            children: '',
                          })
                        : label}
                    </Text>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      </LinearGradient>
    </View>
  );
};

export default TabBar;
