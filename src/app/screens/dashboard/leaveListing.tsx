import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { headerTxtStyle } from '../../../assets/styles';
import { tabHeader as Header } from '../../common';
import { getList } from '../../services';
import { transformList } from '../../utils/listtranform';

const LeaveListing = (props: any) => {
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
        <Text style={headerTxtStyle.headerText}>LEAVE LISTING</Text>
      </Header>
      <Text>LeaveListing</Text>
      {/* {list && transformList(list,'props?.route?.params?.route').map((item) => <Text>{item?.title}</Text>)} */}
    </View>
  );
};

export { LeaveListing };
