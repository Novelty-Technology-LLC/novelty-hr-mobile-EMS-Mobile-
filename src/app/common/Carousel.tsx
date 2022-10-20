import React, { useContext, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  NativeScrollEvent,
  TouchableOpacity,
} from "react-native";
import Snackbar from "react-native-snackbar";
import colors from "../../assets/colors";
import { CarouselStyle } from "../../assets/styles";
import { AuthContext } from "../reducer";
import { MenuContext } from "../reducer/menuReducer";
import { navigate } from "../utils/navigation";
import { UpperCard } from "./dashboard/card";
import { showToast, snackBarMessage } from "./message";

interface CarouselPropTypes {
  itemsPerInterval?: number;
  theme?: any;
  items: any;
  module: any;
}

export const Carousel = (props: CarouselPropTypes) => {
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;
  const { state, dispatch } = useContext(AuthContext);
  const { menu, dispatchMenu } = useContext(MenuContext);

  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);
  const [items, setItems] = React.useState<any>([[]]);
  const [ref, setRef] = React.useState<any>(null);

  useEffect(() => {
    try {
      if (props?.module === "Menu") {
        dispatchMenu({ type: "SET_ITEMS", payload: props.items.items });
      } else {
        setItems(chunk(props?.items?.items, 1));
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (props?.module === "Menu") {
      setItems(chunk(menu?.items, 1));
    }
  }, [menu.items]);

  const navigateOnPress = (item: any) => {
    if (props?.module === "Employee") {
      if (item?.subTitle === "Total Employees") {
        navigate("EmployeeListing");
      } else {
        item?.title !== 0
          ? navigate("workFromHomeEmployeeListing")
          : showToast("No employee working from home", false);
      }
    } else if (props?.module === "Menu") {
      navigate("menuListing");
    }
  };

  const checkIfPressable = () => {
    if (props.module === "Employee") return true;

    if (props.module == "Menu" && +state?.user?.is_approver === 1) return true;

    return false;
  };

  const scrollHandler = (width: number, intervals: number) => {
    chunk(props.items.items, 1).map((item: any, index: number) => {
      if (item[0]?.subTitle && item[0]?.subTitle === "Today") {
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

  const chunk = (arr: any[], size: number) =>
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

  const isCloseToEnd = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 0;
    return (
      layoutMeasurement.width + contentOffset.x >=
      contentSize.width - paddingToBottom
    );
  };
  const listOfItems = () => {
    if (props.module !== "Employee") {
      return items.flat(1);
    } else {
      return items.flat(1).sort((a: any, b: any) => {
        return b.subTitle.localeCompare(a.subTitle);
      });
    }
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
        {listOfItems().map((item: any, index: number) => {
          return (
            <View style={CarouselStyle.wrapper} key={index}>
              <View style={CarouselStyle.itemContainer}>
                <View style={CarouselStyle.item}>
                  <TouchableOpacity
                    onPress={() => navigateOnPress(item)}
                    disabled={!checkIfPressable()}
                  >
                    <UpperCard
                      item={{ ...item }}
                      module={props.items.module}
                      containerStyle={{ marginTop: 0 }}
                    />
                  </TouchableOpacity>
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
