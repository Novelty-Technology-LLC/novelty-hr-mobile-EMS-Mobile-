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
import { AuthContext } from "../../reducer";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export const MenuListing = ({ route }: { route: any }) => {
  const { menu } = useContext(MenuContext);
  const { state }: any = useContext(AuthContext);

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
            <TouchableWithoutFeedback
              disabled={
                state.user?.is_default_approver &&
                state.user?.is_default_approver == 1
                  ? false
                  : true
              }
              onPress={() => navigate("editMenu", { item })}
            >
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

                {state.user?.is_default_approver &&
                  state.user?.is_default_approver == 1 && (
                    <Icon name="chevron-right" size={normalize(25)} />
                  )}
              </View>
            </TouchableWithoutFeedback>
          );
        }}
        keyExtractor={(item) => item?.id}
      />
    </View>
  );
};
