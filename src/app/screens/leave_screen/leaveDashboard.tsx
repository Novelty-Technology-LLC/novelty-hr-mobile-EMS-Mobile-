import React from 'react';
import {Text, View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LeaveDashboard = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>LeaveDashboard Screen</Text>
      <Button
        title="Approve"
        onPress={() => navigation.navigate('leaveApprove')}
      />
      <Button
        title="Request"
        onPress={() => navigation.navigate('requestLeave')}
      />
    </View>
  );
};

export {LeaveDashboard};
