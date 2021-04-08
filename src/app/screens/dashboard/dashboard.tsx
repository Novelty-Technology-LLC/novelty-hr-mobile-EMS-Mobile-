import React, { useContext, useState, useEffect } from 'react';
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
import { createWork, getWork } from '../../services';
import { UpperCard, Carousel } from '../../common';

const cards = [
  {
    title: 'Egg Curry',
    subTitle: "Today's Menu",
    module: 'menu',
  },
  {
    title: 'Egg Curry',
    subTitle: "Today's Menu",
    module: 'menu',
  },
  {
    title: 'Egg Curry',
    subTitle: "Today's Menu",
    module: 'menu',
  },
  {
    title: 'Egg Curry',
    subTitle: "Today's Menu",
    module: 'menu',
  },
  {
    title: 'Egg Curry',
    subTitle: "Today's Menu",
    module: 'menu',
  },
  {
    title: 'Egg Curry',
    subTitle: "Today's Menu",
    module: 'menu',
  },
  {
    title: 'Egg Curry',
    subTitle: "Today's Menu",
    module: 'menu',
  },
  {
    title: 'Egg Curry',
    subTitle: "Today's Menu",
    module: 'menu',
  },
  {
    title: 'Egg Curry',
    subTitle: "Today's Menu",
    module: 'menu',
  },
  {
    title: 'Egg Curry',
    subTitle: "Today's Menu",
    module: 'menu',
  },
  {
    title: 'Egg Curry',
    subTitle: "Today's Menu",
    module: 'menu',
  },
  {
    title: 'Egg Curry',
    subTitle: "Today's Menu",
    module: 'menu',
  },
];

const DashBoard = () => {
  const { state } = useContext(AuthContext);
  const [toggle, setToggle] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const res = await getWork({
          user_id: state?.user?.id,
          date: getToday(),
        });
        setToggle(res?.data?.data?.status ?? 0);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchWork();
  }, []);

  const ToggleWork = async () => {
    try {
      setLoading(true);
      setToggle(+toggle === 0 ? 1 : 0);
      const data = {
        date: getToday(),
        user_id: state?.user?.id,
        status: +toggle === 0 ? 1 : 0,
      };
      const res = await createWork(data);
      snackBarMessage('Succes');
      setLoading(false);
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
            <Text style={ds.text}>Good Morning</Text>
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
          <View
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
              items={cards}
              itemsPerInterval={3}
              onItemPress={(item: any) => {}}
            />
          </View>
          <View style={{ paddingHorizontal: 5 }} />
          <View
            style={{
              flex: 0.5,
              height: '23%',
              marginTop: 20,
              backgroundColor: colors.snow,
              borderRadius: 8,
            }}
          >
            <Carousel
              items={cards}
              itemsPerInterval={3}
              onItemPress={(item: any) => {}}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export { DashBoard };
