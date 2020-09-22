import React from 'react';
import { Text, View } from 'react-native';
import { header as Header } from '../../common/header';
import { approveRequest as style } from '../../../assets/styles';
import { headerText } from '../../../assets/styles';

const ApproveRequest = ({ route }) => {
  const { date, id, sender, state, type } = route.params;
  console.log('data -> ', sender);

  return (
    <View>
      <Header>
        <Text style={headerText}>{sender},</Text>
        <Text style={style.headerDate}>{date}</Text>
      </Header>
    </View>
  );
};

export { ApproveRequest };
