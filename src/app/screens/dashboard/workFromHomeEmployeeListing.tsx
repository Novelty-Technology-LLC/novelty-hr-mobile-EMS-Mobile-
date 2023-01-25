import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { headerTxtStyle, listingStyle } from "../../../assets/styles";
import { header as Header } from "../../common";
import { ListPlaceholder } from "../../components/loader/listPlaceHolder";
import { getRequest } from "../../services";
import { momentdate } from "../../utils";
import { navigate } from "../../utils/navigation";
import { EmployeeListingCard } from "./employeeListingCard";

const WorkFromHomeEmployeeListing = (props: any) => {
  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState<any>(null);
  let a: any = [];

  useEffect(() => {
    getWFHemployees();
  }, []);
  const getWFHemployees = async () => {
    setLoading(true);

    try {
      let response: any = await getRequest("work/all", {
        params: { start_date: new Date() },
      });

      const responses = response.map((item: any) => {
        const res = item.users.map((items: any) => {
          return {
            id: item.user_id,
            title: items?.first_name + " " + items?.last_name,
            subTitle: item?.option,
            image: items?.image_url,
            work_shift: items?.work_shift,
          };
        });

        return {
          res: res,
          status: item.status,
          id: item.user_id,
        };
      });
      setList(responses);

      setLoading(false);
    } catch (error) {}
  };

  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>WFH-Employees</Text>
      </Header>
      {loading ? (
        <ListPlaceholder />
      ) : (
        <FlatList
          data={list}
          renderItem={({ item, index }) => {
            return (
              <EmployeeListingCard
                index={index}
                item={item?.res[0]}
                onPress={() =>
                  navigate("employeeDetail", {
                    id: item?.id,
                    image: item?.res[0]?.image,
                    name: item?.res[0]?.title,
                    refresh: getWFHemployees,
                  })
                }
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export { WorkFromHomeEmployeeListing };
