import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors'
import { listStyle } from '../../../assets/styles'
import { transformList } from '../../utils/listtranform'
import { navigate } from '../../utils/navigation'
import { EmptyContainer } from '../emptyContainer'
import { AppIcon } from '../icon'
import { ListItem } from './listItem'

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
            true,
            list.module == 'Holidays & Events' || list.module == 'Leave'
              ? true
<<<<<<< HEAD
              : false,
          ).map((item: any, index: number) => (
            <TouchableOpacity
              onPress={() =>
                navigate(list?.detailRoute, {
                  route: list?.detailRoute,
                  module: list.module,
                })
              }
              style={listStyle.seeAllText}
            >
              <ListItem
                key={index}
                title={item?.title}
                subTitle={item?.subTitle}
                date={item?.date}
                isLast={2 === index}
                type={item?.type}
                module={list.module}
              />
            </TouchableOpacity>
          ))}
=======
              : false
          ).map((item: any, index: number) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  list?.module === "Announcements"
                    ? navigate("announcementsDetails", {
                        headerText: item.title,
                        title: item.title,
                        subTitle: item.subTitle,
                        date: item.date,
                        html: item.html,
                      })
                    : navigate(list?.detailRoute, {
                        route: list?.detailRoute,
                        module: list.module,
                      });
                }}
                style={listStyle.seeAll}
              >
                <ListItem
                  key={index}
                  title={item?.title}
                  subTitle={item?.subTitle}
                  date={item?.date}
                  isLast={2 === index}
                  type={item?.type}
                  module={list.module}
                />
              </TouchableOpacity>
            );
          })}
>>>>>>> 41dd5183015f494d7289463b033520b9afd7e679
        </View>
      ) : (
        <EmptyContainer
          text={`${
            list.message
              ? list.message
              : list?.module === 'Leave'
              ? 'No Upcoming Leave'
              : 'No Upcoming Holidays and Events'
          }`}
          containerStyle={{ height: normalize(100) }}
        />
      )}
      {list?.module === "Announcements" && (
        <View>
          <TouchableOpacity
            onPress={() =>
              navigate("announcementsListing", {
                notification: "",
              })
            }
          >
            <Text style={listStyle.seeAllTextOne}>{"SEE ALL"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  )
}

export { List }
