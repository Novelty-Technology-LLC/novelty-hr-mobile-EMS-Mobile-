import { Calendar, Layout, RangeCalendar } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";

export const CustomCalendar = ({
  style = {},
  handleChange,
  defaultValue,
  error,
  touched,
  modal = false,
  range,
  setRange,
  initialDate,
  date,
  setDate,
  rangeSelection = true,
  allowRangeSelection = true,
  onDateChange,
  onRangeDateChange,
  initialVisibleDate,
  componentRef,
  selectedDate,
}: {
  style?: any;
  handleChange?: Function;
  defaultValue?: object;
  error?: any;
  touched?: any;
  modal?: boolean;
  olddata_id?: number;
  range?: any;
  setRange?: any;
  date?: string;
  setDate?: any;
  rangeSelection?: boolean;
  initialDate?: any;
  componentRef?: any;
  selectedDate?: any;
  allowRangeSelection?: any;
  initialVisibleDate?: any;
  onDateChange?: (date: any) => void;
  onRangeDateChange?: (nextRange: any) => void;
}) => {
  const now = new Date();
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 0
  );

  return rangeSelection ? (
    <Calendar
      ref={componentRef}
      date={selectedDate}
      min={new Date()}
      onSelect={(nextDate) => onDateChange(nextDate)}
    />
  ) : (
    <Layout style={styles.container} level="1">
      <View style={styles.calendarContainer}>
        <RangeCalendar
          max={new Date(2022, 12)}
          min={new Date(2020, 6)}
          range={range}
          onSelect={onRangeDateChange}
          style={style.calendar}
        />
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
  },
  calendarContainer: {},
  text: {},
});
