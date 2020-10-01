import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { header as Header } from '../../common/header';
import { headerText } from '../../../assets/styles';
import { approveRequest as style } from '../../../assets/styles';

import Request from '../../components/approveRequest/approve_request';

import { ApproveDeny } from '../../components';
import ResponseModal from '../../components/approveRequest/responseModal';

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
        <ApproveDeny
          title="Approve"
          style={style.buttonApprove}
          item={route.params}
        />
        <ApproveDeny
          title="Deny"
          style={style.buttonDeny}
          item={route.params}
        />
      </View>
    </>
  );
};

export { ApproveRequest };
