import React, { useState, useContext, useEffect ,useMemo} from 'react';
import { View, ScrollView, Text, RefreshControl } from 'react-native';
import { header as Header, Loader, Admin } from '../../common';
import { DaysRemaining, MyRequests } from '../../components';
import { leaveDashboardStyle as style } from '../../../assets/styles';
import OtherRequests from '../../components/leave_screen/otherRequests';
import { RequestButton } from '../../components/requestButton';
import { headerText } from '../../../assets/styles';
import { RequestContext } from '../../reducer';
import { getUser, mapDataToRequest } from '../../utils';
import { getLeaveQuota, getMyRequests } from '../../services';
import { QuotaPlaceHolder } from '../../components/loader/quotaPlaceHolder';

const LeaveDashboard = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [refresh, setRefresh] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefresh((prevState) => !prevState);
    setRefreshing(true);
    const user = await getUser();
    getLeaveQuota(JSON.parse(user).id).then((data) => {
      setDaysDetails(data);
      dispatchRequest({ type: 'QUOTA', payload: data });
      setRefreshing(false);
    });
    getMyRequests(JSON.parse(user).id)
      .then((data) => {
        dispatchRequest({ type: 'CHANGE', payload: mapDataToRequest(data) });
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dispatchRequest } = useContext(RequestContext);
  const [daysDetails, setDaysDetails] = useState([]);

  const getData = async () => {
    const user = await getUser();
    getLeaveQuota(JSON.parse(user).id)
      .then((data) => {
        setDaysDetails(data);
        dispatchRequest({ type: 'QUOTA', payload: data });
      })
      .catch((err) => console.log('GetLeaveQuota error', err))


  };

  const getRequest = async () => {
    setLoading(true);
    const user = await getUser();
    setIsAdmin(+JSON.parse(user).is_approver ? true : false);

    getMyRequests(JSON.parse(user).id)
      .then((data) => {
        dispatchRequest({ type: 'CHANGE', payload: mapDataToRequest(data) });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };



  useEffect(() => {
    getData();
    getRequest();
  }, []);

  return (
    <View style={style.mainContainer}>
      <Header icon={false}>
        <Text style={headerText}>Leave Application</Text>
      </Header>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {daysDetails.length > 0 ? null : <QuotaPlaceHolder />}
        <View style={style.container}>
          {daysDetails &&
            daysDetails.length > 0 &&
            daysDetails.map((daysDetail) => (
              <DaysRemaining
                key={daysDetail.id}
                total={daysDetail.leave_total}
                remaining={daysDetail.leave_used}
                title={daysDetail.leave_type}
              />
            ))}
        </View>
        {/* <Admin isAdmin={isAdmin} setIsAdmin={setIsAdmin} /> */}
        {isAdmin ? (
          <OtherRequests refresh={refresh} />
        ) : (
          <MyRequests loading={loading} refresh={refresh} />
        )}
      </ScrollView>
      <RequestButton />
    </View>
  );
};

export { LeaveDashboard };

