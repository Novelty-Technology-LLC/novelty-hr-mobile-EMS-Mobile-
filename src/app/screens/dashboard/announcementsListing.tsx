import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { headerTxtStyle, listingStyle } from "../../../assets/styles";
import { header as Header } from "../../common";
import { ListPlaceholder } from "../../components/loader/listPlaceHolder";
import { getRequest } from "../../services";
import { navigate } from "../../utils/navigation";
import { ListingCard } from "./leaveListingCard";

const AnnouncementListing = (props: any) => {
  const params = props.route.params;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        var response: any = await getRequest("/webportal/announcements", {});
        let itemData: any = [];

        response.forEach((element: any): any => {
          itemData.push(element);
        });

        if (params.notification) {
          var findAnnouncement = response.find(
            (item: any) => item.id == +params.id
          );
          navigate("announcementsDetails", {
            headerText: findAnnouncement?.title,
            title: findAnnouncement?.title,
            subTitle: findAnnouncement?.subTitle,
            date: findAnnouncement?.date,
            html: findAnnouncement?.html,
          });
        }
        setList(
          response.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          )
        );

        setLoading(false);
      } catch (error) {}
    })();
  }, []);

  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>Announcements</Text>
      </Header>
      {loading || list === null ? (
        <ListPlaceholder />
      ) : (
        <FlatList
          data={list}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigate("announcementsDetails", {
                    headerText: item.title,
                    title: item.title,
                    subTitle: item.subTitle,
                    date: item.date,
                    html: item.html,
                  })
                }
              >
                <ListingCard
                  index={index}
                  item={item}
                  list={list.length}
                  module={params.module}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export { AnnouncementListing };
