import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import normalize from 'react-native-normalize';
import { fonts, headerTxtStyle } from '../../../assets/styles';
import { tabHeader as Header } from '../../common';
import { getList } from '../../services';

const HolidayEventListing = (props: any) => {
  const [list, setList] = useState<any>(null);

  useEffect(() => {
    const getData = async (route: string) => {
      const data = await getList(route);
      setList(data);
    };
    getData(props?.route?.params?.route);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Text style={headerTxtStyle.headerText}>HOLIDAY & EVENTS</Text>
      </Header>
      {list &&
        list.map((item) => {
          return (
            <View style={{ margin: normalize(20) }}>
              <Text
                style={{
                  fontFamily: fonts.mulishBold,
                  fontSize: normalize(18),
                }}
              >
                {item?.title}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.mulishBold,
                  fontSize: normalize(18),
                }}
              >
                {item?.subTitle}
              </Text>
            </View>
          );
        })}
    </View>
  );
};

export { HolidayEventListing };
