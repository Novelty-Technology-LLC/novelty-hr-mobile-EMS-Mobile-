import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Platform,
  Keyboard,
} from "react-native";
import { header as Header, showToast } from "../../common";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { default as theme } from "../../../assets/styles/leave_screen/custom-theme.json";
import {
  approveRequest,
  headerTxtStyle,
  requestLeave as style,
} from "../../../assets/styles";
import {
  CalendarComponent,
  Teams,
  Leavetype,
  Description,
} from "../../components/request_screen";
import { button as Button } from "../../common";
import { Formik } from "formik";
import * as Yup from "yup";
import { editRequest, postRequest } from "../../services";
import colors from "../../../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { AuthContext, RequestContext } from "../../reducer";
import {
  checkIfRequestedForLeave,
  compareDateBetween,
  dateMapper,
  momentdate,
} from "../../utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from "moment";
import { CustomRadioButton } from "../../common/radioButton";

const validationSchema = Yup.object().shape({
  date: Yup.object()
    .shape({
      startDate: Yup.date().nullable(),
      endDate: Yup.date().nullable(),
    })
    .required("Date is required"),
  type: Yup.string().required().label("type"),
  note: Yup.string().required("Leave note is required").label("note"),
  lead: Yup.array().of(Yup.number()).label("lead").required("Lead is required"),
  status: Yup.string().label("status"),
});

