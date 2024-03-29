import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, FlatList, TouchableWithoutFeedback } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { myRequestsStyle as style } from "../../../assets/styles";
import { useNavigation } from "@react-navigation/native";
import { EmptyContainer, SmallHeader } from "../../common";
import { getUser } from "../../utils";
import { getMyRequest, getPastWFHRequests, getWfhDetail } from "../../services";
import { UserPlaceHolder } from "../loader";
import HistoryToggle from "../../common/historyToggle";
import moment from "moment";
import { NAVIGATION_ROUTE } from "../../constant/navigation.contant";
import { WFHRequest } from "./WFHrequest";
import WFHHistory from "./wFHhistory";
import { RequestWFHContext } from "../../reducer/requestWorkFromReducer";
import {
  mapDataToWFHRequest,
  mapObjectToWFHRequest,
} from "../../utils/requestWfhTransformer";
import { WFHSwipe } from "./wfhSwipe";

const MyWFHRequests = ({
  loading,
  refresh,
  params,
  screenName,
}: {
  loading: boolean;
  refresh: number;
  params: number;
  screenName: string;
}) => {
  const navigation = useNavigation();
  const [history, setHistory] = useState(false);
  const { requestsWFH, dispatchWFHRequest } =
    useContext<any>(RequestWFHContext);

  let row: Array<any> = [];

  const [toggle, setToggle] = useState("toggle-switch-off");
  const getPast = async () => {
    const user = await getUser();

    getPastWFHRequests(JSON.parse(user).id)
      .then((data) => {
        dispatchWFHRequest({
          type: "CHANGEPAST",
          payload: mapDataToWFHRequest(data),
        });
      })
      .catch((err) => {});
  };

  const getPastCallback = useCallback(() => getPast(), []);

  useEffect(() => {
    getPastCallback();
    row.map((item) => item.close());
    setToggle("toggle-switch-off");
  }, [refresh, params]);

  useEffect(() => {
    const get = async () => {
      if (params) {
        let data: any = await getWfhDetail(+params);
        data = mapObjectToWFHRequest(data);
        navigation.navigate(screenName, data[0]);
      }
    };
    get();
  }, [params]);

  const renderItem = (item: any) => {
    const workDate = moment(item?.item?.start_date?.slice(0, 10)).format(
      "YYYY-MM-DD"
    );
    const today = moment().format("YYYY-MM-DD");

    if (workDate >= today) {
      if (workDate === today) {
        return new Date().getHours() < 10 ? (
          <Swipeable
            shouldCancelWhenOutside
            ref={(ref) => (row[item.index] = ref)}
            renderRightActions={() => {
              return (
                <WFHSwipe
                  isLeave={false}
                  item={item.item}
                  screenName={NAVIGATION_ROUTE.Request_WFH}
                  onPress={() => row[item.index].close()}
                />
              );
            }}
          >
            <WFHRequest
              item={item.item}
              other={false}
              onPress={() =>
                navigation.navigate(
                  NAVIGATION_ROUTE.Request_WFH_DETAIL,
                  item.item
                )
              }
            />
          </Swipeable>
        ) : (
          <WFHRequest
            item={item.item}
            other={false}
            onPress={() =>
              navigation.navigate(
                NAVIGATION_ROUTE.Request_WFH_DETAIL,
                item.item
              )
            }
          />
        );
      } else {
        return (
          <Swipeable
            ref={(ref) => (row[item.index] = ref)}
            renderRightActions={() => (
              <WFHSwipe
                isLeave={false}
                item={item.item}
                screenName={NAVIGATION_ROUTE.Request_WFH}
                onPress={() => row[item.index].close()}
              />
            )}
          >
            <WFHRequest
              item={item.item}
              other={false}
              onPress={() => navigation.navigate(screenName, item.item)}
            />
          </Swipeable>
        );
      }
    } else {
      return (
        <WFHRequest
          item={item.item}
          other={false}
          onPress={() => navigation.navigate(screenName, item.item)}
        />
      );
    }
  };

  return (
    <View style={style.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          setToggle(
            toggle === "toggle-switch" ? "toggle-switch-off" : "toggle-switch"
          );
        }}
      >
        {/*  new Date(item.item.leave_date.startDate) <= new Date() &&
            new Date().getHours() >= 10 ? */}
        <View style={[style.header]}>
          <SmallHeader text="My Requests" history={true} />
          <HistoryToggle
            toggle={toggle}
            screen="leave"
            setHistory={setHistory}
            history={history}
          />
        </View>
      </TouchableWithoutFeedback>
      {loading ? <UserPlaceHolder /> : null}
      {requestsWFH.requests[0] ? (
        <FlatList
          data={requestsWFH.requests}
          renderItem={renderItem}
          // new Date().getHours() >= 16 && item.item.state === 'Approved'?
          keyExtractor={(item) => item.id}
        />
      ) : (
        !loading && <EmptyContainer text="You don't have current requests" />
      )}

      {toggle === "toggle-switch" &&
        (!requestsWFH?.pastrequests ? (
          <>
            <SmallHeader text="Past Requests" />
            <UserPlaceHolder />
          </>
        ) : (
          <WFHHistory requests={requestsWFH?.pastrequests} refresh={refresh} />
        ))}
    </View>
  );
};

export { MyWFHRequests };
