import React from 'react';
import { Text, View } from 'react-native';
import { header as Header } from '../../common';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from '../../../assets/styles/leave_screen/custom-theme.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
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
import { onChange } from 'react-native-reanimated';

const validationSchema = Yup.object().shape({
  date: Yup.object().required().label('date'),
  leaveType: Yup.string().required().label('status'),
  description: Yup.string().required().label('description'),
  lead: Yup.string().required().label('lead'),
});

const initialValues = {
  date: '',
  leaveType: 'Paid time off',
  description: '',
  lead: '',
};

const submitRequest = (data) => {
  postRequest(data)
    .then((data) => console.log('data posted'))
    .catch((err) => console.log(err));
};

const RequestLeave = () => {
  const onSubmit = (values: Object) => {
    const date = JSON.parse(values.date);
    if (date['endDate'] === null) date['endDate'] = date['startDate'];
    delete values.date;

    const requestData = {
      ...values,
      type: values.leaveType,
      leave_date: date,
      requestor_id: 3,
      status: 'Pending',
    };
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
                  <Button
                    style={style.buttonText}
                    title={'Submit Request'}
                    onPress={() => handleSubmit()}
                  />
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
