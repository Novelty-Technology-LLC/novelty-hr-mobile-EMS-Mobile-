import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Platform,
  Keyboard,
} from 'react-native';
import { header as Header, snackBarMessage } from '../../common';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from '../../../assets/styles/leave_screen/custom-theme.json';
import { approveRequest, requestLeave as style } from '../../../assets/styles';
import { headerText } from '../../../assets/styles';
import {
  Calander,
  Teams,
  Leavetype,
  Description,
} from '../../components/request_screen';
import { button as Button } from '../../common';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { editRequest, getLeaveQuota, postRequest } from '../../services';
import colors from '../../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { AuthContext, RequestContext } from '../../reducer';
import { snackErrorTop } from '../../common';
import { dateMapper } from '../../utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const validationSchema = Yup.object().shape({
  date: Yup.object()
    .shape({
      startDate: Yup.date().nullable(),
      endDate: Yup.date().nullable(),
    })
    .required('Date is a required'),
  type: Yup.string().required().label('type'),
  note: Yup.string().required('Leave note is a required').label('note'),
  lead: Yup.array().of(Yup.number()).label('lead'),
  status: Yup.string().label('status'),
});

const RequestLeave = ({ route }: any) => {
  const olddata = route.params;
  const navigation = useNavigation();
  const { state } = useContext(AuthContext);
  const { dispatchRequest, requests } = useContext(RequestContext);
  const [isLoading, setisLoading] = useState(false);

  const initialValues = {
    date: olddata ? olddata.date : '',
    type: olddata ? olddata.type : 'PAID TIME OFF',
    status: olddata ? olddata.state : 'Pending',
    note: olddata ? olddata.note : '',
    lead: olddata ? olddata.lead : [],
  };

  const submitRequest = (data) => {
    postRequest(data)
      .then((res) => {
        dispatchRequest({ type: 'UPDATEQUOTA', payload: res.data.data.quota });
        dispatchRequest({ type: 'ADD', payload: res.data.data.leave });
        navigation.navigate('leaveList');
        setisLoading(false);
        snackBarMessage('Request created');
      })
      .catch((err) => console.log(err));
  };

  const updateReq = (data) => {
    editRequest(olddata.id, data)
      .then((res) => {
        dispatchRequest({ type: 'UPDATEQUOTA', payload: res.quota });
        dispatchRequest({ type: 'UPDATE', payload: res.leave });
        navigation.navigate('leaveList');
        snackBarMessage('Request updated');
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = async (values) => {
    try {
      const date = JSON.parse(values.date);

      const startDate = new Date(date.startDate).toString().slice(0, 15);

      let endDate = '';
      if (date['endDate'] === null) {
        endDate = startDate;
      } else {
        endDate = new Date(date.endDate).toString().slice(0, 15);
      }
      let day = 0;
      if (olddata) {
        let oldday = dateMapper(
          olddata.leave_date.startDate,
          olddata.leave_date.endDate
        );
        day = dateMapper(startDate, endDate);
        day = day - oldday;
      } else {
        day = dateMapper(startDate, endDate);
      }

      const notValid =
        requests.quota &&
        requests.quota.some(
          (item) =>
            item.leave_type === values.type.toUpperCase() &&
            item.leave_used < day
        );

      if (notValid) {
        throw new Error(`Selected day exceeds ${values.type}`);
      }
      delete values.date;

      const requestData = {
        ...values,
        leave_date: {
          startDate,
          endDate,
        },
        day,
        requestor_id: state.user.id,
        requestor_name: state.user.first_name,
        uuid: state.user.uuid,
      };

      setisLoading(true);
      Keyboard.dismiss();
      olddata ? updateReq(requestData) : submitRequest(requestData);
    } catch (error) {
      if (!error.message.includes('Selected day exceeds'))
        error.message = 'Unkonown error occured';

      snackErrorTop(error);
    }
  };

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <Header icon={true}>
        <View style={approveRequest.headContainer}>
          <Text style={headerText}>Request Leave</Text>
        </View>
      </Header>
      <KeyboardAwareScrollView
        style={style.container}
        scrollEnabled={true}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={Platform.OS === 'ios' ? 100 : 70}
        extraHeight={Platform.OS === 'android' ? 140 : 50}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={'none'}
      >
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values) => onSubmit(values)}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <Calander
                style={style}
                handleChange={handleChange}
                defaultValue={olddata && olddata.leave_date}
                error={errors}
                touched={touched}
              />
              <Teams
                handleChange={handleChange}
                defaultValue={olddata && olddata.lead}
                values={values}
              />
              <Leavetype
                handleChange={handleChange}
                defaultValue={olddata && olddata.type}
              />
              <Description
                handleChange={handleChange}
                defaultValue={olddata && olddata.note}
                error={errors}
                touched={touched}
              />
              <Button
                onPress={() => {
                  Keyboard.dismiss();
                  handleSubmit();
                }}
                disabled={isLoading}
              >
                <View style={style.buttonView}>
                  <Text style={style.buttonText}>Submit Request</Text>
                  {isLoading && (
                    <ActivityIndicator size={30} color={colors.white} />
                  )}
                </View>
              </Button>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </ApplicationProvider>
  );
};

export { RequestLeave };
