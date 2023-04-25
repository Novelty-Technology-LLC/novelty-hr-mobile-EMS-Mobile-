import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import colors from "../../assets/colors";
import { globalStyle } from "../../assets/styles";

export const CustomTabBar = ({
  state,
  descriptors,
  navigation,
  children,
  tabButtonStyle,
}: {
  state: any;
  appBarStyle?: StyleProp<ViewStyle>;
  descriptors: any;
  navigation: any;
  children: React.ReactNode;
  tabButtonStyle: StyleProp<ViewStyle>;
}) => {
  return (
    <View>
      {children}

      <View
        style={{
          flexDirection: "row",
        }}
      >
        {state.routes.map((route: any, index: any) => {
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
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
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
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={tabButtonStyle}
              key={index.toString()}
            >
              <View
                style={[
                  {
                    borderBottomWidth: isFocused ? 2 : 0,
                    borderBottomColor: isFocused
                      ? colors.primary
                      : colors.transparent,
                  },
                  globalStyle.button,
                ]}
              >
                <Text style={[isFocused ? {} : {}]}>{label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
