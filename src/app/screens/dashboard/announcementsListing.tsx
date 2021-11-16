import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { headerTxtStyle, listingStyle } from "../../../assets/styles";
import { header as Header } from "../../common";
import { ListPlaceholder } from "../../components/loader/listPlaceHolder";
import { getRequest } from "../../services";
import { ListingCard } from "./leaveListingCard";

const AnnouncementListing = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        var response = await getRequest("/webportal/announcements", {});
        setList(response);
        setLoading(false);
      } catch (error) {}
    })();
  }, []);
  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>Announcements</Text>
      </Header>
      {loading ? (
        <ListPlaceholder />
      ) : (
        <FlatList
          data={list}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => {}}>
                <ListingCard
                  index={index}
                  item={item}
                  list={list.length}
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
