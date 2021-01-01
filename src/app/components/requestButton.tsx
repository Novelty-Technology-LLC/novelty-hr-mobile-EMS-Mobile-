import React from 'react';
import { TouchableOpacity } from 'react-native';
import colors from '../../assets/colors';
import { leaveDashboardStyle as style } from '../../assets/styles';
import { AppIcon } from '../common';
import { navigate } from '../utils/navigation';

const RequestButton = ({
  screen,
  addToList,
  olddata,
}: {
  screen: string;
  addToList?: Boolean;
  olddata?: Object;
}) => {
  return (
    <>
      <TouchableOpacity
        style={style.plus}
        onPress={() => {
          navigate(screen, olddata);
        }}
      >
        <AppIcon name="plus" color={colors.white} size={30} />
      </TouchableOpacity>
    </>
  );
};

export { RequestButton };
