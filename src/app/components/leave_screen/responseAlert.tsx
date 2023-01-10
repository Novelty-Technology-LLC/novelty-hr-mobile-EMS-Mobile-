import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
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
import { goBack } from "../../utils/navigation";
import LeaveAlert from "./alert/leaveAlert";
import WfhAlert from "./alert/wfhAlert";

const EditAlert = forwardRef(
  (
    {
      hide,
      item,
      setShow,
      setisLoading,
      fromStack,
      screenName = "Leave",
      onPressSubmit,
    }: {
      hide: () => void;
      item: dataType;
      screenName: string;
      setShow: Function;
      fromStack: boolean;
      setisLoading: Function;
      onPressSubmit: ({
        note,
        action,
      }: {
        note: string;
        action: string;
        quotaId?: string;
      }) => void;
    },
    ref: any
  ) => {
    const [showAlert, setShowAlert] = useState(true);
    const [action, setAction] = useState("");
    const [note, setNote] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);

    const hideModal = () => {
      hide();
      setShowAlert(false);
      setShow(false);
    };

    const [responses, setresponses] = useState<any>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          setResponse: (data: any) => setresponses(data),
          setActionHandle: (val: string) => setAction(val),
          showSubmitLoading: () => setSubmitLoading(true),
          hideSubmitLoading: () => setSubmitLoading(false),
        };
      },
      []
    );

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
            title: submitLoading ? "Submitting.." : responses ? "SUBMIT" : "",
            onPress: () => {
              onPressSubmit({ action, note, quotaId: responses.id });
            },
          }}
          negativeButton={{
            titleStyle: style.cancel,
            title: "CANCEL",
            onPress: () => hideModal(),
          }}
          keyboardDismissMode='on-drag'
          overlayStyle={Platform.OS === "ios" && { paddingBottom: 120 }}
        >
          {!responses ? (
            <QuotaPlaceHolder />
          ) : (
            <View
              style={{
                marginBottom: normalize(-15),
                marginRight: normalize(-3),
              }}
            >
              <View style={style.titleView}>
                <Text style={style.title}>Your response is ready to go</Text>
              </View>
              <View style={style.row}>
                <RequestWithImage
                  item={item}
                  type={screenName === "Leave" ? item.type : "WFH"}
                />
                <View style={style.gap}></View>
                <View style={style.stateView}>
                  <View style={requestStyle.rowAlign}>
                    {action === "Approve" && (
                      <View style={{ marginRight: 5 }}>
                        <AppIcon
                          name='check-circle'
                          size={15}
                          color={colors.green}
                        ></AppIcon>
                      </View>
                    )}
                    <Text style={requestStyle.state}>Approve</Text>
                  </View>
                  <View style={requestStyle.rowAlign}>
                    {action === "Deny" && (
                      <View style={{ marginRight: 5 }}>
                        <AppIcon
                          name='check-circle'
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
              {screenName === "Leave" ? (
                <LeaveAlert responses={responses} />
              ) : (
                <WfhAlert responses={responses} />
              )}
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
  }
);

export { EditAlert };
