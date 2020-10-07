import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import colors from '../../../assets/colors';
import {
  deleteAlertStyle,
  editAlertStyle,
  swipeStyle as style,
} from '../../../assets/styles';
import { AppIcon } from '../../common';
import { DeleteAlert } from './deleteAlert';

const Swipe = ({ item }: any) => {
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('requestLeave', item)}
        style={deleteAlertStyle.iconContainer}
      >
        <AppIcon name="square-edit-outline" color={colors.primary} size={15} />
      </TouchableOpacity>
      <DeleteAlert item={item} />
      <View style={editAlertStyle.spacer}></View>
    </View>
  );
};

export default Swipe;
