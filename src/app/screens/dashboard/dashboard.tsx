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
  Image,
} from "react-native";
import { AuthContext } from "../../reducer";
import { dashboardStyle as ds, headerTxtStyle } from "../../../assets/styles";
import { Cards, header as Header, List, showToast } from "../../common";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../assets/colors";
import { getToday } from "../../utils";
import {
  createWork,
  getWork,
  getDashboard,
  getRequest,
  getList,
} from "../../services";
import moment from "moment";
import normalize from "react-native-normalize";
import { DashboardCardPlaceholder } from "../../common";
import { getCurrentRouteName, navigate } from "../../utils/navigation";
import { time } from "../../utils/listtranform";
import { getWorkShift } from "../../utils/getWorkShift";
import CustomImage from "../../common/image";
import { NAVIGATION_ROUTE } from "../../constant/navigation.contant";

const DashBoard = () => {
  const { state } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const [isActive, setActive] = useState(false);
  const [id, setId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingIsActive, setLoadingIsActive] = useState(false);
  const [leaveStatus, setLeaveStatus] = useState(false);
  const [announcementLoading, setAnnouncementLoading] = useState(false);
  const [listData, setListData] = useState([]);
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

  const fetchWork = async () => {
    try {
      setLoading(true);

      const res: any = await getWork(
        state?.user?.id,
        moment().format("YYYY-MM-DD")
      );

      setId(res?.data?.id ?? null);
      // setUserId(res?.data?.data[0].user_id ?? null);
      setToggle(+res?.data?.status === 1 ? true : false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    state?.user?.id && fetchWork();
  }, [state, refreshing]);

  useEffect(() => {
    state?.user?.id && fetchLeave();
  }, [refreshing]);
  const fetchAnnouncements = async () => {
    try {
      var response: any = await getRequest("/webportal/announcements", {
        limit: 3,
      });

      setAnnouncements(response);
    } catch (error) {}
  };

  const fetchLeave = async () => {
    try {
      var response: any = await getRequest("/leave", {});
      var date = moment(new Date()).format("ddd MMM D YYYY");

      var todayLeave = response.find(function (element: any) {
        return (
          element.requestor_id === state?.user.id &&
          moment(date).isSame(element.leave_date.startDate)
        );
      });

      if (todayLeave.status === "Approved") {
        setLeaveStatus(true);
      } else {
        setLeaveStatus(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    (async () => {
      try {
        setAnnouncementLoading(true);

        setCardLoading(true);
        const data: any = await getDashboard();
        const TodayDate = new Date();
        const holidayData: any = await getList("holidayeventslisting");

        if (TodayDate.getDay() !== 0 && TodayDate.getDay() !== 6) {
          var holidayExits = holidayData.findIndex((x: any) => {
            return (
              x.subTitle.slice(0, 9) === new Date().toISOString().slice(0, 9)
            );
          });

          if (holidayExits <= -1) {
            setActive(true);
          } else {
            setActive(false);
          }
        }

        await fetchLeave();

        await fetchAnnouncements();

        setAnnouncementLoading(false);
        setListData(data);
        setRefreshing(false);
        setCardLoading(false);
      } catch (error) {
        setRefreshing(false);
      }
    })();
  }, [refreshing]);

  const ToggleWork = async () => {
    if (leaveStatus) {
      showToast("You are currently on leave", false);
    } else {
      try {
        setLoading(true);
        const data = {
          id,
          date: getToday(),
          user_id: state?.user?.id,
          status: !toggle ? 1 : 0,
        };
        const res: any = await createWork(data);
        res?.data?.data?.id && setId(res?.data?.data?.id);
        if (res?.data?.data?.message) {
          showToast(res?.data?.data?.message, false);
          setLoading(false);
        } else if (res?.data?.status === 200) {
          showToast("Successfully changed status.");
          setToggle(!toggle);
          let newList: any = listData.find(
            (item: any) => item?.detailRoute === "/employee"
          );
          newList.items.map((item: any) => {
            if (item?.subTitle === "Working from Home") {
              item.title = !toggle ? +item.title + 1 : +item.title - 1;
            }
          });
          setLoading(false);
        }
      } catch (error) {
        showToast("Something went wrong", false);
        setLoading(false);
      }
    }
  };
  const handleWFH = () => {
    navigate(NAVIGATION_ROUTE.WFH_DASHBOARD);
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
              {leaveStatus
                ? statusClip("briefcase-clock", "OnLeave")
                : isActive && statusClip()}
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

                toggle
                  ? { backgroundColor: colors.primary }
                  : { backgroundColor: colors.primary },
              ]}
            >
              <Text
                style={{
                  ...ds.workText,

                  color: toggle ? colors.white : colors.white,
                }}
              >
                WFH
              </Text>
              <View style={{ marginHorizontal: 2 }} />
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Icon
                  name="arrow-top-right"
                  color={toggle ? colors.white : colors.white}
                  size={20}
                />
              )}
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
        <View style={{ height: 20 }} />
        <View style={{ width: "100%", paddingBottom: 25 }}>
          {!announcementLoading ? (
            <List
              list={{
                module: "Announcements",
                message: "No Upcoming Announcements",
                items: announcements,
                detailRoute: "announcementsListing",
              }}
            />
          ) : (
            <DashboardCardPlaceholder />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export { DashBoard };
