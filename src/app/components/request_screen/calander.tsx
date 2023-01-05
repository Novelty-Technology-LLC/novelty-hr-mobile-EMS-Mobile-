import React, { useState, useEffect, useContext } from "react";
import { RangeCalendar, Calendar } from "@ui-kitten/components";
import { Text, View } from "react-native";
import moment from "moment";
import { MomentDateService } from "@ui-kitten/moment";
import {
  dateStringMapper,
  checkRepeat,
  checkRepeatLeaveDays,
} from "../../utils";
import { calenderStyle, timeLogStyle } from "../../../assets/styles";
import { momentdate } from "../../utils/momentDate";
import colors from "../../../assets/colors";
import { RequestContext } from "../../reducer";
import { RequestWFHContext } from "../../reducer/requestWorkFromReducer";
interface calenderPropType {
  style?: any;
  handleChange: Function;
  defaultValue?: object;
  error?: any;
  touched?: any;
  modal?: boolean;
  workfromHome?: boolean;
  olddata_id?: number;
}

const CalendarComponent = ({
  style,
  handleChange,
  defaultValue,
  error,
  touched,
  modal,
  olddata_id,
  workfromHome = false,
}: calenderPropType) => {
  const currentDate = new Date();

  const [range, setrange] = useState<any>(
    defaultValue
      ? {
          endDate: new Date(defaultValue?.endDate),
          startDate: new Date(defaultValue?.startDate),
        }
      : ""
  );
  const [date, setDate] = useState(moment());
  const dateService = new MomentDateService();
  const { requests } = useContext(RequestContext);
  const { requestsWFH } = useContext(RequestWFHContext);

  const filter = (date) => date.getDay() !== 0 && date.getDay() !== 6;
  const modalfilter = (date) => momentdate(date) < momentdate();
  let reviewed: any = [];
  if (workfromHome) {
    reviewed = [...requestsWFH.pastrequests, ...requestsWFH.requests].filter(
      (req) =>
        req.state === "Approved" ||
        req.state === "In Progress" ||
        req.state === "Pending"
    );
  } else {
    reviewed = [...requests.pastrequests, ...requests.requests].filter(
      (req) =>
        req.state === "Approved" ||
        req.state === "In Progress" ||
        req.state === "Pending"
    );
  }

  if (olddata_id) {
    reviewed = reviewed.filter((req) => req.id !== olddata_id);
  }

  const DayCell = ({ date }, style) => {
    let approved = false;
    let inprogress = false;
    let pending = false;
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      reviewed.map((req) => {
        if (
          checkRepeatLeaveDays(
            req.leave_date,
            JSON.stringify({ startDate: date, endDate: date })
          )
        ) {
          req.state === "Approved"
            ? (approved = true)
            : req.state === "In Progress"
            ? (inprogress = true)
            : req.state === "Pending"
            ? (pending = true)
            : {};
        }
      });
    }

    return (
      <View
        style={[
          style.container,
          calenderStyle.dayBlock,
          approved
            ? { backgroundColor: colors.green }
            : inprogress
            ? { backgroundColor: colors.yellow }
            : pending
            ? { backgroundColor: colors.lightGrey }
            : {},
        ]}
      >
        <Text
          style={[calenderStyle.dayBlockText, style.text]}
        >{`${date.getDate()}`}</Text>
      </View>
    );
  };

  useEffect(() => {
    if (!modal) {
      handleChange("date")(`${JSON.stringify(range)}`);
    }
  }, [range]);

  return (
    <>
      <View
        style={modal ? { display: "none" } : timeLogStyle.indicatorContainer}
      >
        <View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={[
                timeLogStyle.indicator,
                { backgroundColor: colors.lightGrey },
              ]}
            ></View>
            <Text style={timeLogStyle.rldate}>Pending</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={[
                timeLogStyle.indicator,
                { backgroundColor: colors.green },
              ]}
            />
            <Text style={timeLogStyle.rldate}>Approved</Text>
            <View style={[timeLogStyle.indicator, { marginLeft: 5 }]}></View>
            <Text style={timeLogStyle.rldate}>In progress</Text>
          </View>
        </View>
        {range.startDate && !modal && (
          <Text style={timeLogStyle.rldate}>
            Total : {dateStringMapper(range.startDate, range.endDate)}
          </Text>
        )}
      </View>
      {modal ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Calendar
            style={timeLogStyle.modalCalender}
            dateService={dateService}
            max={moment("2022-12-31")}
            min={moment("2020-01-01")}
            date={date}
            onSelect={(nextRange) => {
              setDate(nextRange);
              handleChange(nextRange);
            }}
            name="date"
            label="date"
          />
        </View>
      ) : (
        <RangeCalendar
          max={new Date(currentDate.getFullYear() + 1, 7)}
          min={new Date(2020, 6)}
          filter={filter}
          range={range}
          onSelect={(nextRange) => {
            setrange(nextRange);
          }}
          style={[style?.calendar, { marginTop: -15, borderBottomWidth: 0 }]}
          name="date"
          label="date"
          renderDay={DayCell}
        />
      )}
      {error && error.date && touched.date && (
        <Text style={style.error}>Date is required</Text>
      )}
    </>
  );
};

export { CalendarComponent };
