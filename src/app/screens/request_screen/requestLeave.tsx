import React, { useContext, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
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
import { postRequest } from '../../services';
import colors from '../../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { AuthContext, RequestContext } from '../../reducer';
import { getId } from '../../utils';

const validationSchema = Yup.object().shape({
  date: Yup.object().required().label('date'),
  type: Yup.string().required().label('type'),
  note: Yup.string().required().label('note'),
  lead: Yup.string().required().label('lead'),
  status: Yup.string().required().label('status'),
});

const initialValues = {
  date: '',
  type: 'Paid time off',
  status: 'Pending',
  note: '',
  lead: '',
};

const RequestLeave = () => {
  const navigation = useNavigation();
  const { dispatchRequest } = useContext(RequestContext);

  const submitRequest = (data) => {
    postRequest(data)
      .then((res) => {
        dispatchRequest({ type: 'ADD', payload: data });
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
    const userid = await getId();

    const requestData = {
      ...values,
      leave_date: {
        startDate,
        endDate,
      },
      requestor_id: userid,
    };

    setisLoading(!isLoading);
    submitRequest(requestData);
  };

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <SafeAreaView style={style.container}>
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
                <Calander style={style.calendar} handleChange={handleChange} />
                <Teams handleChange={handleChange} />
                <Leavetype handleChange={handleChange} />
                <Description handleChange={handleChange} />
                <View style={style.buttonView}>
                  <View>
                    <Button
                      style={style.buttonText}
                      title={'Submit Request'}
                      onPress={() => handleSubmit()}
                    />
                  </View>
                  <View>
                    {isLoading && (
                      <ActivityIndicator size={30} color={colors.primary} />
                    )}
                  </View>
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </ApplicationProvider>
  );
};

export { RequestLeave };
