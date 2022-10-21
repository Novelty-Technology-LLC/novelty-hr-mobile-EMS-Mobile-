import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import {
  cardStyle,
  dashboardStyle,
  headerTxtStyle,
  listingStyle,
} from "../../../assets/styles";
import { header as Header } from "../../common";
import { navigate } from "../../utils/navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import normalize from "react-native-normalize";
import { MenuContext } from "../../reducer/menuReducer";

export const MenuListing = ({ route }: { route: any }) => {
  const { menu } = useContext(MenuContext);
  const items = menu.items;

  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>Menu</Text>
      </Header>
      <FlatList
        data={items}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => navigate("editMenu", { item })}>
              <View
                style={[
                  listingStyle.container,
                  dashboardStyle.markingBody,
                  { borderBottomWidth: items.length - 1 === index ? 0 : 1 },
                ]}
              >
                <View>
                  <Text style={cardStyle.titleText}>{item.title}</Text>
                  <Text style={[cardStyle.subTitleText, dashboardStyle.gap]}>
                    {item.subTitle}
                  </Text>
                </View>

                <Icon name="chevron-right" size={normalize(25)} />
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item?.id}
      />
    </View>
  );
};
