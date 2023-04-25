import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { View } from "react-native";
import { profileStyles } from "../../../assets/styles/profile";
import { CustomTabBar } from "../../common/customTabBar";
import { ProfileInfoComponent } from "../../common/profileInformation";

const Tab = createMaterialTopTabNavigator();

export const ProfileTab = () => {
  return (
    <View style={{}}>
      <Tab.Navigator
        tabBar={(props: any) => (
          <CustomTabBar appBarStyle={profileStyles.benifitsTabbar} {...props} />
        )}
      >
        <Tab.Screen name="Membership" component={ProfileInfoComponent} />
        <Tab.Screen name="Transaction" component={ProfileInfoComponent} />
      </Tab.Navigator>
    </View>
  );
};
