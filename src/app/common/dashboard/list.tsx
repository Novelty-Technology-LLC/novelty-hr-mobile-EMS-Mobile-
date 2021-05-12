import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../../assets/colors';
import { listStyle } from '../../../assets/styles';
import { transformList } from '../../utils/listtranform';
import { navigate } from '../../utils/navigation';
import { EmptyContainer } from '../emptyContainer';
import { AppIcon } from '../icon';
import { ListItem } from './listItem';

const List = ({ list }: { list: any }) => {
  return (
    <>
      <Text style={listStyle.header}>{list?.module}</Text>
      {list?.items?.length > 0 ? (
        <View style={listStyle.container}>
          {transformList(
            list?.items?.slice(0, 3),
            list?.module,
            false,
            true
          ).map((item: any, index: number) => (
            <ListItem
              key={index}
              title={item?.title}
              subTitle={item?.subTitle}
              isLast={2 === index}
              type={item?.type}
            />
          ))}
          <TouchableOpacity
            onPress={() =>
              navigate(list?.detailRoute, { route: list?.detailRoute })
            }
            style={listStyle.seeAll}
          >
            <Text style={listStyle.seeAllText}>See All</Text>
            <AppIcon
              name="arrow-right"
              size={normalize(18)}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <EmptyContainer
          text={`${
            list?.module === 'Leave'
              ? 'No Upcoming Leave'
              : 'No Upcoming Holidays and Events'
          }`}
          containerStyle={{ height: normalize(100) }}
        />
      )}
    </>
  );
};

export { List };
