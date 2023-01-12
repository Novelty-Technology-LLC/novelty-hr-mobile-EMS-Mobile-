import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import colors from "../../../assets/colors";
import { deleteAlertStyle, swipeStyle as style } from "../../../assets/styles";
import { Alert, AppIcon } from "../../common";
import Normalize from "../../utils/normalize";
import moment from "moment";
import { dateStringMapper, momentdate } from "../../utils";
import { WFHDeleteAlert } from "./wfhDeleteAlert";
import { NAVIGATION_ROUTE } from "../../constant/navigation.contant";
import { checkRequest } from "../../services/leaveService";
import { checkWFHRequest } from "../../services/workFromHomeService";
import { dateRange } from "../../utils/dateFilter";

export const WFHSwipe = ({
  item,
  value,
  other,
  timelog,
  edittimelog,
  onPress,
  screenName = "requestLeave",
  setLoading,
  isLeave,
}: any) => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);
  const onEdit = () => {
    onPress();
    // navigation.navigate(NAVIGATION_ROUTE.Request_WFH, item);
    checkWFHRequest(item?.id)
      .then((res) => {
        if (res === "Pending") {
          navigation.navigate(screenName, {
            ...item,
            date: dateRange(
              item?.start_date.slice(0, 11),
              item?.end_date.slice(0, 11)
            ),
          });
        } else {
          show();
        }
      })
      .catch((err) => {});
  };

  const onLogEdit = () => {
    onPress();
    navigation.navigate("loglistings", item);
  };

  const checkLeaveDate = (date: any) => {
    const current_date = moment().format("YYYY-MM-DD");
    if (
      moment(current_date).isSame(momentdate(date?.startDate, "YYYY-MM-DD"))
    ) {
      return true;
    } else {
      return false;
    }
  };

  return other ? (
    <View style={style.othercontainer}>
      {item?.status === "Approved" && (
        <>
          <WFHDeleteAlert item={item} other={other} onPress={onPress} />
        </>
      )}
    </View>
  ) : (
    <>
      {item.status === "Pending" ? (
        <View style={style.container}>
          <TouchableOpacity
            onPress={() => onEdit()}
            style={deleteAlertStyle.iconContainer}
          >
            <AppIcon
              name="square-edit-outline"
              color={colors.primary}
              size={Normalize(20)}
            />
          </TouchableOpacity>
          <>
            <WFHDeleteAlert item={item} other={other} onPress={onPress} />
          </>
        </View>
      ) : (
        <View style={style.othercontainer}>
          <>
            <WFHDeleteAlert item={item} other={true} onPress={onPress} />
          </>
        </View>
      )}
      <Alert showAlert={showAlert} setShowAlert={setShowAlert}>
        Your request just got reviewed.You cannot edit now.
      </Alert>
    </>
  );
};
