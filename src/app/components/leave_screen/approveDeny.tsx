import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { button as Button } from '../../common';
import { dataType } from '../../interface';
import { EditAlert } from './responseAlert';
import colors from '../../../assets/colors';

interface approveDenyPropType {
  title: string;
  style: object;
  item: dataType;
}

const ApproveDeny = ({ style, title, item }: approveDenyPropType) => {
  const [show, setShow] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  return (
    <View>
      {show && <EditAlert item={item} status={title} setShow={setShow} />}
      <Button
        onPress={() => {
          setShow(true);
        }}
      >
        <View
          style={title === 'Approve' ? style.buttonApprove : style.buttonDeny}
        >
          <Text style={title === 'Approve' ? style.approve : style.deny}>
            {title}
          </Text>
          {isLoading && (
            <ActivityIndicator
              size={30}
              color={title === 'Approve' ? colors.white : colors.primary}
            />
          )}
        </View>
      </Button>
    </View>
  );
};

export { ApproveDeny };
