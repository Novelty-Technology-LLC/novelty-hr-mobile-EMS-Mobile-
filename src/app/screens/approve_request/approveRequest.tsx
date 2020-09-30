import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { header as Header } from '../../common/header';
import { headerText } from '../../../assets/styles';
import { approveRequest as style } from '../../../assets/styles';

import { button as Button } from '../../common';
import Request from '../../components/approveRequest/approve_request';
import getDay from '../../components/approveRequest/getDay';
import getName from '../../components/approveRequest/getName';
import ResponseModal from '../../components/approveRequest/responseModal';

const ApproveRequest = ({ route }: any) => {
  const [showAlert, setShowAlert] = useState(false);

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
        <Button
          title="Approve"
          style={style.buttonApprove}
          onPress={() => setShowAlert(!showAlert)}
        />
        <Button
          title="Deny"
          style={style.buttonDeny}
          onPress={() => setShowAlert(!showAlert)}
        />
      </View>
    </>
  );
};

export { ApproveRequest };
