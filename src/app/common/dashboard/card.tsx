import React from 'react';
import { View, Text } from 'react-native';
import colors from '../../../assets/colors';
import { fonts } from '../../../assets/styles';
import { dashboarCard } from '../../utils';

const UpperCard = ({ item }: { item: any }) => {
  return (
    <View
      style={{
        marginTop: 30,
        backgroundColor: colors.snow,
        width: '49%',
        height: 100,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      <View>{dashboarCard[item.module]}</View>
      <View style={{ alignSelf: 'center', marginTop: 6 }}>
        <Text style={{ textAlign: 'center', fontFamily: fonts.mulishBold }}>
          {item.title}
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
