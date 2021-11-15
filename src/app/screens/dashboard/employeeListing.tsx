import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { headerTxtStyle, holidayListingStyle } from "../../../assets/styles";
import { header as Header } from "../../common";
import { ListPlaceholder } from "../../components/loader/listPlaceHolder";
import { getRequest } from "../../services";
import { navigate } from "../../utils/navigation";
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
            title: item.first_name + " " + item.last_name,
            subTitle: item.designation,
            id: item.id,
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
            <TouchableOpacity onPress={() => navigate("employeeDetail",{'id':item.id})}>
              <LeaveListingCard index={index} item={item} list={list.length} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export { EmployeeListing };
