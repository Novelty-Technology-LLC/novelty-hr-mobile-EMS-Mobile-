import React, { useContext } from 'react';
import { View } from 'react-native';
import { myRequestsStyle as style } from '../../../assets/styles';
import { DropDown } from '../../common';
import { TimeLogContext } from '../../reducer';
import { groupBydate, groupByproject } from '../../utils';

const DropDownView = ({
  getLogs,
  setWeeksLogs,
  groupby,
  setGroupby,
  week,
  setWeek,
}: any) => {
  const { timelogs } = useContext(TimeLogContext);
  const weekOptions = [
    { label: 'This week', value: 'This week', key: '1' },
    { label: 'Past week', value: 'Past week', key: '2' },
  ];
  const groupByOptions = [
    { label: 'Date', value: 'Date', key: '1' },
    { label: 'Project', value: 'Project', key: '2' },
  ];

  return (
    <View style={style.dropDownView}>
      <DropDown
        options={weekOptions}
        type="week"
        week={week}
        onChange={async (filter: any, val: any) => {
          getLogs(filter, true);
          setWeek(val);
        }}
      />
      <View style={style.dropDown}></View>
      <DropDown
        options={groupByOptions}
        type="group"
        group={groupby}
        onChange={(val: string) => {
          setGroupby(val);
          if (val === 'Date') {
            setWeeksLogs([...Object.entries(groupBydate(timelogs.past))]);
          } else {
            setWeeksLogs([...Object.entries(groupByproject(timelogs.past))]);
          }
        }}
      />
    </View>
  );
};

export default DropDownView;
