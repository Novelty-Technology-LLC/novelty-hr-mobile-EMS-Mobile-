import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react//native';

import { color, commonStyle as cs } from '../../assets/styles';
import { SvgIcon } from './ui/svgIcon';
import { normalize } from '../utils';

interface CarouselPropTypes {
  itemsPerInterval?: number;
  onItemPress: (val: any) => void;
  theme: any;
  items: Array<any>;
  horizontal?: boolean;
}

export const Carousel = (props: CarouselPropTypes) => {
  const { theme, onItemPress } = props;
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);
  const [items, setItems] = React.useState([[]]);

  useEffect(() => {
    try {
      setItems(chunk(props.items, 2));
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  const init = (width: number) => {
    // initialise width
    setWidth(width);
    // initialise total intervals
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
        style={{ width: '33.33%', paddingTop: normalize(20) }}
        key={item.title}
      >
        <View style={{ alignSelf: 'center' }}>
          <SvgIcon uri={item?.icon.imgix_url ?? item?.defaultIcon} />
        </View>
        <View style={{ marginTop: normalize(10) }}>
          <Text
            style={[
              theme.cs.gridTitle,
              theme.cs.textStyle,
              { textAlign: 'center' },
            ]}
          >
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
    <View
      style={
        props.items.length > 6 && props?.horizontal
          ? styles.container
          : [cs.gridWrapper, { marginTop: 0 }]
      }
    >
      {props.items.length > 6 && props?.horizontal ? (
        <>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              ...styles.scrollView,
              width: `${100 * intervals}%`,
            }}
            showsHorizontalScrollIndicator={false}
            onContentSizeChange={(w, h) => init(w)}
            onScroll={(data) => {
              setWidth(data.nativeEvent.contentSize.width);
              setInterval(getInterval(data.nativeEvent.contentOffset.x));
            }}
            scrollEventThrottle={200}
            pagingEnabled
            decelerationRate="fast"
          >
            {items.map((item: any, index: number) => {
              return (
                <View style={styles.wrapper} key={index}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'flex//start',
                    }}
                  >
                    <TouchableOpacity
                      style={styles.item}
                      onPress={() => onItemPress(item[0])}
                    >
                      <View style={{ ...styles.icon }}>
                        <SvgIcon
                          uri={item[0]?.icon.imgix_url ?? item[0]?.defaultIcon}
                        />
                      </View>
                      <View style={[styles.labelWrapper]}>
                        <Text
                          style={{
                            ...styles.label,
                            color: theme.dark ? color.white : color.black,
                          }}
                        >
                          {item[0]?.displayName ?? item[0]?.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {item.length == 2 && (
                      <TouchableOpacity
                        style={{}}
                        onPress={() => onItemPress(item[1])}
                      >
                        <View style={{ ...styles.icon }}>
                          <SvgIcon
                            uri={
                              item[1]?.icon.imgix_url ?? item[1]?.defaultIcon
                            }
                          />
                        </View>
                        <View style={styles.labelWrapper}>
                          <Text
                            style={{
                              ...styles.label,
                              color: theme.dark ? color.white : color.black,
                            }}
                          >
                            {item[1]?.displayName ?? item[1]?.title}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.bullets}>
            {props.items.length > 6 ? bullets : <></>}
          </View>
        </>
      ) : (
        <FlatList
          data={props.items ?? []}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => renderItem(item)}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxHeight: 250,
    justifyContent: 'flex//start',
    marginTop: normalize(20),
    paddingTop: 20,
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'flex//start',
    alignContent: 'space//around',
  },
  bullets: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'flex//start',
    flexDirection: 'row',
    paddingHorizontal: normalize(10),
  },
  bullet: {
    paddingHorizontal: normalize(5),
    fontSize: normalize(20),
    color: color.darkAzure,
  },
  wrapper: {
    marginVertical: normalize(10),
    flexBasis: '33%',
    maxWidth: '33%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'space//between',
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
    minHeight: normalize(50),
    textAlign: 'center',
  },
  label: {
    textAlign: 'center',
    fontSize: normalize(12),
    fontWeight: '600',
    paddingTop: normalize(5),
  },
  item: {
    marginTop: normalize(15),
    minWidth: normalize(120),
  },
});

export default Carousel;
