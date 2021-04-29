import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../../assets/colors';
import {
  cardStyle,
  headerTxtStyle,
  holidayListingStyle,
  timeLogStyle,
} from '../../../assets/styles';
import { header as Header } from '../../common';
import { ListPlaceholder } from '../../components/loader/listPlaceHolder';
import { getList } from '../../services';
import { transformList } from '../../utils/listtranform';

const HolidayEventListing = (props: any) => {
  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    const getData = async (route: string) => {
      const data = await getList(route);
      data && setLoading(false);
      setList(data);
    };
    getData(props?.route?.params?.route);
  }, []);

  return (
    <View style={holidayListingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>HOLIDAYS & EVENTS</Text>
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ListPlaceholder />
        ) : list?.length > 0 ? (
          transformList(list, 'Holiday&Events', false, false).map(
            (item, index) => {
              return (
                <View
                  key={index}
                  style={[
                    holidayListingStyle.container,
                    {
                      borderBottomWidth: list.length - 1 === index ? 0 : 1,
                      paddingVertical: normalize(15),
                    },
                  ]}
                >
                  <View>
                    <Text style={cardStyle.titleText}>{item?.title}</Text>
                    <Text style={cardStyle.subTitleText}>{item?.subTitle}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}
                  >
                    <View
                      style={[
                        timeLogStyle.indicator,
                        cardStyle.detailIndicator,
                        {
                          backgroundColor:
                            item?.type === 'holiday'
                              ? colors.lightred
                              : item?.type === 'event'
                              ? colors.blue
                              : colors.lightbrown,
                        },
                      ]}
                    />
                    <Text style={cardStyle.subTitleText}>
                      {item?.type === 'event'
                        ? 'Event'
                        : item?.type === 'holiday'
                        ? 'Holiday'
                        : ''}
                    </Text>
                  </View>
                </View>
              );
            }
          )
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  );
};

export { HolidayEventListing };
