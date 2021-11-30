import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableWithoutFeedback } from "react-native";
import { headerTxtStyle, listingStyle } from "../../../assets/styles";
import { getRequest } from "../../services";
import { header as Header } from "../../common";
import { ProfileInfoComponent } from "../../common/profileInformation";
import { ListPlaceholder } from "../../components/loader/listPlaceHolder";
import { profileStyle as style } from "../../../assets/styles/tabs";
import normalize from "react-native-normalize";

const EmployeeDetail = (props: any) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
  const params = props.route.params;

  useEffect(() => {
    (async () => {
      try {
        const id = params.id;
        let response = await getRequest(`user/${id}`, {});
        setData(response);
        setLoading(false);
      } catch (error) {}
    })();
  }, []);

  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <View
          style={headerTxtStyle.main}
        >
          <Text style={headerTxtStyle.headerText}>{params.name}</Text>
          <View
            style={{
              marginRight: normalize(20),
            }}
          >
            <Image
              style={style.headerImage}
              source={{
                uri: params.image,
              }}
            />
          </View>
        </View>
      </Header>
      {loading ? <ListPlaceholder /> : <ProfileInfoComponent user={data} />}
    </View>
  );
};

export { EmployeeDetail };
