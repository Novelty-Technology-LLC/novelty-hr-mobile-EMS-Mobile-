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
import { dashboardStyle as ds, headerTxtStyle, listStyle } from "../../../assets/styles";
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
  shoutOutService,
} from "../../services";
import moment from "moment";
import normalize from "react-native-normalize";
import { DashboardCardPlaceholder } from "../../common";
import { getCurrentRouteName, navigate } from "../../utils/navigation";
import { time } from "../../utils/listtranform";
import { getWorkShift } from "../../utils/getWorkShift";
import CustomImage from "../../common/image";
import { RouteNames } from "../../constant/route_names";
import { ShoutoutContext } from "../../reducer/shoutoutReducer";

const DashBoard = () => {
  const { shoutoutState } = useContext(ShoutoutContext);
  const { state }: any = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [leaveStatus, setLeaveStatus] = useState(false);
  const [announcementLoading, setAnnouncementLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [list, setList] = useState<any>(null);
  const [shoutout, setshoutout] = useState<any>([]);

  const [shoutoutLoading, setshoutoutLoading] = useState<any>(false);
  const [eventloading, setEventloading] = useState<any>(null);
  const [announcements, setAnnouncements] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [cardLoading, setCardLoading] = useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);
  const getShoutList = (startDate: any, endDate: any) => {
    shoutOutService(startDate, endDate).then((data: any) => {
      const list = data.reverse().slice(0, 3);
      setshoutout(list);
    });
  };

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

  useEffect(() => {
    setEventloading(true);
    const getData = async (route: string) => {
      const data = await getList(route);

      setEventloading(false);
      setList(data);
    };
    getData("holidayeventslisting");
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

  // update shoutout list when new shoutout is created
  useEffect(() => {
    if (shoutoutState.needUpdate !== -1) {
      getShoutList(moment(), moment());
    }
  }, [shoutoutState]);

  const fetchAnnouncements = async () => {
    try {
      var response: any = await getRequest("/webportal/announcements", {
        limit: 3,
      });

      setAnnouncements(response);
    } catch (error) { }
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
    } catch (error) { }
  };
  useEffect(() => {
    (async () => {
      try {
        setAnnouncementLoading(true);
        setshoutoutLoading(true);
        setCardLoading(true);

        let dashboardData: any;
        await Promise.all([
          getDashboard(),
          fetchLeave(),
          fetchAnnouncements(),
          getShoutList(moment(), moment())
        ]).then(values => {
          dashboardData = values[0];
        })

        setAnnouncementLoading(false);
        setshoutoutLoading(false);

        setListData(dashboardData);
        setCardLoading(false);

        setRefreshing(false);
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
            <Text style={ds.name}>
              <Text style={ds.name}>{state?.user?.first_name}</Text>
            </Text>

            {/* <Text style={ds.workshift}>{state?.user?.work_shift}</Text> */}
          </View>
          <TouchableWithoutFeedback
            onPress={ToggleWork}
            style={[
              ds.work,
              toggle
                ? { backgroundColor: colors.greenButton }
                : { backgroundColor: colors.fontGrey },
            ]}
          >
            <View
              style={[
                ds.work,

                toggle
                  ? { backgroundColor: colors.greenButton }
                  : { backgroundColor: colors.fontGrey },
              ]}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Icon
                  name="check-circle"
                  color={toggle ? colors.white : colors.white}
                  size={20}
                />
              )}
              <View style={{ marginHorizontal: 2 }} />
              <Text
                style={{
                  ...ds.workText,

                  color: toggle ? colors.white : colors.white,
                }}
              >
                Work from Home
              </Text>
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
                items: announcements,
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
                items: shoutout,
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
