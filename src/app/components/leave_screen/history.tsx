import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { historyStyle as style } from '../../../assets/styles';
import { EmptyContainer, SmallHeader } from '../../common';
import { Request } from './request';
import Swipe from './swipe';

const History = ({ requests, other }: any) => {
  const navigation = useNavigation();
  let row: Array<any> = [];

  return (
    <View style={style.container}>
      <SmallHeader text="Past Requests" leave={true} />
      {requests.length > 0 ? (
        <FlatList
          data={requests}
          renderItem={(item) =>
            other ? (
              <Request
                item={item.item}
                other={other}
                onPress={() => navigation.navigate('requestDetail', item.item)}
              />
            ) : (
              <Swipeable
                ref={(ref) => (row[item.index] = ref)}
                renderRightActions={() => (
                  <Swipe
                    item={item.item}
                    other={true}
                    onPress={() => row[item.index].close()}
                  />
                )}
              >
                <Request
                  item={item.item}
                  other={other}
                  onPress={() =>
                    navigation.navigate('requestDetail', item.item)
                  }
                />
              </Swipeable>
            )
          }
          keyExtractor={(item) => item.id}
        />
      ) : (
        <EmptyContainer text="You don't have past requests" />
      )}
    </View>
  );
};

export default History;
