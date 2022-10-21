import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../../assets/colors";
import { globalStyle, listStyle } from "../../../assets/styles";
import { transformList } from "../../utils/listtranform";
import { navigate } from "../../utils/navigation";
import { EmptyContainer } from "../emptyContainer";
import { AppIcon } from "../icon";
import { ListItem } from "./listItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ShoutoutListItem } from "./shoutoutList";
import { FlatList } from "react-native-gesture-handler";

const List = ({ list }: { list: any }) => {
  return (
    <>
      <View style={globalStyle.row}>
        <Text style={listStyle.header}>{list?.module}</Text>
      </View>
      {list?.items?.length > 0 ? (
        <View style={listStyle.container}>
          {list?.module !== "shoutout" &&
            transformList(
              list?.items?.slice(0, 3),
              list?.module,
              false,
              true,
              list.module == "Holidays & Events" || list.module == "Leave"
                ? true
                : false
            ).map((item: any, index: number) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (list?.module === "Announcements") {
                      navigate("announcementsDetails", {
                        headerText: item?.title,
                        title: item?.title,
                        subTitle: item?.subTitle,
                        date: item?.date,
                        html: item?.html,
                        id: item?.id,
                        dashboard: true,
                      });
                    } else if (list?.module === "shoutout") {
                      null;
                    } else
                      navigate(list?.detailRoute, {
                        route: list?.detailRoute,
                        module: list.module,
                      });
                  }}
                  style={listStyle.seeAll}
                >
                  {list.module !== "shoutout" && (
                    <ListItem
                      key={index}
                      title={item?.title}
                      subTitle={item?.subTitle}
                      leave_option={item?.leave_option}
                      date={item?.date}
                      isLast={2 === index}
                      type={item?.type}
                      module={list.module}
                      html={item.html}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          {}
          {list?.module === "shoutout" && (
            <FlatList
              keyExtractor={(item) => item?.id.toString()}
              data={list?.items}
              renderItem={({ item, index }) => {
                return (
                  <ShoutoutListItem
                    date={item.shoutout_date}
                    isLast={2 === index}
                    // module={list.module}
                    receiver={item?.receiver}
                    shoutout={item.shoutout}
                    shoutout_from={item.shoutout_from}
                  />
                );
              }}
            />
          )}
          <TouchableOpacity
            onPress={() =>
              navigate(list?.detailRoute, {
                route: list?.detailRoute,
                module: list.module,
              })
            }
          >
            {list?.module !== "shoutout" && (
              <View style={listStyle.seeAllTextOn}>
                <Text style={listStyle.seeAllTexts}>See All</Text>
                <Icon name="arrow-right" color={colors.primary} size={12} />
              </View>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <EmptyContainer
            text={`${
              list.message
                ? list.message
                : list?.module === "Leave"
                ? "No Upcoming Leave"
                : "No Upcoming Holidays and Events"
            }`}
            containerStyle={{
              height: normalize(80),
              borderBottomColor: colors.snow,
              paddingVertical: normalize(10),
            }}
          />
          {/* <TouchableOpacity
            onPress={() =>
              navigate(list?.detailRoute, {
                route: list?.detailRoute,
                module: list.module,
              })
            }
          >
            <View style={listStyle.seeAllTextOn}>
              <Text style={listStyle.seeAllTexts}>See All</Text>
              <Icon name="arrow-right" color={colors.primary} size={12} />
            </View>
          </TouchableOpacity> */}
        </>
      )}
      {/* {list?.module === "Announcements" && (
        <View>
          <TouchableOpacity
            onPress={() =>
              navigate("announcementsListing", {
                notification: "",
              })
            }
          >
            <Text style={listStyle.seeAllTextOne}>{"SEE ALL"}</Text>
          </TouchableOpacity>
        </View>
      )} */}
    </>
  );
};

export { List };
