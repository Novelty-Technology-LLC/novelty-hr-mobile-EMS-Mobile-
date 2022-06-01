import React, { Fragment } from "react";
import { View } from "react-native";
import { dashboardStyle as ds } from "../../../assets/styles";
import { transformLunchItem } from "../../utils/listtranform";
import Carousel from "../Carousel";
import { List } from "./list";

const Cards = ({ data }: { data: any }) => {
  return (
    data.length > 0 &&
    data.map((item: any, index: number) => {
      return (
        <Fragment key={`${index}`}>
          <View style={[ds.wrapItem]}>
            {item.type === "stats" ? (
              <Carousel
                items={transformLunchItem(item)}
                itemsPerInterval={1}
                module={item.module}
              />
            ) : (
              <List list={item} />
            )}
          </View>
        </Fragment>
      );
    })
  );
};

export { Cards };
