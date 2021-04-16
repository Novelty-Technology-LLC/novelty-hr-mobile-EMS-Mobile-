import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../../assets/colors';
import { fonts } from '../../../assets/styles';
import { dashboarCard } from '../../utils';

const UpperCard = ({
  item,
  module,
  wfhCount,
}: {
  item: any;
  module: any;
  wfhCount: number;
}) => {
  return (
    <View style={{ flexDirection: 'column', marginTop: normalize(40) }}>
      <View style={{ marginLeft: normalize(20), marginTop: normalize(10) }}>
        {dashboarCard[module]}
      </View>
      <View
        style={{
          marginTop: 15,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            flexDirection: 'row',
            fontFamily: fonts.mulishBold,
            flexWrap: 'wrap',
            textAlign: 'center',
          }}
        >
          {item?.subTitle === 'Working from Home'
            ? wfhCount
            : item?.title?.length > 42
            ? item.title.slice(0, 42) + '...'
            : item?.title}
        </Text>
        <Text
          style={{
            marginTop: 6,
            fontFamily: fonts.poppinsMedium,
            color: colors.fontGrey,
          }}
        >
          {item.subTitle}
        </Text>
      </View>
    </View>
  );
};

export { UpperCard };