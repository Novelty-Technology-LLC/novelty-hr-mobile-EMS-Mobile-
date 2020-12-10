// import React, { useContext } from 'react';
// import { View, Text } from 'react-native';
// import colors from '../../../assets/colors';
// import { calenderStyle } from '../../../assets/styles';
// import { RequestContext } from '../../reducer';
// import { checkRepeat } from '../../utils';

// const DayCell = ({ date }, style) => {
//   const { dispatchRequest, requests } = useContext(RequestContext);
//   const reviewed = [...requests.pastrequests, ...requests.requests].filter(
//     (req) => req.state === 'Approved' || req.state === 'In Progress'
//   );
//   let approved = false;
//   let inprogress = false;
//   reviewed.map((req) => {
//     if (
//       checkRepeat(
//         req.leave_date,
//         JSON.stringify({ startDate: date, endDate: date })
//       )
//     ) {
//       req.state === 'Approved' ? (approved = true) : (inprogress = true);
//     }
//   });
//   return (
//     <View
//       style={[
//         calenderStyle.dayBlock,
//         style.container,
//         approved ? { backgroundColor: colors.green } : {},
//         inprogress ? { backgroundColor: colors.yellow } : {},
//       ]}
//     >
//       <Text
//         style={[calenderStyle.dayBlockText, style.text]}
//       >{`${date.getDate()}`}</Text>
//     </View>
//   );
// };

// export default DayCell;
