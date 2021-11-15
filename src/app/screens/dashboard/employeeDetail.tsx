import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { headerTxtStyle, holidayListingStyle } from "../../../assets/styles";
import { getRequest } from "../../services";
import { header as Header } from "../../common";
import { ProfileInfoComponent } from "../../common/profileInformation";
import { ListPlaceholder } from "../../components/loader/listPlaceHolder";

const EmployeeDetail = (props: any) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    (async () => {
      try {
        const id = props.route.params.id;
        let response = await getRequest(`user/${id}`, {});
        setData(response);
        setLoading(false);
      } catch (error) {}
    })();
  }, []);

  return (
    <View style={holidayListingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>Employee Detail</Text>
      </Header>
      {loading && !data ? (
        <ListPlaceholder />
      ) : (
        <ProfileInfoComponent user={data} />
      )}
    </View>
  );
};

export { EmployeeDetail };
