import React, { useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../assets/colors';
import { CarouselStyle, color } from '../../assets/styles';
import { UpperCard } from './dashboard/card';

interface CarouselPropTypes {
  itemsPerInterval?: number;
  onItemPress: (val: any) => void;
  theme?: any;
  items: any;
}

export const Carousel = (props: CarouselPropTypes) => {
  const { theme, onItemPress } = props;
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);
  const [items, setItems] = React.useState<any>([[]]);
  const [ref, setRef] = React.useState<any>(null);

  const iconProps = {
    width: normalize(51.111),
    height: normalize(40),
    viewBox: `0 0 ${normalize(51.111)} ${normalize(40)}`,
  };

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

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => onItemPress(item)}
        style={{ width: '100%', paddingTop: normalize(20) }}
        key={item.title}
      >
        <View style={{ alignSelf: 'center' }}>
          <SvgIcon uri={item?.icon.imgix_url ?? item?.defaultIcon} />
        </View>
        <View style={{ marginTop: normalize(10) }}>
          <Text style={[{ textAlign: 'center' }]}>
            {item.displayName ?? item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
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
        onContentSizeChange={(w, h) => {
          init(w);
        }}
        onScroll={(data) => {
          setWidth(data.nativeEvent.contentSize.width);
          setInterval(getInterval(data.nativeEvent.contentOffset.x));
        }}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast"
      >
        {items.flat(1).map((item: any, index: number) => {
          return (
            <View style={CarouselStyle.wrapper} key={index}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  marginTop: normalize(-65),
                  width: '100%',
                }}
              >
                <TouchableOpacity
                  style={CarouselStyle.item}
                  onPress={() => onItemPress(item[0])}
                >
                  <UpperCard item={{ ...item }} module={props.items.module} />
                </TouchableOpacity>
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