const RequestLeave = ({ route }: any) => {
  const olddata = route.params;
  const navigation = useNavigation();
  const { state } = useContext<any>(AuthContext);
  const { dispatchRequest, requests } = useContext<any>(RequestContext);

  const [isLoading, setisLoading] = useState(false);
  const [quotaMsg, setQuota] = useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  let leave_option = "FULL DAY";

  const initialValues = {
    date: olddata ? olddata.date : "",
    type: olddata ? olddata.type : "PAID TIME OFF",
    status: olddata ? olddata.state : "Pending",
    note: olddata ? olddata.note : "",
    lead: olddata ? olddata.lead : [],
  };

  const checkIfLeaveExist = (date: string) => {
    if (!olddata) {
      const findCurrentLeave = requests.requests.filter((item: any) => {
        return compareDateBetween(date, item.start_date, item.end_date);
      });
      return findCurrentLeave;
    } else {
      const findCurrentLeave = requests.requests
        .filter(
          (item: any) =>
            olddata.id !== item.id &&
            (item.state === "Approved" ||
              item.state === "In Progress" ||
              item.state === "Pending")
        )
        .filter((item: any) => {
          return compareDateBetween(date, item.start_date, item.end_date);
        });
      return findCurrentLeave;
    }
  };

  const submitRequest = (data: any) => {
    postRequest(data)
      .then((res: any) => {
        dispatchRequest({ type: "UPDATEQUOTA", payload: res.data.data.quota });
        dispatchRequest({
          type: "ADD",
          payload: {
            ...res.data.data,
            leave_date: {
              startDate: res.data.data.leave.start_date,
              endDate: res.data.data.leave.end_date,
            },
          },
        });
        navigation.navigate("leaveList");
        setisLoading(false);
        showToast("Request created 🏝️");
      })
      .catch((err) => {
        setisLoading(false);
      });
  };

  const updateReq = (data: any) => {
    data.start_date = momentdate(data.leave_date.startDate, "YYYY-MM-DD");
    data.end_date = momentdate(data.leave_date.endDate, "YYYY-MM-DD");

    editRequest(olddata.id, data)
      .then((res: any) => {
        res.quota.map((item: any) => {
          dispatchRequest({
            type: "UPDATEQUOTA",
            payload: { ...item, leave_option: res.leave_option },
          });
        });
        const { leave_date, ...rest } = res.leave;
        dispatchRequest({
          type: "UPDATE",
          payload: {
            ...rest,
            leave_date: {
              startDate: moment(leave_date.startDate).format("YYYY-MM-DD"),
              endDate: moment(leave_date.endDate).format("YYYY-MM-DD"),
            },
          },
        });
        navigation.navigate("leaveList");
        showToast("Request updated 🚢");

        setisLoading(false);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    updateLeaveOption();
  }, [olddata]);

  useEffect(() => {
    showQuotaToast();
  }, []);
  const showQuotaToast = () => {
    const response = requests?.quota?.map(
      (item: any) => item?.leave_remaining <= 0
    );

    const leaveQuotaBool = response?.every((element: any) => element === true);
    leaveQuotaBool && setQuota("You have exceeded your leave quota.");
  };
  const updateLeaveOption = () => {
    if (olddata?.leave_option === "FIRST HALF") {
      setSelectedIndex(1);
      leave_option = "FIRST HALF";
    } else if (olddata?.leave_option === "SECOND HALF") {
      leave_option = "SECOND HALF";
      setSelectedIndex(2);
    } else {
      setSelectedIndex(0);
    }
  };
  const onSubmit = async (values: any) => {
    const date = JSON.parse(values.date);

    if (checkIfLeaveExist(moment(date.startDate).format("YYYY-MM-DD")).length) {
      return showToast("You cannot take leave twice on same day ✋", false);
    }

    const leaveDate = moment(date.startDate).format("YYYY-MM-DD");
    const today = moment(new Date()).format("YYYY-MM-DD");

    if (
      moment(leaveDate).format("YYYY-MM-DD") <= today &&
      Number(moment(new Date()).format("HH")) >= 10
    ) {
      if (moment(leaveDate).format("YYYY-MM-DD") <= today) {
        showToast("The selected date has passed ✋", false);
      } else {
        showToast("You cannot take leave after 10 am ⏰", false);
      }
    } else {
      try {
        const allrequests = [
          ...requests.pastrequests,
          ...requests.requests,
        ].filter(
          (req) =>
            req.state === "Approved" ||
            req.state === "In Progress" ||
            req.state === "Pending"
        );
        if (!olddata && checkIfRequestedForLeave(allrequests, values)) {
          return showToast("You cannot request the same date twice ✋", false);
        }
        if (olddata && checkIfRequestedForLeave(allrequests, values, olddata)) {
          return showToast("You cannot request the same date twice ✋", false);
        }
        const date = JSON.parse(values.date);
        let dayArray: any = [];
        const startDate = new Date(date.startDate).toString().slice(0, 15);

        let endDate = "";
        if (date["endDate"] === null) {
          endDate = startDate;
        } else {
          endDate = new Date(date.endDate).toString().slice(0, 15);
        }
        let day = 0;
        if (olddata) {
          let oldday = dateMapper(
            olddata.leave_date.startDate,
            olddata.leave_date.endDate
          );

          day = dateMapper(startDate, endDate);
          if (olddata.type === values.type) {
            dayArray = [{ days: day - oldday, dayType: values.type }];
          } else {
            dayArray = [
              { days: day, dayType: values.type },
              { days: -oldday, dayType: olddata.type },
            ];
          }
          dayArray.map((day: any) => {
            if (values.type === day.dayType) {
              // if (checkValidityQuota(requests.quota, values.type, day.days)) {
              //   throw new Error(`Selected day exceeds ${values.type}`);
              // }
            }
          });
        } else {
          day = dateMapper(startDate, endDate);
          // if (checkValidityQuota(requests.quota, values.type, day)) {
          //   throw new Error(`Selected day exceeds ${values.type}`);
          // }
        }

        let dayData: any = day;

        if (selectedIndex === 0) {
          dayData = dayData;
        } else {
          if (selectedIndex === 1) {
            leave_option = "FIRST HALF";
          } else {
            leave_option = "SECOND HALF";
          }
          dayData = dayData * 0.5;
        }

        const requestData = {
          ...values,
          leave_date: {
            startDate,
            endDate,
          },
          day: dayData,
          leave_option: leave_option,
          requestor_id: state.user.id,
          requestor_name: state.user.first_name,
          uuid: state.user.uuid,
          gender: state.user.gender,
        };

        setisLoading(true);
        Keyboard.dismiss();
        olddata ? updateReq(requestData) : submitRequest(requestData);
      } catch (error: any) {
        if (!error.message.includes("Selected day exceeds"))
          error.message = "Unkonown error occured";
        setisLoading(false);
        showToast(`${error.message} ❌`, false);
      }
    }
  };

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <Header icon={true}>
        <View style={approveRequest.headContainer}>
          <Text style={headerTxtStyle.headerText}>Request Leave</Text>
        </View>
      </Header>
      <KeyboardAwareScrollView
        style={style.container}
        scrollEnabled={true}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={Platform.OS === "ios" ? 180 : 70}
        extraHeight={Platform.OS === "android" ? 140 : 50}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode={"none"}
      >
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values) => onSubmit(values)}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              {quotaMsg ? <Text style={style.quotaMsg}>{quotaMsg}</Text> : null}
              <CalendarComponent
                selectedOption={selectedIndex}
                workfromHome={false}
                style={style}
                handleChange={handleChange}
                defaultValue={olddata && olddata.leave_date}
                olddata_id={olddata && olddata.id}
                error={errors}
                touched={touched}
              />
              <Teams
                error={errors}
                handleChange={handleChange}
                defaultValue={olddata && olddata.lead}
                values={values}
              />
              <Leavetype
                handleChange={handleChange}
                defaultValue={olddata && olddata.type}
              />

              <CustomRadioButton
                title={"Leave Option"}
                dataList={DATA}
                setSelectedIndex={setSelectedIndex}
                selectedIndex={selectedIndex}
              />
              <Description
                handleChange={handleChange}
                defaultValue={olddata && olddata?.note}
                error={errors}
                touched={touched}
              />
              <Button
                onPress={() => {
                  Keyboard.dismiss();
                  handleSubmit();
                }}
                disabled={isLoading}
              >
                <View style={style.buttonView}>
                  <Text style={style.buttonText}>
                    {olddata ? "Update " : "Submit Request"}
                  </Text>
                  {isLoading && (
                    <ActivityIndicator size={30} color={colors.white} />
                  )}
                </View>
              </Button>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </ApplicationProvider>
  );
};
const DATA = [
  {
    title: "Full Day",
  },
  {
    title: "First Half",
  },
  {
    title: "Second Half",
  },
];
export { RequestLeave };
