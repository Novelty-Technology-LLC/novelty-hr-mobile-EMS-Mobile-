import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import normalize from 'react-native-normalize';
import {
  headerTxtStyle,
  holidayListingStyle,
  requestStyle,
} from '../../../assets/styles';
import { tabHeader as Header } from '../../common';
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
    <View style={{ flex: 1 }}>
      <Header>
        <Text style={headerTxtStyle.headerText}>LEAVE LISTING</Text>
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ListPlaceholder />
        ) : (
          list?.length > 0 &&
          transformList(list, 'Leave').map((item, index) => (
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
              <View>
                <Text style={holidayListingStyle.title}>{item?.title}</Text>
                <Text style={requestStyle.type}>{item.type}</Text>
                <Text style={holidayListingStyle.subTitle}>
                  {item?.subTitle}
                </Text>
              </View>
              <State state={item?.status} />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export { LeaveListing };
