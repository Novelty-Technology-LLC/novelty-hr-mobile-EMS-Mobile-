import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Platform,
  Keyboard,
} from "react-native";
import {
  header as Header,
  showToast,
  SmallHeader,
  snackBarMessage,
  snackErrorBottom,
} from "../../common";
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
  Description,
} from "../../components/request_screen";
import { button as Button } from "../../common";
import { Formik } from "formik";
import * as Yup from "yup";
import { editRequest, postRequest, postWFHRequest } from "../../services";
import colors from "../../../assets/colors";
import { StackActions, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../reducer";
import { snackErrorTop } from "../../common";
import {
  checkIfRequested,
  checkValidityQuota,
  dateMapper,
  momentdate,
} from "../../utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from "moment";
import { CustomRadioButton } from "../../common/radioButton";
import { RequestWFHContext } from "../../reducer/requestWorkFromReducer";
import { Teams } from "../../components/request_screen/teams";
import { goBack } from "../../utils/navigation";
import { NAVIGATION_ROUTE } from "../../constant/navigation.contant";

const validationSchema = Yup.object().shape({
  date: Yup.object()
    .shape({
      startDate: Yup.date().nullable(),
      endDate: Yup.date().nullable(),
    })
    .required("Date is required"),
  note: Yup.string().required("WFH note is required").label("note"),
  lead: Yup.array().of(Yup.number()).label("lead").required("Lead is required"),
  status: Yup.string().label("status"),
});

const RequestWFH = ({ route, navigation }: any) => {
  const olddata = route.params;
  const { state } = useContext(AuthContext);
  const { requestsWFH, dispatchWFHRequest } = useContext(RequestWFHContext);
  const [isLoading, setisLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  let option = "FULL DAY";
  const initialValues = {
    date: olddata ? olddata.date : "",
    status: olddata ? olddata.state : "Pending",
    note: olddata ? olddata.note : "",
    lead: olddata ? olddata.lead : [],
  };

  const submitRequest = (data) => {
    console.log(data, "d");

    return;
    postWFHRequest(data)
      .then((res) => {
        dispatchWFHRequest({
          type: "UPDATEQUOTA",
          payload: res.data.data.quota,
        });
        dispatchWFHRequest({ type: "ADD", payload: res.data.data.leave });
        setisLoading(false);
        showToast("Request created");
        goBack();
      })
      .catch((err) => {
        setisLoading(false);
      });
  };

  const updateReq = (data) => {
    data.start_date = momentdate(data.leave_date.startDate, "YYYY-MM-DD");
    data.end_date = momentdate(data.leave_date.endDate, "YYYY-MM-DD");

    editRequest(olddata.id, data)
      .then((res: any) => {
        res.quota.map((item) => {
          dispatchWFHRequest({
            type: "UPDATEQUOTA",
            payload: { ...item, option: res.option },
          });
        });

        dispatchWFHRequest({ type: "UPDATE", payload: res.leave });
        showToast("Request updated");
        navigation.navigate(NAVIGATION_ROUTE.WFH_DASHBOARD);
        setisLoading(false);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    updateLeaveOption();
  }, [olddata]);

  const updateLeaveOption = () => {
    if (olddata?.option === "FIRST HALF") {
      setSelectedIndex(1);
      option = "FIRST HALF";
    } else if (olddata?.option === "SECOND HALF") {
      option = "SECOND HALF";

      setSelectedIndex(2);
    } else {
      setSelectedIndex(0);
    }
  };
  const onSubmit = async (values) => {
    console.log(values, "vs");

    const date = JSON.parse(values?.date);
    console.log(date, "dateeeeeee");
    console.log(date["endDate"] === null, "datssssaaeSS");

    const leaveDate = moment(date.startDate).format("YYYY-MM-DD");
    const today = moment(new Date()).format("YYYY-MM-DD");

    if (
      moment(leaveDate).format("YYYY-MM-DD") <= today &&
      Number(moment(new Date()).format("HH")) >= 10
    ) {
      if (moment(leaveDate).format("YYYY-MM-DD") <= today) {
        showToast("The selected date has passed. ", false);
      } else {
        showToast("You cannot take WFH after 10 am", false);
      }
    } else {
      try {
        const allrequests = [
          ...requestsWFH.pastrequests,
          ...requestsWFH.requests,
        ].filter(
          (req) =>
            req.state === "Approved" ||
            req.state === "In Progress" ||
            req.state === "Pending"
        );
        if (!olddata && checkIfRequested(allrequests, values)) {
          return showToast("You cannot request the same date twice", false);
        }
        if (olddata && checkIfRequested(allrequests, values, olddata)) {
          return showToast("You cannot request the same date twice", false);
        }
        const date = JSON.parse(values.date);
        let dayArray: any = [];
        const startDate = new Date(date.startDate).toString().slice(0, 15);
        let endDate = "";
        if (date["endDate"] === null) {
          console.log("ok", startDate);
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
          dayArray.map((day) => {
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
            option = "FIRST HALF";
          } else {
            option = "SECOND HALF";
          }
          dayData = dayData * 0.5;
        }

        const requestData = {
          ...values,
          startDate: startDate,
          endDate: endDate,
          day: dayData,
          option: option,
          requestor_id: state.user.id,
          requestor_name: state.user.first_name,
          uuid: state.user.uuid,
          gender: state.user.gender,
        };

        setisLoading(true);

        Keyboard.dismiss();

        olddata ? updateReq(requestData) : submitRequest(requestData);
      } catch (error) {
        if (!error.message.includes("Selected day exceeds"))
          error.message = "Unkonown error occured";
        setisLoading(false);

        showToast(error.message);
      }
    }
  };

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <Header icon={true}>
        <View style={approveRequest.headContainer}>
          <Text style={headerTxtStyle.headerText}>Request WFH</Text>
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
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={"none"}
      >
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values) => onSubmit(values)}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <CalendarComponent
                workfromHome={true}
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

              <CustomRadioButton
                title={"WFH Option"}
                dataList={DATA}
                setSelectedIndex={setSelectedIndex}
                selectedIndex={selectedIndex}
              />
              <Description
                workfromhome={true}
                handleChange={handleChange}
                defaultValue={olddata && olddata?.note}
                error={errors}
                touched={touched}
                hashtagError={undefined}
                onChangeHashTag={undefined}
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
                    {olddata ? "Upadate " : "Submit Request"}
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
export { RequestWFH };
