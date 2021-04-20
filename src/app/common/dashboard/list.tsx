import React from 'react';
import { Text, View } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../../assets/colors';
import { listStyle } from '../../../assets/styles';
import { transformList } from '../../utils/listtranform';
import { AppIcon } from '../icon';
import { ListItem } from './listItem';

const List = ({ list }: { list: any }) => {
  return (
    <>
      <Text style={listStyle.header}>{list?.module}</Text>
      <View style={listStyle.container}>
        {transformList(list.items, list?.module).map(
          (item: any, index: number) => (
            <ListItem
              title={item?.title}
              subTitle={item?.subTitle}
              isLast={list.items.length - 1 === index}
            />
          )
        )}
        <View style={listStyle.seeAll}>
          <Text style={listStyle.seeAllText}>See All</Text>
          <AppIcon
            name="arrow-right"
            size={normalize(20)}
            color={colors.primary}
          />
        </View>
      </View>
    </>
  );
};

export { List };
