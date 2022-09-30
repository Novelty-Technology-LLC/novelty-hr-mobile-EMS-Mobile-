import React, { useContext, useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { headerTxtStyle, listingStyle } from "../../../assets/styles";
import { getRequest } from "../../services";
import { header as Header } from "../../common";
import { ProfileInfoComponent } from "../../common/profileInformation";
import { ListPlaceholder } from "../../components/loader/listPlaceHolder";
import {
  profileStyle,
  profileStyle as style,
} from "../../../assets/styles/tabs";

import { AuthContext } from "../../reducer";
import { useNavigation } from "@react-navigation/native";
import CustomImage from "../../common/image";

const EmployeeDetail = (props: any) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
  const params = props.route.params;
  const { state, dispatch }: any = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const id = params.id;

        let response = await getRequest(`user/${id}`, {});

        setData(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <View style={headerTxtStyle.main}>
          <Text style={headerTxtStyle.headerText}>{params.name}</Text>
          {/* <View
            style={{
              marginRight: normalize(20),
            }}
          ></View> */}
        </View>
      </Header>
      {loading ? (
        <ListPlaceholder />
      ) : (
        <ScrollView
          style={profileStyle.scrollStyle}
          showsVerticalScrollIndicator={false}
        >
          <View style={profileStyle.topContainer}></View>
          <View style={profileStyle.infoStyle}>
            <ProfileInfoComponent
              user={data ?? data}
              chekUserInfo={state.user}
            />
          </View>
          <View style={[style.imageWrapper, style.profileContainerWrapper]}>
            <CustomImage
              fullScreen={false}
              image={params?.image}
              style={[style.image]}
              containerStyle={style.profileImageWrapper}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export { EmployeeDetail };
