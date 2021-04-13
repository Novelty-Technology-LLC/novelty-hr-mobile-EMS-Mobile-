import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import normalize from 'react-native-normalize';
import { getDayToday } from '../utils';
import { UpperCard } from './dashboard/card';

interface CarouselPropTypes {
  itemsPerInterval?: number;
  onItemPress: (val: any) => void;
  theme: any;
  items: Array<any>;
}

export const Carousel = (props: CarouselPropTypes) => {
  const { theme, onItemPress } = props;
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);
  const [items, setItems] = React.useState([[]]);

  const iconProps = {
    width: normalize(51.111),
    height: normalize(40),
    viewBox: `0 0 ${normalize(51.111)} ${normalize(40)}`,
  };

  const transformItem = (item: any) => ({
    title: item?.menu_name ?? item?.title,
    subTitle: item?.day
      ? item?.day === getDayToday()
        ? 'Today'
        : item?.day
      : item?.subTitle,
  });

  useEffect(() => {
    try {
      setItems(chunk(props.items.items, 1));
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  const init = (width: number) => {
    setWidth(width);
    const totalItems = items.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
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
          ...styles.bullet,
          opacity: interval === i ? 1 : 0.4,
        }}
      >
        &bull;
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          ...styles.scrollView,
          width: `${100 * intervals}%`,
        }}
        showsHorizontalScrollIndicator={false}
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
            <View style={styles.wrapper} key={index}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  marginTop: normalize(-60),
                  width: '100%',
                }}
              >
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => onItemPress(item[0])}
                >
                  <UpperCard
                    item={{ ...transformItem(item) }}
                    module={props.items.module}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.bullets}>{bullets}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'space-around',
  },
  bullets: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: normalize(10),
    width: '100%',
    overflow: 'hidden',
  },
  bullet: {
    paddingHorizontal: normalize(5),
    fontSize: normalize(30),
    // color: color.darkAzure,
  },
  wrapper: {
    flexBasis: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'space-between',
    justifyContent: 'center',
    marginRight: normalize(1),
  },
  icon: {
    alignSelf: 'center',
  },
  labelWrapper: {
    width: '100%',
    marginBottom: normalize(8),
    alignSelf: 'center',
    textAlign: 'center',
  },
  label: {
    textAlign: 'center',
    fontSize: normalize(12),
    fontWeight: '600',
  },
  item: {},
});

export default Carousel;
