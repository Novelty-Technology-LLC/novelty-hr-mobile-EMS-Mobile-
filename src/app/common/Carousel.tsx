import React, { useEffect } from 'react';
import { View, ScrollView, Text, NativeScrollEvent } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/colors';
import { CarouselStyle } from '../../assets/styles';
import { navigate } from '../utils/navigation';
import { UpperCard } from './dashboard/card';

interface CarouselPropTypes {
  itemsPerInterval?: number;
  theme?: any;
  items: any;
}

export const Carousel = (props: CarouselPropTypes) => {
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);
  const [items, setItems] = React.useState<any>([[]]);
  const [ref, setRef] = React.useState<any>(null);

  useEffect(() => {
    try {
      setItems(chunk(props.items.items, 1));
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  const scrollHandler = (width: number, intervals: number) => {
    chunk(props.items.items, 1).map((item: any, index: number) => {
      if (item[0]?.subTitle && item[0]?.subTitle === 'Today') {
        ref.scrollTo({
          x: (width / intervals) * index,
          y: 0,
          animated: true,
        });
        setInterval(index + 1);
      }
    });
  };

  const init = (width: number) => {
    setWidth(width);
    const totalItems = items.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
    scrollHandler(width, Math.ceil(totalItems / itemsPerInterval));
  };

  const getInterval = (offset: any) => {
    for (let i = 1; i <= intervals; i++) {
      if (offset + 1 < (width / intervals) * i) {
        return i;
      }
      if (i == intervals) {
        return i;
      }
    }
  };

  const chunk = (arr: [], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  let bullets = [];

  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <Text
        key={i}
        style={{
          ...CarouselStyle.bullet,
          color: interval === i ? colors.primary : colors.lightGrey,
        }}
      >
        &bull;
      </Text>
    );
  }

  const isCloseToEnd = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
    const paddingToBottom = 0;
    return layoutMeasurement.width + contentOffset.x >=
      contentSize.width - paddingToBottom;
  };

  return (
    <View style={CarouselStyle.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          ...CarouselStyle.scrollView,
          width: `${100 * intervals}%`,
        }}
        showsHorizontalScrollIndicator={false}
        ref={(ref) => setRef(ref)}
        onContentSizeChange={(w, h) => init(w)}
        onScroll={(data) => {
          setWidth(data.nativeEvent.contentSize.width);
          setInterval(getInterval(data.nativeEvent.contentOffset.x));
          // if (isCloseToEnd(data.nativeEvent)) {
          //   ref.scrollTo({
          //     x: 0,
          //     y: 0,
          //     animated: true,
          //   });
          // }
        }}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast"
      >
        {items.flat(1).map((item: any, index: number) => {
          return (
            <View style={CarouselStyle.wrapper} key={index}>
              <View style={CarouselStyle.itemContainer}>
                <View
                  style={CarouselStyle.item}
                >
                  {item.type=='lunch'?<UpperCard item={{ ...item }} module={props.items.module} containerStyle={{ marginTop: 0 }} />:<TouchableOpacity onPress={()=>navigate('employeeListing')}><UpperCard item={{ ...item }} module={props.items.module} containerStyle={{ marginTop: 0 }} /></TouchableOpacity>}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View style={CarouselStyle.bullets}>{bullets}</View>
    </View>
  );
};

export default Carousel;
