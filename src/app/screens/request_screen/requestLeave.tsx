import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { header as Header } from '../../common';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from '../../../assets/styles/leave_screen/custom-theme.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { requestLeave as style } from '../../../assets/styles';
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
import { editRequest, postRequest, updateRequest } from '../../services';
import colors from '../../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { AuthContext, RequestContext } from '../../reducer';

const validationSchema = Yup.object().shape({
  date: Yup.object().required().label('date'),
  type: Yup.string().required().label('type'),
  note: Yup.string().required().label('note'),
  lead: Yup.array().of(Yup.string()).required().label('lead'),
  status: Yup.string().required().label('status'),
});

const RequestLeave = ({ route }: any) => {
  const olddata = route.params;
  const navigation = useNavigation();
  const { state } = useContext(AuthContext);
  const { dispatchRequest } = useContext(RequestContext);
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
      })
      .catch((err) => console.log(err));
  };

  const updateReq = (data) => {
    editRequest(olddata.id, data)
      .then((res) => {
        dispatchRequest({ type: 'UPDATE', payload: res });
        navigation.navigate('leaveList');
      })
      .catch((err) => console.log(err));
  };

  const [isLoading, setisLoading] = useState(false);
  const onSubmit = async (values) => {
    const date = JSON.parse(values.date);
    const startDate = new Date(date.startDate).toString().slice(0, 15);

    let endDate = '';
    if (date['endDate'] === null) {
      endDate = startDate;
    } else {
      endDate = new Date(date.endDate).toString().slice(0, 15);
    }
    delete values.date;
    const userid = state.user.uuid;

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
  };

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <SafeAreaView style={style.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={style.container}
            showsVerticalScrollIndicator={false}
          >
            <Header>
              <Text style={headerText}>Request Leave</Text>
            </Header>
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={(values) => onSubmit(values)}
            >
              {({ handleChange, handleSubmit, values }) => (
                <>
                  <Calander
                    style={style.calendar}
                    handleChange={handleChange}
                    defaultValue={olddata && olddata.leave_date}
                  />
                  <Teams
                    handleChange={handleChange}
                    defaultValue={olddata && olddata.lead}
                  />
                  <Leavetype
                    handleChange={handleChange}
                    defaultValue={olddata && olddata.type}
                  />
                  <Description
                    handleChange={handleChange}
                    defaultValue={olddata && olddata.note}
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
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ApplicationProvider>
  );
};

export { RequestLeave };
