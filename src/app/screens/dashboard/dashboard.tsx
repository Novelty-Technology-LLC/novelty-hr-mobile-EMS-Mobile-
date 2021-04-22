import React, { useContext, useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../../reducer';
import { dashboardStyle as ds, headerTxtStyle } from '../../../assets/styles';
import {
  Cards,
  header as Header,
  snackBarMessage,
  snackErrorBottom,
} from '../../common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../assets/colors';
import { getToday } from '../../utils';
import { createWork, getWork, getDashboard } from '../../services';
import moment from 'moment';
import normalize from 'react-native-normalize';
import { DashboardCardPlaceholder } from '../../common';
import { navigate } from '../../utils/navigation';
import { time } from '../../utils/listtranform';

const DashBoard = () => {
  const { state } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [cardLoading, setCardLoading] = useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const res: any = await getWork({
          user_id: state?.user?.id,
          date: moment().format('YYYY-MM-DD'),
        });

        setId(res?.data?.data?.id ?? null);
        setToggle(+res?.data?.data?.status === 1 ? true : false);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchWork();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setCardLoading(true);
        const data: any = await getDashboard();
        setListData(data);
        setRefreshing(false);
        setCardLoading(false);
      } catch (error) {
        setRefreshing(false);
      }
    })();
  }, [refreshing]);

  const ToggleWork = async () => {
    try {
      setLoading(true);
      const data = {
        id,
        date: getToday(),
        user_id: state?.user?.id,
        status: !toggle ? 1 : 0,
      };
      const res: any = await createWork(data);
      res?.data?.data?.id && setId(res?.data?.data?.id);
      if (res?.data?.data?.message) {
        snackErrorBottom(res?.data?.data?.message);
        setLoading(false);
      } else if (res?.data?.status === 200) {
        snackBarMessage('Successfully changed status.');
        setToggle(!toggle);
        let newList: any = listData.find(
          (item) => item?.detailRoute === '/employee'
        );
        newList.items.map((item) => {
          if (item?.subTitle === 'Working from Home') {
            item.title = !toggle ? +item.title + 1 : +item.title - 1;
          }
        });
        setLoading(false);
      }
    } catch (error) {
      snackErrorBottom('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <View style={ds.safeArea}>
      <Header icon={false} container={{ paddingVertical: normalize(4.076) }}>
        <View style={ds.headerContainer}>
          <Text style={headerTxtStyle.headerText}>DASHBOARD</Text>
          <TouchableOpacity onPress={() => navigate('Profile')}>
            <Image source={{ uri: state?.user?.image_url }} style={ds.image} />
          </TouchableOpacity>
        </View>
      </Header>
      <ScrollView
        contentContainerStyle={ds.body}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={ds.header}>
          <View>
            <Text style={ds.text}>Good {time()}</Text>
            <View style={ds.gap} />
            <Text style={ds.name}>{state?.user?.first_name}</Text>
          </View>
          <TouchableWithoutFeedback onPress={ToggleWork}>
            <View
              style={[
                ds.work,
                toggle
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
        <View style={ds.wrapContainer}>
          {!cardLoading ? (
            <Cards data={listData} />
          ) : (
            <DashboardCardPlaceholder />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export { DashBoard };
