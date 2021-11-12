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
  BackHandler,
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
import { createWork, getWork, getDashboard, getRequest } from '../../services';
import moment from 'moment';
import normalize from 'react-native-normalize';
import { DashboardCardPlaceholder } from '../../common';
import { getCurrentRouteName, navigate } from '../../utils/navigation';
import { time } from '../../utils/listtranform';
import { thisWeek, getDay } from '../../utils/dateFilter';

const marking = [
  {
    id: '1',
    label: 'My Time',
    color: '#6DAF7C',
  },
  {
    id: '2',
    label: 'Novelty Average',
    color: '#BF8B59',
  },
  {
    id: '3',
    label: 'Base Time',
    color: '#BCBCBC',
  },
];

const initialState = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      data: [8, 8, 8, 8, 8],
      strokeWidth: 2,
      color: () => `rgb(188, 188, 188)`,
    },
    {
      data: [8, 8, 8, 8, 8],
      strokeWidth: 2,
      color: () => `rgb(191, 139, 89)`,
    },
    {
      data: [8, 8, 8, 8, 8],
      strokeWidth: 2,
      color: () => `rgb(109,175,124)`,
    },
  ],
};

const data = (data: any) => {
  return {
    labels: data[0].day.map((item: any) => getDay(item)),
    datasets: [
      {
        data: data[3].threshold,
        strokeWidth: 2,
        color: () => `rgb(188, 188, 188)`,
      },
      {
        data: data[1].company_average,
        strokeWidth: 2,
        color: () => `rgb(191, 139, 89)`,
      },
      {
        data: data[2].your_log,
        strokeWidth: 2,
        color: () => `rgb(109,175,124)`,
      },
    ],
  };
};

const DashBoard = () => {
  const { state } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [cardLoading, setCardLoading] = useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (getCurrentRouteName() === 'dashboard') {
        BackHandler.exitApp();
      }
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp);
    };
  }, []);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        setLoading(true);
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
    state?.user?.id && fetchWork();
  }, [state?.user?.id]);

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
        style={ds.body}
        showsVerticalScrollIndicator={false}
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
