import React, { useContext, useEffect, useState } from "react";
import { View, Text, Platform } from "react-native";
import {
  approveRequest,
  deleteAlertStyle,
  editAlertStyle as style,
  requestStyle,
} from "../../../assets/styles";
import RequestWithImage from "./requestWithImage";
import Textarea from "react-native-textarea";
import { dataType } from "../../interface";
import { AppIcon, showToast, snackBarMessage } from "../../common";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../assets/colors";
import { AdminRequestContext, AuthContext } from "../../reducer";
import { getResponses, updateRequest } from "../../services";
import { ConfirmDialog } from "react-native-simple-dialogs";
import normalize from "react-native-normalize";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { QuotaPlaceHolder } from "../loader";

let leave_quota: any = {
  total_pto: 0,
  total_float: 0,
  used_pto: 0,
  used_float: 0,
};
const EditAlert = ({
  item,
  status,
  setShow,
  setisLoading,
}: {
  item: dataType;
  status: string;
  setShow: Function;
  setisLoading: Function;
}) => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(true);
  let [action, setAction] = useState(status);
  const [note, setNote] = useState("");
  const show = () => setShowAlert(true);
  const hide = () => {
    setShowAlert(false);
    setShow(false);
  };
  const [loading, setLoading] = useState(false);

  const { state } = useContext(AuthContext);
  const { dispatchAdmin } = useContext(AdminRequestContext);
  const [responses, setresponses] = useState();

  const onSubmit = async () => {
    action === "Approve" && (action = "Approved");
    action === "Deny" && (action = "Denied");

    const newData = {
      leave_id: item.id,
      action,
      note,
      requested_to: state.user.id,
      quotaId: item.sender,
      notification_token: item.device_tokens?.map(
        (item) => item.notification_token
      ),
      lead_name: state.user.first_name,
      user_name: item.user.first_name,
      uuid: state.user.uuid,
    };

    setisLoading(true);

    updateRequest(item.id, newData)
      .then((data) => {
        item.state = data.status;

        dispatchAdmin({
          type: "REPLY",
          payload: item,
        });
        setisLoading(true);

        showToast("Request replied");
      })
      .catch((error) => {
        showToast("Something went wrong");
      });
  };
  const getRequest = async (item: any) => {
    try {
      const res: any = await getResponses(
        item.id,
        item.device_tokens[0].user_id
      );

      const pto_leaves = res[0]?.leaveQuota?.find(
        (item) => item.leave_type === "PAID TIME OFF"
      );
      const float_leaves = res[0]?.leaveQuota?.find(
        (item) => item.leave_type === "FLOATING DAY"
      );
      leave_quota = {
        total_pto: pto_leaves?.leave_total,
        total_float: float_leaves?.leave_total,
        used_pto: pto_leaves?.leave_used,
        used_float: float_leaves?.leave_used,
      };
      setresponses(leave_quota);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequest(item);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <ConfirmDialog
        visible={showAlert}
        onTouchOutside={() => setShowAlert(false)}
        dialogStyle={{
          borderRadius: 5,
        }}
        positiveButton={{
          titleStyle: style.delete,
          title: "SUBMIT",
          onPress: () => {
            onSubmit();
            hide();
          },
        }}
        negativeButton={{
          titleStyle: style.cancel,
          title: "CANCEL",
          onPress: () => hide(),
        }}
        keyboardDismissMode="on-drag"
        overlayStyle={Platform.OS === "ios" && { paddingBottom: 120 }}
      >
        {!responses ? (
          <QuotaPlaceHolder />
        ) : (
          <View
            style={{ marginBottom: normalize(-15), marginRight: normalize(-3) }}
          >
            <View style={style.titleView}>
              <Text style={style.title}>Your response is ready to go</Text>
            </View>
            <View style={style.row}>
              <RequestWithImage item={item} type={item.type} />
              <View style={style.gap}></View>
              <View style={style.stateView}>
                <View style={requestStyle.rowAlign}>
                  {action === "Approve" && (
                    <View style={{ marginRight: 5 }}>
                      <AppIcon
                        name="check-circle"
                        size={15}
                        color={colors.green}
                      ></AppIcon>
                    </View>
                  )}
                  <Text
                    style={requestStyle.state}
                    onPress={() => setAction("Approve")}
                  >
                    Approve
                  </Text>
                </View>
                <View style={requestStyle.rowAlign}>
                  {action === "Deny" && (
                    <View style={{ marginRight: 5 }}>
                      <AppIcon
                        name="check-circle"
                        size={15}
                        color={colors.green}
                      ></AppIcon>
                    </View>
                  )}
                  <Text
                    style={requestStyle.state}
                    onPress={() => setAction("Deny")}
                  >
                    Deny
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 10 }}></View>
            <View style={approveRequest.cardFooterContainer}>
              <View style={approveRequest.cardFooter}>
                <Text style={approveRequest.remainingLeave}>
                  {"Remaining :"}
                </Text>
                <Text>
                  <Text style={approveRequest.totalDays}>
                    {leave_quota.used_pto + "/" + leave_quota.total_pto}
                  </Text>
                  <Text style={approveRequest.leaveTypes}>{" PTO"}</Text>
                </Text>
                <Text>
                  <Text style={approveRequest.totalDays}>
                    {leave_quota.used_float + "/" + leave_quota.total_float}
                  </Text>
                  <Text style={approveRequest.leaveTypes}>{" Floating "}</Text>
                </Text>
              </View>
            </View>
            <View style={style.main}>
              <Textarea
                containerStyle={style.textareaContainer}
                style={style.textArea}
                maxLength={200}
                placeholder={"Write a short note for your response"}
                placeholderTextColor={"#c7c7c7"}
                underlineColorAndroid={"transparent"}
                onChangeText={(data: string) => setNote(data)}
              />
            </View>
          </View>
        )}
      </ConfirmDialog>
    </View>
  );
};

export { EditAlert };
