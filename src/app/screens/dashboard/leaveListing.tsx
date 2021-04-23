import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
import normalize from 'react-native-normalize';
import {
  cardStyle,
  headerTxtStyle,
  holidayListingStyle,
  requestStyle,
} from '../../../assets/styles';
import { header as Header } from '../../common';
import State from '../../components/leave_screen/state';
import { ListPlaceholder } from '../../components/loader/listPlaceHolder';
import { getList } from '../../services';
import { transformList } from '../../utils/listtranform';

const LeaveListing = (props: any) => {
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
        <Text style={headerTxtStyle.headerText}>LEAVE</Text>
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ListPlaceholder />
        ) : (
          list?.length > 0 &&
          transformList(list, 'Leave', true).map((item, index) => (
            <View
              key={index}
              style={[
                holidayListingStyle.container,
                {
                  borderBottomWidth:
                    list.length - 1 === index ? 0 : normalize(2.3),
                },
              ]}
            >
              <View>
                <Text style={cardStyle.titleText}>{item?.title}</Text>
                <Text style={cardStyle.subTitleText}>{item?.subTitle}</Text>
              </View>
              <View>
                <State state={item?.status} />
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export { LeaveListing };
