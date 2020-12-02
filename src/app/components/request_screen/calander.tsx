import React, { useState, useEffect, useContext } from 'react';
import { RangeCalendar, Calendar } from '@ui-kitten/components';
import { Text, View } from 'react-native';
import moment from 'moment';
import { MomentDateService } from '@ui-kitten/moment';
import { dateStringMapper } from '../../utils';
import { theme, timeLogStyle } from '../../../assets/styles';
import { momentdate } from '../../utils/momentDate';
import colors from '../../../assets/colors';
import { RequestContext } from '../../reducer';
import { app } from 'firebase-admin';
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
  const { dispatchRequest, requests } = useContext(RequestContext);

  const filter = (date) => date.getDay() !== 0 && date.getDay() !== 6;
  const modalfilter = (date) => momentdate(date) < momentdate();
  // const reviewed = [...requests.pastrequests, ...requests.requests].filter(
  //   (req) => req.state !== 'Pending' && req.state !== 'In Progress'
  // );
  // console.log(reviewed.length);

  // const DayCell = ({ date }, style) => {
  //   let approved = false;
  //   let inprogress = false;
  //   reviewed.map((req) => {
  //     approved = req.leave_date.startDate === new Date(date).toDateString();
  //     inprogress = req.leave_date.startDate === new Date(date).toDateString();
  //   });
  //   console.log(approved);

  //   return (
  //     <View
  //       style={[
  //         {
  //           marginHorizontal: 10,
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //           marginVertical: '10%',
  //           paddingVertical: '10%',
  //           borderRadius: 3,
  //           zIndex: -2,
  //         },
  //         style.container,
  //         approved ? { backgroundColor: colors.green } : {},
  //         inprogress ? { backgroundColor: colors.yellow } : {},
  //       ]}
  //     >
  //       <Text
  //         style={[
  //           {
  //             alignSelf: 'center',
  //             color: colors.black,
  //           },
  //           style.text,
  //         ]}
  //       >{`${date.getDate()}`}</Text>
  //     </View>
  //   );
  // };

  useEffect(() => {
    if (!modal) {
      handleChange('date')(`${JSON.stringify(range)}`);
    }
  }, [range]);

  return (
    <>
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
          style={style.calendar}
          name="date"
          label="date"
          // renderDay={DayCell}
        />
      )}
      {error && error.date && touched.date && (
        <Text style={style.error}>Date is required</Text>
      )}
    </>
  );
};

export { Calander };
