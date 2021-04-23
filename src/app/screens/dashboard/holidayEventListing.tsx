import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import normalize from 'react-native-normalize';
import { headerTxtStyle, holidayListingStyle } from '../../../assets/styles';
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
    <View style={{ flex: 1 }}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>HOLIDAY & EVENTS</Text>
      </Header>
      {loading ? (
        <ListPlaceholder />
      ) : list?.length > 0 ? (
        transformList(list, 'Holiday&Events').map((item, index) => {
          return (
            <View
              key={index}
              style={[
                holidayListingStyle.container,
                {
                  borderBottomWidth:
                    list.length - 1 === index ? 0 : normalize(3),
                },
              ]}
            >
              <Text style={holidayListingStyle.title}>{item?.title}</Text>
              <Text style={holidayListingStyle.subTitle}>{item?.subTitle}</Text>
            </View>
          );
        })
      ) : (
        <></>
      )}
    </View>
  );
};

export { HolidayEventListing };
