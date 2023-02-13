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
import { RequestContext } from "../../reducer";
import { getUser, mapDataToRequest, setUser } from "../../utils";
import { get, getLeaveQuota, getMyRequests } from "../../services";
import { QuotaPlaceHolder } from "../../components/loader/quotaPlaceHolder";
import { useScrollToTop } from "@react-navigation/native";
import { AuthContext } from "../../reducer";

const LeaveDashboard = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const ref = React.useRef(null);
  const {
    state: { notifdata },
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { requests, dispatchRequest } = useContext(RequestContext);

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
      .then((data: any) => {
        dispatchRequest({
          type: "CHANGE",
          payload: mapDataToRequest(
            data.map((item: any) => {
              return {
                ...item,
                leave_date: {
                  startDate: item.start_date,
                  endDate: item.end_date,
                },
              };
            })
          ),
        });
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const getData = async () => {
    const user = await getUser();
    getLeaveQuota(JSON.parse(user).id)
      .then((data) => {
        dispatchRequest({ type: "QUOTA", payload: data });
      })
      .catch((err) => {});
  };

  const getRequest = async () => {
    setLoading(true);
    const user = await getUser();
    setIsAdmin(+JSON.parse(user).is_approver ? true : false);

    getMyRequests(JSON.parse(user).id)
      .then((data: any) => {
        dispatchRequest({
          type: "CHANGE",
          payload: mapDataToRequest(
            data.map((item) => {
              return {
                ...item,
                leave_date: {
                  startDate: item.start_date,
                  endDate: item.end_date,
                },
              };
            })
          ),
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const runFunction = () => {
      getData();
      getRequest();
    };

    runFunction();
  }, [requests?.requests?.length]);

  useScrollToTop(ref);

  return (
    <View style={style.mainContainer}>
      <Header icon={false}>
        <Text style={headerTxtStyle.headerText}>Leave Application</Text>
      </Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={ref}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {requests?.quota?.length > 0 ? null : <QuotaPlaceHolder />}
        <View style={style.container}>
          {requests.quota &&
            requests.quota.length > 0 &&
            requests.quota.map((daysDetail) => (
              <DaysRemaining
                key={daysDetail?.id}
                total={daysDetail?.leave_total}
                remaining={daysDetail?.leave_remaining}
                title={daysDetail?.leave_type}
              />
            ))}
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
