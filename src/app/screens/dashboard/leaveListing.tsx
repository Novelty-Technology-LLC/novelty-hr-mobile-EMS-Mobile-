import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {
  cardStyle,
  headerTxtStyle,
  listingStyle,
  requestStyle,
} from "../../../assets/styles";
import { header as Header } from "../../common";
import State from "../../components/leave_screen/state";
import { ListPlaceholder } from "../../components/loader/listPlaceHolder";
import { getList } from "../../services";
import { transformList } from "../../utils/listtranform";
import { ListingCard } from "./leaveListingCard";

const LeaveListing = (props: any) => {
  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    const getData = async (route: string) => {
      const data = await getList(route);
      data && setLoading(false);
      setList(data);
    };
    getData(props?.route?.params?.route);
  }, []);

  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>LEAVE</Text>
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ListPlaceholder />
        ) : (
          list?.length > 0 &&
          transformList(
            list,
            "Leave",
            true,
            false,
            props?.route?.params?.module === "Leave" ? true : false
          ).map((item, index) => (
            <ListingCard index={index} item={item} list={list.length} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export { LeaveListing };
