import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { headerTxtStyle, listingStyle } from "../../../assets/styles";
import { header as Header } from "../../common";
import { ListPlaceholder } from "../../components/loader/listPlaceHolder";
import { getRequest } from "../../services";
import { navigate } from "../../utils/navigation";
import { ListingCard } from "./leaveListingCard";

const EmployeeListing = (props: any) => {
  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState<any>(null);

  useEffect(() => {
    listingAllEmployee();
  }, []);

  const listingAllEmployee = async () => {
    setLoading(true);

    try {
      let response: any = await getRequest("webportal/users/user-listing");

      response = response.map((item: any) => {
        return {
          id: item.id,
          title: item.first_name + " " + item.last_name,
          subTitle: item.designation,
          image: item.image_url,
          error: false,
          work_shift: item?.work_shift,
        };
      });
      setList(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>Employee</Text>
      </Header>
      {loading ? (
        <ListPlaceholder />
      ) : (
        <FlatList
          data={list}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigate("employeeDetail", {
                    id: item.id,
                    image: item.image,
                    name: item.title,
                    refresh: listingAllEmployee,
                  })
                }
              >
                <ListingCard
                  index={index}
                  item={item}
                  list={list.length}
                  module="employeeList"
                  sa={setList}
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

export { EmployeeListing };
