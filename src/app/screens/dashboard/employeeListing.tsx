import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { headerTxtStyle, holidayListingStyle } from "../../../assets/styles";
import { header as Header } from "../../common";
import { ListPlaceholder } from "../../components/loader/listPlaceHolder";
import { get, getList, getRequest } from "../../services";
import { transformList } from "../../utils/listtranform";
import { LeaveListingCard } from "./leaveListingCard";

const EmployeeListing = (props: any) => {
  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        let response = await getRequest("webportal/user/userListing", {});
        response = response.map((item) => {
          return {
            title: item.first_name + " " + item.last_namme,
            subTitle: item.designation,
          };
        });
        setList(response);
        setLoading(false);
      } catch (error) {}
    })();
  }, []);

  return (
    <View style={holidayListingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>Employee</Text>
      </Header>
      {loading ? (
        <ListPlaceholder />
      ) : (
        <FlatList
          data={list}
          renderItem={({ item, index }) => (
            <LeaveListingCard index={index} item={item} list={list.length} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export { EmployeeListing };
