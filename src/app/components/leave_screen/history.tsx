import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { historyStyle as style } from "../../../assets/styles";
import { EmptyContainer, SmallHeader } from "../../common";
import { Request } from "./request";
import Swipe from "./swipe";

const History = ({ requests, other, refresh }: any) => {
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
              <Request
                item={item.item}
                other={other}
                onPress={() => navigation.navigate("requestDetail", item.item)}
              />
            ) : item.item.state === "Denied" ||
              item.item.state === "Cancelled" ||
              (item.item.state === "Approved" &&
                new Date(item.item.leave_date.startDate).getTime() <
                  new Date().getTime()) ? (
              <Request
                item={item.item}
                other={other}
                onPress={() => navigation.navigate("requestDetail", item.item)}
              />
            ) : (
              <Swipeable
                ref={(ref) => (row[item.index] = ref)}
                renderRightActions={() => (
                  <Swipe
                    item={item.item}
                    other={true}
                    onPress={() => row[item.index].close()}
                    isLeave={true}
                  />
                )}
              >
                <Request
                  item={item.item}
                  other={other}
                  onPress={() =>
                    navigation.navigate("requestDetail", item?.item)
                  }
                />
              </Swipeable>
            )
          }
          keyExtractor={(item) => item?.id}
        />
      ) : (
        <EmptyContainer text="You don't have past requests" />
      )}
    </View>
  );
};

export default History;
