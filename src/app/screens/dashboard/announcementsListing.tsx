import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { headerTxtStyle, listingStyle } from "../../../assets/styles";
import { header as Header } from "../../common";
import Swipe from "../../components/leave_screen/swipe";
import { ListPlaceholder } from "../../components/loader/listPlaceHolder";
import { RequestButton } from "../../components/requestButton";
import { AuthContext } from "../../reducer";
import { AnnouncementContext } from "../../reducer/announcementreducer";
import { getRequest } from "../../services";
import { navigate } from "../../utils/navigation";
import { ListingCard } from "./leaveListingCard";

const AnnouncementListing = (props: any) => {
  const { state, dispatch }: any = useContext(AnnouncementContext);

  const { state: auth }: any = useContext(AuthContext);

  const params = props.route.params;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        var response: any = await getRequest("/webportal/announcements", {});

        await dispatch({
          type: "SET_ANNOUNCEMENT_DATA",
          payload: { announcementData: response },
        });
        let itemData: any = [];
        response.forEach((element: any): any => {
          itemData.push(element);
        });

        if (params.notification) {
          var findAnnouncement = response.find(
            (item: any) => +item.id == +params.id
          );
          navigate("announcementsDetails", {
            id: findAnnouncement?.id,
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
          data={state?.announcementData}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigate("announcementsDetails", {
                    id: item?.id,
                    headerText: item?.title,
                    title: item?.title,
                    subTitle: item?.subTitle,
                    date: item?.date,
                    html: item?.html,
                  })
                }
              >
                <ListingCard
                  state={item}
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
      {auth.user.is_approver === 1 && (
        <RequestButton screen="addAnnouncement" />
      )}
    </View>
  );
};

export { AnnouncementListing };
