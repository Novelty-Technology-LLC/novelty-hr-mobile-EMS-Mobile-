import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import { headerText, requestLeave } from '../../../assets/styles';
import { header as Header, snackBarMessage } from '../../common';
import { Description } from '../../components/request_screen';
import { Calendar, Task, Tasks } from '../../components/time_log';
import Time from '../../components/time_log/time';
import { button as Button } from '../../common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Projects from '../../components/time_log/projects';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { getUser, isThisWeek, totalHours } from '../../utils';
import { editTimeLog, postTimeLog } from '../../services/timeLogService';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../assets/colors';
import { TimeLogContext } from '../../reducer';
import UUIDGenerator from 'react-native-uuid-generator';
import TaskContext from '../../components/time_log/taskContext';

const LogTime = ({ route }: any) => {
  const navigation = useNavigation();
  const olddata = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const { timelogs, dispatchTimeLog } = useContext(TimeLogContext);
  const [tasks, setTasks] = useState(olddata ? olddata.note : []);

  const getNote = (olddata) => {
    if (isThisWeek(olddata)) {
      return (
        timelogs.present.filter((log) => log.id === olddata.id)[0] &&
        timelogs.present.filter((log) => log.id === olddata.id)[0].note
      );
    } else {
      return (
        timelogs.past.filter((log) => log.id === olddata.id)[0] &&
        timelogs.past.filter((log) => log.id === olddata.id)[0].note
      );
    }
  };

  const initialValues = {
    log_date: olddata ? new Date(olddata.log_date) : new Date().toJSON(),
    duration: olddata ? totalHours(olddata) : '60',
    project_id: olddata ? olddata.project_id : '',
    note: olddata ? getNote(olddata) : '',
  };

  const validationSchema = olddata
    ? Yup.object().shape({
        log_date: Yup.date().nullable().required('Date is a required field'),
        duration: Yup.string().required('Time is required').label('duration'),
        project_id: Yup.number()
          .required('Project is required')
          .label('project_id'),
      })
    : Yup.object().shape({
        log_date: Yup.date().nullable().required('Date is a required field'),
        duration: Yup.string().required('Time is required').label('duration'),
        project_id: Yup.number()
          .required('Project is required')
          .label('project_id'),
        note: Yup.string()
          .required('Task description is a required')
          .label('note'),
      });
  const onSubmit = async (values) => {
    setIsLoading(true);
    const user = await getUser();
    values.user_id = JSON.parse(user).id;
    if (olddata) {
      values.note = tasks;
      values.duration = totalHours({ note: tasks });

      editTimeLog(olddata.id, values)
        .then((data) => {
          dispatchTimeLog({
            type: 'EDIT',
            payload: {
              present: isThisWeek(data) ? data : null,
              past: isThisWeek(data) ? null : data,
            },
          });
          navigation.navigate('timelog');
          setIsLoading(false);
          snackBarMessage('TimeLog updated');
        })
        .catch((err) => console.log(err));
    } else {
      const uuid = await UUIDGenerator.getRandomUUID();
      const note = {
        id: uuid,
        task: values.note,
        time: values.duration,
      };
      let pastData;
      if (isThisWeek(values)) {
        pastData = timelogs.present.filter(
          (log) =>
            new Date(log.log_date).toDateString() ===
              new Date(values.log_date).toDateString() &&
            log.project_id == values.project_id
        );
      } else {
        pastData = timelogs.past.filter(
          (log) =>
            new Date(log.log_date).toDateString() ===
              new Date(values.log_date).toDateString() &&
            log.project_id == values.project_id
        );
      }

      if (pastData.length > 0) {
        pastData[0].note = [].concat(note, ...pastData[0].note);
        editTimeLog(pastData[0].id, pastData[0])
          .then((data) => {
            dispatchTimeLog({
              type: 'EDIT',
              payload: {
                present: isThisWeek(data) ? data : null,
                past: isThisWeek(data) ? null : data,
              },
            });
            navigation.navigate('timelog');
            setIsLoading(false);
            snackBarMessage('TimeLog updated');
          })
          .catch((err) => console.log(err));
      } else {
        values.note = [note];
        postTimeLog(values)
          .then((data) => {
            dispatchTimeLog({
              type: 'ADD',
              payload: {
                present: isThisWeek(data) ? data : null,
                past: isThisWeek(data) ? null : data,
              },
            });
            setIsLoading(false);
            navigation.navigate('timelog');
            snackBarMessage('Time logged');
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <Header icon={true}>
        <Text style={headerText}> Log Time</Text>
      </Header>
      <KeyboardAwareScrollView
        style={requestLeave.container}
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
              <Calendar
                handleChange={handleChange}
                defaultValue={olddata && olddata.log_date}
              />
              {!olddata && (
                <Time
                  handleChange={handleChange}
                  defaultValue={olddata && totalHours(olddata)}
                  error={errors}
                  touched={touched}
                />
              )}
              <Projects
                handleChange={handleChange}
                error={errors}
                touched={touched}
                defaultValue={olddata && olddata.project.name}
              />
              {olddata ? (
                <Tasks value={olddata} handleChange={handleChange} />
              ) : (
                <Description
                  handleChange={handleChange}
                  timelog={true}
                  defaultValue={olddata && olddata.note}
                  error={errors}
                  touched={touched}
                />
              )}
              <Button onPress={() => handleSubmit()}>
                <View
                  style={[requestLeave.buttonView, requestLeave.logButtonView]}
                >
                  <Text style={requestLeave.buttonText}>Submit</Text>
                  {isLoading && (
                    <ActivityIndicator size={30} color={colors.white} />
                  )}
                </View>
              </Button>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </TaskContext.Provider>
  );
};

export { LogTime };
