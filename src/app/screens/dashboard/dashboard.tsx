import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { AuthContext } from "../../reducer";
import { dashboardStyle as ds, headerTxtStyle } from "../../../assets/styles";
import { Cards, header as Header, List } from "../../common";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../assets/colors";
import { getDashboard, getRequest } from "../../services";
import moment from "moment";
import normalize from "react-native-normalize";
import { DashboardCardPlaceholder } from "../../common";
import { getCurrentRouteName, navigate } from "../../utils/navigation";
import { time } from "../../utils/listtranform";
import CustomImage from "../../common/image";
import { AnnouncementContext } from "../../reducer/announcementreducer";
import { NAVIGATION_ROUTE } from "../../constant/navigation.contant";
import { ShoutoutContext } from "../../reducer/shoutoutReducer";
import { setUser } from "../../utils";

const DashBoard = () => {
  const { state: announcementState, dispatch }: any =
    useContext(AnnouncementContext);

  const { shoutoutState, dispatchShoutout } = useContext(ShoutoutContext);
  const { state }: any = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const [wfhData, setWfhData] = useState("");
  const [loading, setLoading] = useState(false);
  const [leaveStatus, setLeaveStatus] = useState(false);
  const [announcementLoading, setAnnouncementLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [shoutoutLoading, setshoutoutLoading] = useState<any>(false);
  const [announcements, setAnnouncements] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [cardLoading, setCardLoading] = useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (getCurrentRouteName() === "dashboard") {
        BackHandler.exitApp();
      }
    });
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", BackHandler.exitApp);
    };
  }, []);

  // useEffect(() => {
  //   setEventloading(true);
  //   const getData = async (route: string) => {
  //     const data = await getList(route);

  //     setEventloading(false);
  //     setList(data);
  //   };
  //   getData("holidayeventslisting");
  // }, []);

  const fetchWork = async () => {
    try {
      setLoading(true);

      // const res: any = await getWork(
      //   state?.user?.id,
      //   moment().format("YYYY-MM-DD")
      // );

      // setId(res?.data?.id ?? null);
      // // setUserId(res?.data?.data[0].user_id ?? null);
      // setToggle(+res?.data?.status === 1 ? true : false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    state?.user?.id && fetchWork();
  }, [state, refreshing]);

  useEffect(() => {
    (async () => {
      try {
        if (state?.user?.id) {
          const response: any = await getRequest(
            `/user/profile/${state?.user?.id}` // REPLACE: /user/profile-self
          );
          await setUser(response);
        }
      } catch (error) {}
    })();
  }, [state]);

  const fetchAnnouncements = async () => {
    try {
      var response: any = await getRequest("/webportal/announcements", {
        limit: 3,
      });

      await dispatch({
        type: "SET_ANNOUNCEMENT_DATA",
        payload: { announcementData: response },
      });
      setAnnouncements(response);
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      try {
        setAnnouncementLoading(true);
        setshoutoutLoading(true);
        setCardLoading(true);
        await Promise.all([
          getDashboard(state?.user.id),
          fetchAnnouncements(),
        ]).then((values) => {
          const filterData = values[0].filter(
            (item: any) => item.module === "Leave"
          );
          const res = filterData.flat()[0].items;
          const result = res
            .map((item) => item.user)
            .filter((item) => {
              const user = item.id === state?.user.id;
              return user ? true : false;
            });
          setLeaveStatus(result.length ? true : false);
          const dashboardData: any = values[0];
          const wfhStatus = dashboardData.filter(
            (item: any) => item.module === "wfh"
          );
          setWfhData(wfhStatus[0].items.status.toLowerCase());
          const filterSection = dashboardData.filter(
            (item: any) => item.show === true
          );

          var filteredArray = filterSection.filter((e: any) => {
            return e?.detailRoute !== "/shoutout";
          });
          var shoutoutData = filterSection.filter((e: any) => {
            return e?.detailRoute === "/shoutout";
          });

          dispatchShoutout({
            type: "SET_SHOUTOUT_LIST",
            payload: shoutoutData[0]?.items,
          });

          setAnnouncementLoading(false);
          setshoutoutLoading(false);

          setListData(filteredArray);
          setCardLoading(false);

          setRefreshing(false);
        });
      } catch (error) {
        setRefreshing(false);
      }
    })();
  }, [refreshing, state?.user?.id]);

  const handleWFH = () => {
    // navigate(NAVIGATION_ROUTE.WFH_DASHBOARD);
  };

  const statusClip = (iconName = "home", title = "Home") => {
    return (
      <TouchableWithoutFeedback
        disabled={true}
        onPress={handleWFH}
        style={[
          toggle
            ? { backgroundColor: colors.greenButton }
            : { backgroundColor: colors.fontGrey },
        ]}
      >
        <View
          style={[
            ds.office,

            toggle
              ? { backgroundColor: colors.fontGrey }
              : { backgroundColor: colors.brown },
          ]}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Icon
              name={iconName}
              color={toggle ? colors.primary : colors.greenButton}
              size={15}
            />
          )}
          <View style={{ marginHorizontal: 2 }} />
          <Text
            style={{
              ...ds.officeText,

              color: toggle ? colors.primary : colors.greenButton,
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <View style={ds.safeArea}>
      <Header icon={false} container={{ paddingVertical: normalize(4.076) }}>
        <View style={ds.headerContainer}>
          <Text style={headerTxtStyle.headerText}>DASHBOARD</Text>
          <TouchableOpacity onPress={() => navigate("Profile")}>
            <CustomImage image={state?.user?.image_url} style={ds.image} />
          </TouchableOpacity>
        </View>
      </Header>
      <ScrollView
        style={ds.body}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={ds.header}>
          <View>
            <Text style={ds.text}>Good {time()}</Text>
            <View style={ds.gap} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: normalize(2),
              }}
            >
              <Text style={ds.name}>
                <Text style={ds.name}>{state?.user?.first_name + "  "} </Text>
              </Text>
              {/* <TouchableWithoutFeedback
                onPress={handleWFH}
                style={[
                  toggle
                    ? { backgroundColor: colors.greenButton }
                    : { backgroundColor: colors.primary },
                ]}
              >
                <View
                  style={[
                    ds.office,

                    toggle
                      ? { backgroundColor: colors.fontGrey }
                      : { backgroundColor: colors.primary },
                  ]}
                >
                  {loading ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    <Icon
                      // name="domain"
                      name="home"
                      color={toggle ? colors.primary : colors.white}
                      size={15}
                    />
                  )}
                  <View style={{ marginHorizontal: 2 }} />
                  <Text
                    style={{
                      ...ds.officeText,

                      color: toggle ? colors.primary : colors.white,
                    }}
                  >
                    Office
                  </Text>
                </View>
              </TouchableWithoutFeedback> */}
              {/* {leaveStatus
                ? statusClip("briefcase-clock", "On Leave")
                : isActive && statusClip()} */}
            </View>

            {/* <Text style={ds.workshift}>{state?.user?.work_shift}</Text> */}
          </View>
          <TouchableWithoutFeedback
            onPress={handleWFH}
            style={[
              ds.work,
              toggle
                ? { backgroundColor: colors.greenButton }
                : { backgroundColor: colors.brown },
            ]}
          >
            <View
              style={[
                ds.work,
                moment().day() === 6 || moment().day() === 0
                  ? { backgroundColor: colors.primary }
                  : wfhData == "approved"
                  ? { backgroundColor: colors.greenButton }
                  : wfhData === "pending"
                  ? { backgroundColor: colors.brown }
                  : wfhData === "in progress"
                  ? { backgroundColor: colors.yellow }
                  : wfhData === "office" ||
                    wfhData === "cancelled" ||
                    wfhData === "deleted" ||
                    wfhData === "denied"
                  ? { backgroundColor: colors.primary }
                  : { backgroundColor: colors.primary },
              ]}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Icon
                  name={
                    moment().day() === 6 || moment().day() === 0
                      ? "domain"
                      : wfhData === "office" ||
                        wfhData === "cancelled" ||
                        wfhData === "deleted" ||
                        wfhData === "denied"
                      ? "domain"
                      : "home-outline"
                  }
                  // home-outline arrow-top-right
                  color={wfhData === "pending" ? colors.primary : colors.white}
                  style={{ marginRight: 2 }}
                  size={20}
                />
              )}
              <Text
                style={{
                  ...ds.workText,
                  color: wfhData === "pending" ? colors.primary : colors.white,
                }}
              >
                {moment().day() === 6 || moment().day() === 0
                  ? "Work from office"
                  : wfhData === "office" ||
                    wfhData === "cancelled" ||
                    wfhData === "deleted" ||
                    wfhData === "denied"
                  ? "Work from office"
                  : "Work from home"}
              </Text>
              <View style={{ marginHorizontal: 2 }} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={ds.wrapContainer}>
          {!cardLoading ? (
            <Cards data={listData} />
          ) : (
            <DashboardCardPlaceholder />
          )}
        </View>
        {!announcementLoading ? (
          <View style={{ width: "100%", paddingVertical: 25 }}>
            <List
              list={{
                module: "Announcements",
                message: "No Upcoming Announcements",
                items: announcementState.announcementData,
                detailRoute: "announcementsListing",
              }}
            />
          </View>
        ) : (
          <DashboardCardPlaceholder />
        )}
        {!shoutoutLoading ? (
          <View style={{ width: "100%", paddingBottom: 25 }}>
            <List
              list={{
                module: "shoutout",
                message: "No Shoutouts",
                items: shoutoutState.shoutoutList,
                detailRoute: "shoutoutDetail",
              }}
            />
          </View>
        ) : (
          <DashboardCardPlaceholder />
        )}
      </ScrollView>
    </View>
  );
};

export { DashBoard };
