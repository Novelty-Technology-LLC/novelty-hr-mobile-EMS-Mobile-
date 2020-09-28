import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import colors from '../../assets/colors';
import { leaveDashboardStyle as style } from '../../assets/styles';
import { AppIcon } from '../common';

const RequestButton = () => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        style={style.plus}
        onPress={() => navigation.navigate('requestLeave')}
      >
        <AppIcon name="plus" color={colors.white} size={30} />
      </TouchableOpacity>
    </>
  );
};

export { RequestButton };
