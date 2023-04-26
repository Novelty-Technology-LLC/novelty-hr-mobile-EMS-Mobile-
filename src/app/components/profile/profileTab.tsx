import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useContext } from "react";
import { View } from "react-native";
import normalize from "react-native-normalize";
import { profileStyles } from "../../../assets/styles/profile";
import { ProfileInfoComponent } from "../../common/profileInformation";
import { InventoryInfo } from "../../common/inventoryInfo";
import colors from "../../../assets/colors";

const Tab = createMaterialTopTabNavigator();

export const ProfileTab = ({ user }: any) => {
  return (
    <Tab.Navigator
      // tabBar={() => <></>}
      tabBarShowLabel={false}
      tabBarOptions={{
        tabStyle: { backgroundColor: colors.white },
        style: {
          marginTop: 0,
        },
      }}
    >
      <Tab.Screen
        name="Profile Information"
        component={ProfileInfoComponent}
        initialParams={{ user }}
      />
      <Tab.Screen name="Assigned Inventory" component={InventoryInfo} />
    </Tab.Navigator>
  );
};
