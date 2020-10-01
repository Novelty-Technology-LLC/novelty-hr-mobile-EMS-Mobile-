import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { header as Header } from '../../common/header';
import { headerText } from '../../../assets/styles';
import { approveRequest as style } from '../../../assets/styles';

import { button as Button } from '../../common';
import Request from '../../components/approveRequest/approve_request';
import getDay from '../../components/approveRequest/getDay';
import getName from '../../components/approveRequest/getName';
import ResponseModal from '../../components/approveRequest/responseModal';
import colors from '../../../assets/colors';

const ApproveRequest = ({ route }: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  let { dayRange, day } = getDay(route.params);
  let { name } = getName(route.params);

  return (
    <>
      <Header>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>
            <Text style={headerText}>{name},</Text>
          </Text>
          <Text>
            <Text style={style.headerDate}>
              {dayRange} ({day > 1 ? day + ' days' : (day = 1 + ' day')})
            </Text>
          </Text>
        </View>
      </Header>
      <Request data={route.params} style={style} />
      <ResponseModal
        item={route.params}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
      <View style={style.buttonView}>
        <Button onPress={() => setShowAlert(!showAlert)}>
          <View style={style.buttonApprove}>
            <Text style={style.approve}>Approve</Text>
            {isLoading && <ActivityIndicator size={30} color={colors.white} />}
          </View>
        </Button>
        <Button onPress={() => setShowAlert(!showAlert)}>
          <View style={style.buttonDeny}>
            <Text style={style.deny}>Deny</Text>
            {isLoading && (
              <ActivityIndicator size={30} color={colors.primary} />
            )}
          </View>
        </Button>
      </View>
    </>
  );
};

export { ApproveRequest };
