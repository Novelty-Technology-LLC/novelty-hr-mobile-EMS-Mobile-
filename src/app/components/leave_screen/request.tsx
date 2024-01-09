import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { requestStyle as style } from "../../../assets/styles";
import RequestWithImage from "./requestWithImage";
import State from "./state";

import getDay from "../../utils/getDay";
import { ApproveDeny } from "./approveDeny";
import { AdminRequestContext, AuthContext } from "../../reducer";
import { getLeaveOption } from "../../utils/getLeaveType";
import { checkRequest, getResponses, updateRequest } from "../../services";
import { showToast } from "../../common";
import { PendingRequestContext } from "../../reducer/pendingRequestReducer";
interface requestPropType {
  item: any;
  other?: boolean;
  recieved?: boolean;
  onPress?: Function;
}

const Request = ({ item, other, recieved, onPress }: requestPropType) => {
  let { day } = getDay(item);
  const [isReplied, setIsReplied] = useState(false);
  const { state } = useContext<any>(AuthContext);
  const { adminrequests, dispatchAdmin } = useContext<any>(AdminRequestContext);
  const { dispatchPendingRequest } = useContext<any>(PendingRequestContext);

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
  const leave_option = getLeaveOption(item?.leave_option);

  const onPressAlert = (action: string) => {
    actionRef.current?.showLoading();
    actionRef.current?.show();

    checkRequest(item?.id)
      .then((res) => {
        if (res === "Pending" || res === "In Progress") {
          setTimeout(async () => {
            if (alertRef.current) {
              alertRef.current.setActionHandle(action);
              alertRef.current.setResponse(await getRequest(item));
            }
          }, 500);
        }
        actionRef.current?.hideLoading();
      })
      .catch((err) => {
        actionRef.current?.hideLoading();
      });
  };

  const onPressSubmit = ({
    action,
    note,
  }: {
    action: string;
    note: string;
  }) => {
    alertRef.current?.showSubmitLoading();
    action === "Approve" && (action = "Approved");
    action === "Deny" && (action = "Denied");

    const newData: any = {
      leave_id: item?.id,
      action,
      note,
      requested_to: state.user.id, //REMOVABLE
      quotaId: item.sender,
      notification_token: item.device_tokens?.map(
        (item: any) => item.notification_token
      ),
      lead_name: state.user.first_name, //REMOVABLE
      user_name: item.user.first_name,
      uuid: state.user.uuid, //REMOVABLE
    };

    updateRequest(item.id, newData)
      .then((data: any) => {
        item.state = data.status;
        dispatchAdmin({
          type: "REPLY",
          payload: item,
        });
        dispatchPendingRequest({
          type: "SUBTRACT_PENDING_REQUEST",
          payload: { key: "pending_leave" },
        });
        actionRef.current?.hideLoading();
        actionRef.current?.hide();
        alertRef.current?.hideSubmitLoading();
        showToast("Request replied ");
      })
      .catch((error) => {
        alertRef.current?.hideSubmitLoading();
        showToast("Something went wrong ", false);
      });
  };

  const getRequest = async (item: any) => {
    try {
      const res: any = await getResponses(
        item?.id,
        item.device_tokens[0].user_id
      );

      const pto_leaves = res[0]?.leaveQuota?.find(
        (item: any) => item.leave_type === "PAID TIME OFF"
      );
      const float_leaves = res[0]?.leaveQuota?.find(
        (item: any) => item.leave_type === "FLOATING DAY"
      );

      return {
        total_pto: pto_leaves?.leave_total,
        total_float: float_leaves?.leave_total,
        used_pto: pto_leaves?.leave_remaining,
        used_float: float_leaves?.leave_remaining,
      };
    } catch (error) {}
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
              <Text style={style.date}>{item.date}</Text>
              <View style={style.stateView}>
                <State state={item.state} />
              </View>
            </View>
            <Text style={style.type}>
              <Text> {item.type}</Text>
              {leave_option !== "FULL DAY" && (
                <Text> {`(${leave_option})`}</Text>
              )}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={style.container}>
          <RequestWithImage item={item} onPress={onPress} type={item.type} />
          {recieved ? (
            <View style={style.subcontainer}>
              <Text style={style.days}>
                {day > 1 ? day + " days ago" : (day = " Today")}
              </Text>
              <View style={style.status}>
                <State state={item.state} />
              </View>
              {!isReplied && (
                <View style={style.buttonContainer}>
                  <ApproveDeny
                    onPressSubmit={onPressSubmit}
                    ref={{ alertRef, actionRef }}
                    title="Approve"
                    style={style}
                    item={item}
                    fromStack={true}
                    onPress={onPressAlert}
                  />
                  <View style={style.buttonSpacer}></View>
                  <ApproveDeny
                    ref={{ alertRef, actionRef }}
                    onPressSubmit={onPressSubmit}
                    title="Deny"
                    style={style}
                    item={item}
                    fromStack={true}
                    onPress={onPressAlert}
                  />
                </View>
              )}
            </View>
          ) : (
            <View style={style.pastState}>
              <State state={item.state} />
            </View>
          )}
        </View>
      )}
    </>
  );
};

export { Request };
