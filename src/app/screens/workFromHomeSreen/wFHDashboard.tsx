import React, { useState, useContext, useEffect } from "react";
import { View, ScrollView, Text, RefreshControl } from "react-native";
import { header as Header } from "../../common";
import { DaysRemaining, MyRequests } from "../../components";
import {
  headerTxtStyle,
  leaveDashboardStyle as style,
} from "../../../assets/styles";
import OtherRequests from "../../components/leave_screen/otherRequests";
import { RequestButton } from "../../components/requestButton";
import { getUser, mapDataToRequest, setUser } from "../../utils";
import { get, getLeaveQuota, getMyRequests, store } from "../../services";
import { QuotaPlaceHolder } from "../../components/loader/quotaPlaceHolder";
import { useScrollToTop } from "@react-navigation/native";
import { AuthContext } from "../../reducer";
import Autolink from "react-native-autolink";
import { NAVIGATION_ROUTE } from "../../constant/navigation.contant";
import { MyWFHRequests } from "../../components/wFHScreen/myWFHRequests";
import OtherWFHRequests from "../../components/wFHScreen/otherWFHRequests";
import { RequestWFHContext } from "../../reducer/requestWorkFromReducer";

const WFHDashboard = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const ref = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const { requestsWFH, dispatchWFHRequest } =
    useContext<any>(RequestWFHContext);
  const {
    state: { notifdata },
  }: any = useContext(AuthContext);

  const onRefresh = React.useCallback(async () => {
    setRefresh((prevState) => !prevState);
    setRefreshing(true);
    const user: any = await getUser();
    const newuser: any = await get(+JSON.parse(user).id);
    setIsAdmin(+newuser.is_approver === 1 ? true : false);
    setUser(newuser);
    getLeaveQuota(JSON.parse(user).id).then((data) => {
      dispatchWFHRequest({ type: "QUOTA", payload: data });
      setRefreshing(false);
    });

    getMyRequests(JSON.parse(user).id)
      .then((data) => {
        dispatchWFHRequest({ type: "CHANGE", payload: mapDataToRequest(data) });
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const getWFHQuota = async () => {
    const user = await getUser();

    getLeaveQuota(JSON.parse(user).id)
      .then((data: any) => {
        dispatchWFHRequest({ type: "QUOTA", payload: data });
      })
      .catch((err) => {});
  };

  const getWFHRequest = async () => {
    setLoading(true);
    const user = await getUser();
    setIsAdmin(+JSON.parse(user).is_approver ? true : false);

    getMyRequests(JSON.parse(user).id)
      .then((data) => {
        console.log(data, "data");

        dispatchWFHRequest({ type: "CHANGE", payload: mapDataToRequest(data) });
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
      <Header icon={false}>
        <Text style={headerTxtStyle.headerText}>WFH Application</Text>
      </Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={ref}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {requestsWFH?.quota?.length > 0 ? null : <QuotaPlaceHolder />}
        <View
          style={[
            style.container,
            { alignItems: "center", flexDirection: "column" },
          ]}
        >
          {requestsWFH.quota && requestsWFH.quota.length > 1 && (
            // requests.quota.map((daysDetail) => (
            //   <DaysRemaining
            //     key={requests.quota[1].daysDetail?.id}
            //     total={daysDetail?.leave_total}
            //     remaining={daysDetail?.leave_used}
            //     title={daysDetail?.leave_type}
            //   />
            //))

            <DaysRemaining
              key={requestsWFH.quota[1].daysDetail?.id}
              total={requestsWFH.quota[1]?.leave_total}
              remaining={requestsWFH.quota[1]?.leave_used}
              title={"WFH Quota"}
            />
          )}
        </View>
        <MyWFHRequests
          screenName={NAVIGATION_ROUTE.Request_WFH_DETAIL}
          loading={loading}
          refresh={refresh}
          params={notifdata?.request === "myrequest" && +notifdata?.leave_id}
        />
        {isAdmin && (
          <OtherWFHRequests
            screenName={NAVIGATION_ROUTE.Request_WFH_DETAIL}
            refresh={refresh}
            params={
              notifdata?.request === "otherrequest" && +notifdata?.leave_id
            }
          />
        )}
      </ScrollView>
      <RequestButton screen={NAVIGATION_ROUTE.Request_WFH} />
    </View>
  );
};

export { WFHDashboard };
