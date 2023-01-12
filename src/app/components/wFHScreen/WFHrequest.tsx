import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { requestStyle as style } from "../../../assets/styles";

import getDay from "../../utils/getDay";
import { AdminRequestContext, AuthContext } from "../../reducer";
import { getLeaveOption } from "../../utils/getLeaveType";
import State from "../leave_screen/state";
import RequestWithImage from "../leave_screen/requestWithImage";
import { ApproveDeny } from "../leave_screen/approveDeny";
import { checkWFHRequest, getQuota, updateWFHRequests } from "../../services";
import { showToast } from "../../common";
import { navigationRef } from "../../utils/navigation";
import { dateStringMapper, formatDate } from "../../utils";

interface requestPropType {
  item: any;
  other?: boolean;
  recieved?: boolean;
  onPress?: Function;
}

const WFHRequest = ({ item, other, recieved, onPress }: requestPropType) => {
  let { day } = getDay(item);
  const [isReplied, setIsReplied] = useState(false);
  const { state } = useContext<any>(AuthContext);
  const { adminrequests, dispatchAdmin } = useContext<any>(AdminRequestContext);
  const alertRef = useRef<any>(null);
  const actionRef = useRef<any>(null);

  const checkReplied = () => {
    item.leave_approvals &&
      item.leave_approvals.map((item: any) => {
        if (item.requested_to === state.user.id) {
          setIsReplied(true);
        }
      });
  };

  useEffect(() => {
    checkReplied();
  }, [adminrequests.adminrequests]);

  const work_option = getLeaveOption(item?.option);

  const onPressAlert = (action: string) => {
    actionRef.current?.showLoading();
    actionRef.current?.show();
    checkWFHRequest(item?.id)
      .then((res) => {
        if (res === "Pending" || res === "In Progress") {
          setTimeout(async () => {
            if (alertRef.current) {
              alertRef.current.setActionHandle(action);
              alertRef.current.setResponse(await getRequest(item.user_id));
            }
          }, 500);
        }
        actionRef.current?.hideLoading();
      })
      .catch((err) => {
        actionRef.current?.hideLoading();
      });
  };

  const getRequest = async (id: number) => {
    const res: any = await getQuota(id);
    return res[0];
  };

  const onPressSubmit = ({
    action,
    note,
    quotaId,
  }: {
    action: string;
    note: string;
    quotaId?: string;
  }) => {
    alertRef.current?.showSubmitLoading();
    action === "Approve" && (action = "Approved");
    action === "Deny" && (action = "Denied");

    const newData: any = {
      wfh_id: item.id,
      requested_to: state.user.id,
      action,
      note,
      notification_token: item.device_tokens?.map(
        (item: any) => item.notification_token
      ),
      lead_name: state.user.first_name,
      user_name: item.user.first_name,
      quotaId,
    };

    updateWFHRequests(item.id, newData)
      .then(() => {
        dispatchAdmin({
          type: "REPLY",
          payload: item,
        });
        actionRef.current?.hideLoading();
        actionRef.current?.hide();
        alertRef.current?.hideSubmitLoading();
        showToast("Request replied");
      })
      .catch((err) => {
        alertRef.current?.hideSubmitLoading();
        showToast("Something went wrong", false);
      });
  };

  return (
    <>
      {!other ? (
        <TouchableOpacity
          style={style.container}
          onPress={() => onPress && !other && onPress()}
        >
          <View style={style.dateView}>
            <View style={style.status}>
              <Text style={style.date}>
                {dateStringMapper(item?.start_date, item?.end_date)}
              </Text>
              <View style={style.stateView}>
                <State state={item.status} />
              </View>
            </View>
            <Text style={style.type}>
              {/* <Text> {"Work From Home"}</Text> */}
              {work_option && <Text> {`${work_option}`}</Text>}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={style.container}>
          <RequestWithImage
            item={item}
            onPress={onPress}
            type={""}
            name={item.start_date}
          />
          {recieved ? (
            <View style={style.subcontainer}>
              <Text style={style.days}>
                {day > 1 ? day + " days ago" : (day = " Today")}
              </Text>
              <View style={style.status}>
                <State state={item.status} />
              </View>
              {!isReplied && (
                <View style={style.buttonContainer}>
                  <ApproveDeny
                    onPressSubmit={onPressSubmit}
                    ref={{ alertRef, actionRef }}
                    title="Approve"
                    style={style}
                    item={item}
                    screenName="WFH"
                    onPress={onPressAlert}
                  />
                  <View style={style.buttonSpacer}></View>
                  <ApproveDeny
                    onPressSubmit={onPressSubmit}
                    ref={{ alertRef, actionRef }}
                    title="Deny"
                    style={style}
                    item={item}
                    screenName="WFH"
                    onPress={onPressAlert}
                  />
                </View>
              )}
            </View>
          ) : (
            <View style={style.pastState}>
              <State state={item.status} />
            </View>
          )}
        </View>
      )}
    </>
  );
};

export { WFHRequest };
