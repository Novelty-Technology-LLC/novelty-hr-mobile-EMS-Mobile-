import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { historyStyle as style } from "../../../assets/styles";
import { EmptyContainer, SmallHeader } from "../../common";
import { NAVIGATION_ROUTE } from "../../constant/navigation.contant";
import Swipe from "../leave_screen/swipe";
import { Request } from "./request";
import { WFHRequest } from "./WFHrequest";

const WFHHistory = ({ requests, other, refresh }: any) => {
  const navigation = useNavigation();
  let row: Array<any> = [];

  useEffect(() => {
    row.map((item) => item.close());
  }, [refresh]);

  return (
    <View style={other ? style.container : null}>
      <SmallHeader text="Past Requests" />
      {requests.length > 0 ? (
        <FlatList
          data={requests}
          renderItem={(item) =>
            other ? (
              <WFHRequest
                item={item.item}
                other={other}
                onPress={() =>
                  navigation.navigate(
                    NAVIGATION_ROUTE.Request_WFH_DETAIL,
                    item.item
                  )
                }
              />
            ) : item.item.state === "Denied" ||
              item.item.state === "Cancelled" ||
              (item.item.state === "Approved" &&
                new Date(item.item.leave_date.startDate).getTime() <
                  new Date().getTime()) ? (
              <WFHRequest
                item={item.item}
                other={other}
                onPress={() =>
                  navigation.navigate(
                    NAVIGATION_ROUTE.Request_WFH_DETAIL,
                    item.item
                  )
                }
              />
            ) : (
              <Swipeable
                ref={(ref) => (row[item.index] = ref)}
                renderRightActions={() => (
                  <Swipe
                    item={item.item}
                    other={true}
                    onPress={() => row[item.index].close()}
                  />
                )}
              >
                <WFHRequest
                  item={item.item}
                  other={other}
                  onPress={() =>
                    navigation.navigate(
                      NAVIGATION_ROUTE.Request_WFH_DETAIL,
                      item.item
                    )
                  }
                />
              </Swipeable>
            )
          }
          keyExtractor={(item) => item.id}
        />
      ) : (
        <EmptyContainer text="You don't have past requests" />
      )}
    </View>
  );
};

export default WFHHistory;
