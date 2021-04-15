import React, { useContext, useState, useEffect, Fragment } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
} from 'react-native';
import { AuthContext } from '../../reducer';
import { dashboardStyle as ds, headerText } from '../../../assets/styles';
import {
  header as Header,
  snackBarMessage,
  snackErrorBottom,
} from '../../common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../assets/colors';
import { getDayToday } from '../../utils';
import { createWork, getWork, getDashboard } from '../../services';
import { Carousel } from '../../common';
import moment from 'moment';
import normalize from 'react-native-normalize';

const time = () => {
  var today = new Date();
  var curHr = today.getHours();

  if (curHr < 12) {
    return 'Morning';
  } else if (curHr < 18) {
    return 'Afternoon';
  } else if (curHr < 20) {
    return 'Evening';
  } else {
    return 'Night';
  }
};
const DashBoard = () => {
  const { state } = useContext(AuthContext);
  const [toggle, setToggle] = useState(0);
  const [wfhCount, setwfhCount] = useState(0);
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchWork = async () => {
      try {
        const res: any = await getWork({
          user_id: state?.user?.id,
          date: moment().format('YYYY-MM-DD'),
        });
        setId(res?.data?.data?.id ?? 0);
        setToggle(res?.data?.data?.status ?? 0);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchWork();
  }, []);

  useEffect(() => {
    (async () => {
      const data: any = await getDashboard();
      let newList = data.filter((item) => item?.detailRoute === null);

      newList[0].items.map((item) => {
        if (item?.subTitle === 'Working from Home') {
          setwfhCount(+item.title);
        }
      });

      setData(data);
    })();
  }, []);

  const transformItem = (item: any) => {
    if (item?.detailRoute === '/lunch') {
      const newItem = item.items.map((item: any) => {
        if (item?.subTitle === getDayToday()) {
          return { ...item, subTitle: 'Today' };
        } else {
          return item;
        }
      });
      item.items = newItem;
    }

    return item;
  };

  const ToggleWork = async () => {
    try {
      setLoading(true);

      const data = {
        id,
        date: getToday(),
        user_id: state?.user?.id,
        status: +toggle === 0 ? 1 : 0,
      };
      const res: any = await createWork(data);
      if (res?.data?.data?.message) {
        snackErrorBottom(res?.data?.data?.message);
        setLoading(false);
      } else if (res?.data?.status === 200) {
        snackBarMessage('Successfully changed status.');
        setToggle(+toggle === 0 ? 1 : 0);
        setwfhCount(+toggle === 0 ? wfhCount + 1 : wfhCount - 1);
        setLoading(false);
      }
    } catch (error) {
      snackErrorBottom('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <View style={ds.safeArea}>
      <Header icon={false}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Text style={headerText}>DASHBOARD</Text>
          <Image
            source={{ uri: state?.user?.image_url }}
            style={{ height: 40, width: 40, borderRadius: 20 }}
          />
        </View>
      </Header>
      <View style={ds.body}>
        <View style={ds.header}>
          <View>
            <Text style={ds.text}>Good {time()}</Text>
            <View style={ds.gap} />
            <Text style={ds.name}>
              {state?.user?.first_name + ' ' + state?.user?.last_name}
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={ToggleWork}>
            <View
              style={[
                ds.work,
                +toggle == 1
                  ? { backgroundColor: colors.greenButton }
                  : { backgroundColor: colors.ash },
              ]}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Icon name="check-circle" color={colors.white} size={20} />
              )}
              <View style={{ marginHorizontal: 2 }} />
              <Text style={ds.workText}>Work from Home</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {data.length > 0 &&
            data.slice(0, 2).map((item, index) => (
              <Fragment key={index}>
                <View
                  key={index}
                  style={{
                    flex: 0.5,
                    width: '50%',
                    height: normalize(125),
                    marginTop: normalize(20),
                    backgroundColor: colors.snow,
                    borderRadius: normalize(8),
                  }}
                >
                  <Carousel
                    items={transformItem(item)}
                    itemsPerInterval={1}
                    onItemPress={(item: any) => {}}
                    wfhCount={wfhCount}
                  />
                </View>
                <View style={{ marginHorizontal: 5 }} />
              </Fragment>
            ))}
        </View>
      </View>
    </View>
  );
};

export { DashBoard };
