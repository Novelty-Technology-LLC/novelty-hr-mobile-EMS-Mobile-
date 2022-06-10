import React, { useState, useContext, useEffect } from "react";
import { View, ScrollView, Text, RefreshControl, FlatList } from "react-native";
import { header as Header } from "../../common";
import { DaysRemaining, MyRequests } from "../../components";
import {
  headerTxtStyle,
  leaveDashboardStyle as style,
} from "../../../assets/styles";
import OtherRequests from "../../components/leave_screen/otherRequests";
import { RequestButton } from "../../components/requestButton";
import { RequestContext } from "../../reducer";
import { getUser, mapDataToRequest, setUser } from "../../utils";
import { get, getLeaveQuota, getMyRequests, store } from "../../services";
import { QuotaPlaceHolder } from "../../components/loader/quotaPlaceHolder";
import { useScrollToTop } from "@react-navigation/native";
import { AuthContext } from "../../reducer";
import Autolink from "react-native-autolink";

const LeaveDashboard = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [totalFloatingDays, settotalFloatingDays] = useState();
  const [totalPTODays, settotalPTODays] = useState();
  const [remaningleave, setRemaningLeave] = useState({});

  const ref = React.useRef(null);
  const {
    state: { notifdata },
  } = useContext(AuthContext);

  const onRefresh = React.useCallback(async () => {
    setRefresh((prevState) => !prevState);
    setRefreshing(true);
    const user = await getUser();
    const newuser = await get(+JSON.parse(user).id);
    setIsAdmin(+newuser.is_approver === 1 ? true : false);
    setUser(newuser);
    getLeaveQuota(JSON.parse(user).id).then((data) => {
      dispatchRequest({ type: "QUOTA", payload: data });
      setRefreshing(false);
    });

    getMyRequests(JSON.parse(user).id)
      .then((data) => {
        dispatchRequest({ type: "CHANGE", payload: mapDataToRequest(data) });
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const [loading, setLoading] = useState(false);
  const { requests, dispatchRequest } = useContext(RequestContext);

  const getData = async () => {
    const user = await getUser();
    getLeaveQuota(JSON.parse(user).id)
      .then((data) => {
        // setRemaningLeave(data.leaveUsedDetails);
        dispatchRequest({ type: "QUOTA", payload: data });
      })
      .catch((err) => console.log("GetLeaveQuota error", err));
  };

  const getRequest = async () => {
    setLoading(true);
    const user = await getUser();
    setIsAdmin(+JSON.parse(user).is_approver ? true : false);

    getMyRequests(JSON.parse(user).id)
      .then((data) => {
        dispatchRequest({ type: "CHANGE", payload: mapDataToRequest(data) });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const runFunction = () => {
    getData();
    getRequest();
  };
  useEffect(() => {
    runFunction();
  }, []);
  const emptyData: any = [];

  const renderNullItem = () => null;
  useScrollToTop(ref);
  return (
    <View style={style.mainContainer}>
      <Header icon={false}>
        <Text style={headerTxtStyle.headerText}>Leave Application</Text>
      </Header>
      <ScrollView
        style={{ flexGrow: 1 }}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        ref={ref}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {Object.keys(requests.quota).length > 0 ? null : <QuotaPlaceHolder />}
        <View style={style.container}>
          {Object.keys(requests.quota).length > 0 &&
            requests.quota.userLeaveDetail.map((daysDetail) => {
              console.log(daysDetail, "sdsdr");

              return (
                <DaysRemaining
                  key={daysDetail.id}
                  total={daysDetail.leave_total}
                  remaining={daysDetail.leave_used}
                  title={daysDetail.leave_type}
                />
              );
            })}
        </View>
        <MyRequests
          loading={loading}
          refresh={refresh}
          params={notifdata?.request === "myrequest" && +notifdata?.leave_id}
        />
        {isAdmin && (
          <OtherRequests
            refresh={refresh}
            params={
              notifdata?.request === "otherrequest" && +notifdata?.leave_id
            }
          />
        )}
      </ScrollView>
      <RequestButton screen="requestLeave" />
    </View>
  );
};

export { LeaveDashboard };
