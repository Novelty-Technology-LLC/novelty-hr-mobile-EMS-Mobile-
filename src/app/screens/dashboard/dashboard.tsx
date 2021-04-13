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
import { getToday } from '../../utils';
import { createWork, getWork, getDashboard } from '../../services';
import { Carousel } from '../../common';
import moment from 'moment';

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
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchWork = async () => {
      try {
        const res = await getWork({
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
      const data = await getDashboard();
      setData(data);
    })();
  }, []);

  const ToggleWork = async () => {
    try {
      if (new Date().getHours() < 10) {
        setLoading(true);
        setToggle(+toggle === 0 ? 1 : 0);
        const data = {
          id,
          date: getToday(),
          user_id: state?.user?.id,
          status: +toggle === 0 ? 1 : 0,
        };
        const res = await createWork(data);
        snackBarMessage('Successfully changed status.');
        setLoading(false);
      } else {
        snackErrorBottom('Status cannot be changed after 10AM.');
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
                    height: '23%',
                    marginTop: 20,
                    backgroundColor: colors.snow,
                    borderRadius: 8,
                  }}
                >
                  <Carousel
                    items={item}
                    itemsPerInterval={1}
                    onItemPress={(item: any) => {}}
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
