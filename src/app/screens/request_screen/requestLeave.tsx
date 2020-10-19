import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { header as Header, snackBarMessage } from '../../common';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from '../../../assets/styles/leave_screen/custom-theme.json';
import { ScrollView } from 'react-native-gesture-handler';
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
import { editRequest, postRequest } from '../../services';
import colors from '../../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { AuthContext, RequestContext } from '../../reducer';
import { snackErrorBottom } from '../../common';
import { dateMapper } from '../../utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import normalize from 'react-native-normalize';
const validationSchema = Yup.object().shape({
  date: Yup.object()
    .shape({
      startDate: Yup.date().nullable(),
      endDate: Yup.date().nullable(),
    })
    .required('Date is a required field'),
  type: Yup.string().required().label('type'),
  note: Yup.string().required('Note is a required field').label('note'),
  lead: Yup.array().of(Yup.number()).min(2).required().label('lead'),
  status: Yup.string().required().label('status'),
});

const RequestLeave = ({ route }: any) => {
  const olddata = route.params;
  const navigation = useNavigation();
  const { state } = useContext(AuthContext);
  const { dispatchRequest, requests } = useContext(RequestContext);
  const initialValues = {
    date: olddata ? olddata.date : '',
    type: olddata ? olddata.type : 'Paid time off',
    status: olddata ? olddata.state : 'Pending',
    note: olddata ? olddata.note : '',
    lead: olddata ? olddata.lead : [],
  };

  const submitRequest = (data) => {
    postRequest(data)
      .then((res) => {
        dispatchRequest({ type: 'ADD', payload: res.data.data });
        navigation.navigate('leaveList');
        snackBarMessage('Request created');
      })
      .catch((err) => console.log(err));
  };

  const updateReq = (data) => {
    editRequest(olddata.id, data)
      .then((res) => {
        dispatchRequest({ type: 'UPDATE', payload: res });
        navigation.navigate('leaveList');
        snackBarMessage('Request updated');
      })
      .catch((err) => console.log(err));
  };

  const [isLoading, setisLoading] = useState(false);

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

      const day = dateMapper(startDate, endDate);

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
      const userid = state.user.id;
      const requestData = {
        ...values,
        leave_date: {
          startDate,
          endDate,
        },
        requestor_id: userid,
      };
      setisLoading(!isLoading);
      olddata ? updateReq(requestData) : submitRequest(requestData);
    } catch (error) {
      snackErrorBottom(error);
    }
  };

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      {/* <ScrollView
          style={style.container}
          showsVerticalScrollIndicator={false}
        >       */}
      <KeyboardAwareScrollView
        style={style.container}
        scrollEnabled={true}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={Platform.OS === 'ios' ? 80 : normalize(100)}
        extraHeight={Platform.OS === 'android' ? normalize(130) : 0}
        showsVerticalScrollIndicator={false}
      >
        <Header icon={true}>
          <View style={approveRequest.headContainer}>
            <Text style={headerText}>Request Leave</Text>
          </View>
        </Header>
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
                error={errors}
                touched={touched}
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
              <Button onPress={() => handleSubmit()}>
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
      {/* </ScrollView> */}
    </ApplicationProvider>
  );
};

export { RequestLeave };
