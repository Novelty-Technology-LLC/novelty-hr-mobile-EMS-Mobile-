import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import normalize from "react-native-normalize";
import colors from "../../../assets/colors";
import {
  cardStyle,
  headerTxtStyle,
  listingStyle,
  requestStyle,
} from "../../../assets/styles";
import { EmptyContainer, header as Header } from "../../common";
import State from "../../components/leave_screen/state";
import { ListPlaceholder } from "../../components/loader/listPlaceHolder";
import { getList } from "../../services";
import { transformList } from "../../utils/listtranform";
import { ListingCard } from "./leaveListingCard";
import { navigate } from "../../utils/navigation";
import { AuthContext } from "../../reducer";

const LeaveListing = (props: any) => {
  const { state } = useContext(AuthContext);

  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState<any>(null);

  useEffect(() => {
    getallLeaveListing(props?.route?.params?.route);
  }, []);

  const getallLeaveListing = async (routeName: string) => {
    setLoading(true);
    const data = await getList(routeName);
    setLoading(false);
    setList(data);
  };

  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>LEAVE</Text>
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ListPlaceholder />
        ) : list?.length ? (
          transformList(
            list,
            "Leave",
            true,
            false,
            props?.route?.params?.module === "Leave" ? true : false
          ).map((item, index) => {
            return (
              <TouchableOpacity
                disabled={
                  state.user.is_approver !== "1" ||
                  state.user.is_approver !== "1"
                }
                onPress={() => {
                  navigate("leaveDetail", {
                    data: item,
                  });
                }}
              >
                <ListingCard index={index} item={item} list={list.length} />
              </TouchableOpacity>
            );
          })
        ) : (
          <EmptyContainer
            text={`${"No Upcoming Leave"}`}
            containerStyle={{
              backgroundColor: colors.white,

              height: Dimensions.get("window").width,
              paddingVertical: normalize(10),
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

export { LeaveListing };
