import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { AuthContext } from "../../reducer";
import { dashboardStyle as ds, headerTxtStyle } from "../../../assets/styles";
import {
  Cards,
  header as Header,
  List,
  showToast,
  snackBarMessage,
  snackErrorBottom,
} from "../../common";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../assets/colors";
import { getToday } from "../../utils";
import { createWork, getWork, getDashboard, getRequest } from "../../services";
import moment from "moment";
import normalize from "react-native-normalize";
import { DashboardCardPlaceholder } from "../../common";
import { getCurrentRouteName, navigate } from "../../utils/navigation";
import { time } from "../../utils/listtranform";

const DashBoard = () => {
  const { state } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const fetchWork = async () => {
      try {
        setLoading(true);
        const res: any = await getWork({
          user_id: state?.user?.id,
          date: moment().format("YYYY-MM-DD"),
        });
        setId(res?.data?.data?.id ?? null);

        setToggle(+res?.data?.data?.status === 1 ? true : false);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    state?.user?.id && fetchWork();
  }, [state?.user?.id]);

  useEffect(() => {
    (async () => {
      try {
        setAnnouncementLoading(true)
        setCardLoading(true);
        const data: any = await getDashboard();
        const announcements = await fetchAnnouncements();
        setListData(data);
        setRefreshing(false);
        setCardLoading(false);
      } catch (error) {
        setRefreshing(false);
      }
    })();
  }, [refreshing]);

  const ToggleWork = async () => {
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
        showToast(res?.data?.data?.message,false)
        setLoading(false);
      } else if (res?.data?.status === 200) {
        showToast("Successfully changed status.");
        setToggle(!toggle);
        let newList: any = listData.find(
          (item) => item?.detailRoute === "/employee"
        );
        newList.items.map((item) => {
          if (item?.subTitle === "Working from Home") {
            item.title = !toggle ? +item.title + 1 : +item.title - 1;
          }
        });
        setLoading(false);
      }
    } catch (error) {
      showToast("Something went wrong",false);
      setLoading(false);
    }
  };

  fetchAnnouncements = async () => {
    try {
      var response:any = await getRequest("/webportal/announcements", {
        limit: 3,
      });
      setAnnouncements(response);
      setAnnouncementLoading(false)
    } catch (error) {}
  };

  return (
    <View style={ds.safeArea}>
      <Header icon={false} container={{ paddingVertical: normalize(4.076) }}>
        <View style={ds.headerContainer}>
          <Text style={headerTxtStyle.headerText}>DASHBOARD</Text>
          <TouchableOpacity onPress={() => navigate("Profile")}>
            <Image source={{ uri: state?.user?.image_url }} style={ds.image} />
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
            <Text style={ds.name}>{state?.user?.first_name}</Text>
          </View>
          <TouchableWithoutFeedback onPress={ToggleWork}>
            <View
              style={[
                ds.work,
                toggle
                  ? { backgroundColor: colors.greenButton }
                  : { backgroundColor: colors.ash },
              ]}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Icon name="check-circle" color={colors.white} size={20} />
              )}
              <View style={{ marginHorizontal: 2 }} />
              <Text style={ds.workText}>Work from Home</Text>
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
                message: "No Upcomming Announcements",
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
