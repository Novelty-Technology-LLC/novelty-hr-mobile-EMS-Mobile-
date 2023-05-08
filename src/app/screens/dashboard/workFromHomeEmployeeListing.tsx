import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { headerTxtStyle, listingStyle } from "../../../assets/styles";
import { header as Header } from "../../common";
import { ListPlaceholder } from "../../components/loader/listPlaceHolder";
import { getRequest } from "../../services";
import { momentdate } from "../../utils";
import { navigate } from "../../utils/navigation";
import { EmployeeListingCard } from "./employeeListingCard";
import { AuthContext } from "../../reducer";

const WorkFromHomeEmployeeListing = (props: any) => {
  const [list, setList] = useState<any>(null);
  const { state } = useContext(AuthContext);

  const [loading, setLoading] = useState<any>(null);
  let a: any = [];

  useEffect(() => {
    getWFHemployees();
  }, []);

  const formatWfhOption = (option: string) => {
    if (option === "FIRST HALF") return "1st half";
    if (option === "SECOND HALF") return "2nd half";
    return option;
  };
  const getWFHemployees = async () => {
    setLoading(true);

    try {
      let response: any = await getRequest("work/all", {
        params: {
          start_date: new Date(moment(new Date()).format("YYYY-MM-DD")),
        },
      });

      const responses = response.map((item: any) => {
        const res = item.users.map((items: any) => {
          return {
            id: item.id,
            title: items?.first_name + " " + items?.last_name,
            subTitle: formatWfhOption(item?.option),
            image: items?.image_url,
            work_shift: items?.work_shift,
            user_id: item?.user_id,
            created_at: item?.created_at,
            note: item?.note,
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
                showShoutOut={false}
                showStatus
                status={item.status}
                item={item?.res[0]}
                onPress={() => {
                  if (
                    state?.user?.is_approver === "1" ||
                    state?.user?.is_default_approver === "1"
                  ) {
                    navigate("wfhDetail", {
                      data: {
                        id: item?.id,
                        ...item.res[0],
                        status: item?.status,
                      },
                    });
                  } else {
                    navigate("employeeDetail", {
                      id: item?.id,
                      image: item?.res[0]?.image,
                      name: item?.res[0]?.title,
                      refresh: getWFHemployees,
                    });
                  }
                }}
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
