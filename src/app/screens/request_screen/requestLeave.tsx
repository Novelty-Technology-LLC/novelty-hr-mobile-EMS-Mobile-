import React from 'react';
import { Text, View } from 'react-native';
import { header as Header } from '../../common/header';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from '../../../assets/styles/leave_screen/custom-theme.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { requestLeave as style } from '../../../assets/styles';

import Calander from '../../components/request_screen/calander';
import Teams from '../../components/request_screen/teams';
import Leave from '../../components/request_screen/leave_type';
import Description from '../../components/request_screen/description';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

const validationSchema = Yup.object().shape({
  date: Yup.date().required().label('date'),
  leaveType: Yup.string().label('leaveType'),
  description: Yup.string().label('description'),
});

const initialValues = {
  date: '',
  leaveType: 'paid time of',
  description: '',
};

const RequestLeave = () => {
  const onSubmit = (values) => {
    const startDate = new Date(JSON.parse(values.date).startDate)
      .toString()
      .slice(0, 10);
    const endDate = new Date(JSON.parse(values.date).endDate)
      .toString()
      .slice(0, 10);

    delete values.date;

    values.startDate = startDate;
    values.endDate = endDate;
    console.log('values -> ', values);
  };

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <SafeAreaView style={style.container}>
        <ScrollView style={style.container}>
          <Header>Request Leave </Header>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => onSubmit(values)}
          >
            {({ handleSubmit }) => (
              <>
                <Calander style={style.calendar} />
                <Teams />
                <Leave />
                <Description />
                <TouchableOpacity onPress={() => handleSubmit()}>
                  <View style={style.buttonView}>
                    <Text style={style.buttonText}>Submit Request</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </ApplicationProvider>
  );
};

export { RequestLeave };
