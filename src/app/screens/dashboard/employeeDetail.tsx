import React, { useContext, useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import {
  headerTxtStyle,
  listingStyle,
} from "../../../assets/styles";
import { getRequest } from "../../services";
import { header as Header } from "../../common";
import { ProfileInfoComponent } from "../../common/profileInformation";
import { ListPlaceholder } from "../../components/loader/listPlaceHolder";
import {
  profileStyle,
  profileStyle as style,
} from "../../../assets/styles/tabs";
import { AuthContext } from "../../reducer";
import CustomImage from "../../common/image";
import { RequestButton } from "../../components/requestButton";

const EmployeeDetail = (props: any) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
  const params = props.route.params;
  const { state, dispatch }: any = useContext(AuthContext);
  const updateInListing = props.route.params.refresh;

  useEffect(() => {
    if (params?.updated) {
      setData(params.data);
      updateInListing();
    }
  }, [props.route.params]);

  useEffect(() => {
    (async () => {
      try {
        const id = params.id;

        let response = await getRequest(`user/self`, {});


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
          <Text style={headerTxtStyle.headerText} numberOfLines={1}>
            {params.name}
          </Text>
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
      {state.user?.is_default_approver &&
        state.user?.is_default_approver == 1 &&
        !loading && (
          <RequestButton
            screen="editEmployeeDetail"
            floatingIcon="pencil"
            olddata={data}
          />
        )}
    </View>
  );
};

export { EmployeeDetail };
