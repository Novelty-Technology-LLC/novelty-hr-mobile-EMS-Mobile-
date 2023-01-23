import React, { useState, useContext, useEffect } from "react";
import { View, ScrollView, Text, RefreshControl } from "react-native";
import { header as Header } from "../../common";
import { DaysRemaining } from "../../components";
import {
  headerTxtStyle,
  leaveDashboardStyle as style,
} from "../../../assets/styles";
import { RequestButton } from "../../components/requestButton";
import { getUser, mapDataToRequest, setUser } from "../../utils";
import { get, getMyRequest, getQuota } from "../../services";
import { QuotaPlaceHolder } from "../../components/loader/quotaPlaceHolder";
import { useScrollToTop } from "@react-navigation/native";
import { AuthContext } from "../../reducer";
import { NAVIGATION_ROUTE } from "../../constant/navigation.contant";
import { MyWFHRequests } from "../../components/wFHScreen/myWFHRequests";
import OtherWFHRequests from "../../components/wFHScreen/otherWFHRequests";
import { RequestWFHContext } from "../../reducer/requestWorkFromReducer";
import {
  mapDataToWFHRequest,
  mapObjectToWFHRequest,
} from "../../utils/requestWfhTransformer";

const WFHDashboard = ({ route }: { route: any }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const ref = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const { requestsWFH, dispatchWFHRequest } =
    useContext<any>(RequestWFHContext);
  const notifdata = route?.params?.notifdata;

  const onRefresh = React.useCallback(async () => {
    setRefresh((prevState) => !prevState);
    setRefreshing(true);
    const user: any = await getUser();
    const newuser: any = await get(+JSON.parse(user).id);
    setIsAdmin(+newuser.is_approver === 1 ? true : false);
    setUser(newuser);
    getQuota(JSON.parse(user).id).then((data) => {
      dispatchWFHRequest({ type: "QUOTA", payload: data });
      setRefreshing(false);
    });

    await getMyRequest(JSON.parse(user).id)
      .then((data) => {
        dispatchWFHRequest({
          type: "CHANGE",
          payload: mapDataToWFHRequest(data),
        });
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const getWFHQuota = async () => {
    const user = await getUser();
    getQuota(JSON.parse(user).id)
      .then((data: any) => {
        dispatchWFHRequest({ type: "QUOTA", payload: data });
        setLoading(false);
      })
      .catch((err) => {});
  };

  const getWFHRequest = async () => {
    setLoading(true);
    const user = await getUser();
    setIsAdmin(+JSON.parse(user).is_approver ? true : false);

    getMyRequest(JSON.parse(user).id)
      .then((data) => {
        dispatchWFHRequest({
          type: "CHANGE",
          payload: mapDataToWFHRequest(data),
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const runFunction = () => {
      getWFHQuota();
      getWFHRequest();
    };

    runFunction();
  }, []);

  useScrollToTop(ref);

  return (
    <View style={style.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>WFH Application</Text>
      </Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={ref}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {requestsWFH?.quota?.length > 0 ? (
          <View
            style={[
              style.container,
              { alignItems: "center", flexDirection: "column" },
            ]}
          >
            {requestsWFH?.quota &&
              requestsWFH?.quota.length > 0 &&
              requestsWFH?.quota.map((daysDetail) => (
                <DaysRemaining
                  key={daysDetail?.id}
                  total={daysDetail?.total}
                  remaining={daysDetail?.remaining}
                  title={"WFH Quota"}
                />
              ))}
          </View>
        ) : (
          <QuotaPlaceHolder />
        )}

        <MyWFHRequests
          screenName={NAVIGATION_ROUTE.Request_WFH_DETAIL}
          loading={loading}
          refresh={refresh}
          params={notifdata?.request === "myrequest" ? +notifdata?.wfh_id : 0}
        />
        {isAdmin && (
          <OtherWFHRequests
            screenName={NAVIGATION_ROUTE.Request_WFH_DETAIL}
            refresh={refresh}
            params={
              notifdata?.request === "otherrequest" ? +notifdata?.wfh_id : 0
            }
          />
        )}
      </ScrollView>
      <RequestButton screen={NAVIGATION_ROUTE.Request_WFH} />
    </View>
  );
};

export { WFHDashboard };
