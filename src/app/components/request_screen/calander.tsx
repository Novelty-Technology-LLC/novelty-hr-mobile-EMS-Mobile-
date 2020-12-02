import React, { useState, useEffect, useContext } from 'react';
import { RangeCalendar, Calendar } from '@ui-kitten/components';
import { Text, View } from 'react-native';
import moment from 'moment';
import { MomentDateService } from '@ui-kitten/moment';
import { dateStringMapper, checkRepeat } from '../../utils';
import { calenderStyle, timeLogStyle } from '../../../assets/styles';
import { momentdate } from '../../utils/momentDate';
import colors from '../../../assets/colors';
import { RequestContext } from '../../reducer';
interface calenderPropType {
  style?: object;
  handleChange: Function;
  defaultValue?: object;
  error?: any;
  touched?: any;
  modal?: boolean;
}

const Calander = ({
  style,
  handleChange,
  defaultValue,
  error,
  touched,
  modal,
}: calenderPropType) => {
  const [range, setrange] = useState(
    defaultValue
      ? {
          endDate: new Date(defaultValue.endDate),
          startDate: new Date(defaultValue.startDate),
        }
      : ''
  );
  const [date, setDate] = useState(moment());
  const dateService = new MomentDateService();
  const { requests } = useContext(RequestContext);

  const filter = (date) => date.getDay() !== 0 && date.getDay() !== 6;
  const modalfilter = (date) => momentdate(date) < momentdate();
  const reviewed = [...requests.pastrequests, ...requests.requests].filter(
    (req) => req.state === 'Approved' || req.state === 'In Progress'
  );

  const DayCell = ({ date }, style) => {
    let approved = false;
    let inprogress = false;
    reviewed.map((req) => {
      if (
        checkRepeat(
          req.leave_date,
          JSON.stringify({ startDate: date, endDate: date })
        )
      ) {
        req.state === 'Approved' ? (approved = true) : (inprogress = true);
      }
    });

    return (
      <View
        style={[
          calenderStyle.dayBlock,
          style.container,
          approved ? { backgroundColor: colors.green } : {},
          inprogress ? { backgroundColor: colors.yellow } : {},
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
      handleChange('date')(`${JSON.stringify(range)}`);
    }
  }, [range]);

  return (
    <>
      <View
        style={modal ? { display: 'none' } : timeLogStyle.indicatorContainer}
      >
        <View style={{ flexDirection: 'row' }}>
          <View
            style={[timeLogStyle.indicator, { backgroundColor: colors.green }]}
          ></View>
          <Text style={timeLogStyle.rldate}>Approved</Text>
          <View style={[timeLogStyle.indicator, { marginLeft: 5 }]}></View>
          <Text style={timeLogStyle.rldate}>In progress</Text>
        </View>
        {range.startDate && !modal && (
          <Text style={timeLogStyle.rldate}>
            Total :{' '}
            {dateStringMapper(
              new Date(range.startDate).toString().substring(0, 15),
              range.endDate
                ? new Date(range.endDate).toString().substring(0, 15)
                : new Date(range.startDate).toString().substring(0, 15)
            )}
          </Text>
        )}
      </View>
      {modal ? (
        <Calendar
          style={timeLogStyle.modalCalender}
          dateService={dateService}
          date={date}
          onSelect={(nextRange) => {
            setDate(nextRange);
            handleChange(nextRange);
          }}
          name="date"
          label="date"
        />
      ) : (
        <RangeCalendar
          max={new Date(2021, 11)}
          filter={filter}
          range={range}
          onSelect={(nextRange) => setrange(nextRange)}
          style={[style.calendar, { marginTop: -15 }]}
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

export { Calander };
