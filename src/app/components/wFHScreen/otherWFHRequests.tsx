import React, { useState, useEffect, useContext } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { otherRequestsStyle } from "../../../assets/styles";
import { useNavigation } from "@react-navigation/native";
import { EmptyContainer, SmallHeader } from "../../common";
import {
  getAllRequests,
  getAllWFHRequests,
  getMyRequest,
} from "../../services";
import { getUser, mapDataToRequest } from "../../utils";
import { AdminRequestContext, AuthContext } from "../../reducer";
import { AdminPlaceHolder } from "../loader";
import { getLeave } from "../../services";
import HistoryToggle from "../../common/historyToggle";
import { NAVIGATION_ROUTE } from "../../constant/navigation.contant";
import History from "../leave_screen/history";
import { MyWFHRequests } from "./myWFHRequests";
import { WFHRequest } from "./WFHrequest";
import WFHHistory from "./wFHhistory";
import {
  mapDataToWFHRequest,
  mapObjectToWFHRequest,
} from "../../utils/requestWfhTransformer";

const OtherWFHRequests = ({ refresh, params = 0 }: any) => {
  const navigation = useNavigation();
  const [toggle, setToggle] = useState("toggle-switch-off");
  const [loading, setLoading] = useState(false);
  const { state } = useContext(AuthContext);
  const { adminrequests, dispatchAdmin } = useContext(AdminRequestContext);

  const getAdminRequest = async () => {
    setLoading(true);
    const user = await getUser();
    getAllWFHRequests(JSON.parse(user).id)
      .then((data: Array) => {
        let pastreq = data.filter(
          (item) =>
            item.status === "Approved" ||
            item.status === "Denied" ||
            item.status === "Cancelled"
        );

        let myreq = data.filter((item) => item.status === "Pending");

        const progressreq = data.filter(
          (item) => item.status === "In Progress"
        );
        progressreq.map((req) => {
          for (let i = 0; i < req.wfh_approvals.length; i++) {
            if (req.wfh_approvals[i].requested_to === state.user.id) {
              pastreq = pastreq.concat(req);
              pastreq.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
            }
          }
          const common = pastreq.map((item) => item.id);
          if (common.includes(req.id)) return;
          myreq = myreq.concat(req);
          myreq.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
        });

        dispatchAdmin({
          type: "CHANGE",
          payload: {
            my: mapDataToWFHRequest(myreq),
            past: mapDataToWFHRequest(pastreq),
          },
        });

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAdminRequest();
    setToggle("toggle-switch-off");
  }, [refresh, params]);

  useEffect(() => {
    const get = async () => {
      if (+params) {
        let data = await getMyRequest(+params);
        data = mapObjectToWFHRequest(data[0]);
        navigation.navigate("approveLeave", data[0]);
      }
    };
    get();
  }, [params]);

  return (
    <View style={otherRequestsStyle.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          setToggle(
            toggle === "toggle-switch" ? "toggle-switch-off" : "toggle-switch"
          );
        }}
      >
        <View style={otherRequestsStyle.header}>
          <SmallHeader text="Requests Received" history={true} />
          {/* {adminrequests.pastadminrequests.length > 0 && (
            <HistoryToggle toggle={toggle} setToggle={setToggle} />
          )} */}
          <HistoryToggle toggle={toggle} setToggle={setToggle} />
        </View>
      </TouchableWithoutFeedback>
      {loading ? (
        <AdminPlaceHolder />
      ) : (
        <FlatList
          data={adminrequests.adminrequests}
          renderItem={(item) => {
            return (
              <WFHRequest
                item={item.item}
                other={true}
                recieved={true}
                onPress={() =>
                  navigation.navigate("approveWfhLeave", item.item)
                }
              />
            );
          }}
          keyExtractor={(item) => item?.id}
        />
      )}
      {adminrequests?.adminrequests?.length < 1 && !loading && (
        <EmptyContainer text="You have not received any request." />
      )}
      {loading && (
        <>
          <SmallHeader text="Past Requests" />
          <AdminPlaceHolder />
        </>
      )}
      {toggle === "toggle-switch" && !loading && (
        <WFHHistory other={true} requests={adminrequests?.pastadminrequests} />
      )}
    </View>
  );
};

export default React.memo(OtherWFHRequests);
