import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { button as Button } from '../../common';
import { dataType } from '../../interface';
import { EditAlert } from './responseAlert';

interface approveDenyPropType {
  title: string;
  style: object;
  item: dataType;
}

const ApproveDeny = ({ title, style, item }: approveDenyPropType) => {
  const [show, setShow] = useState(false);
  return (
    <View>
      {show && <EditAlert item={item} status={title} />}
      <Button
        title={title}
        style={style}
        onPress={() => {
          setShow(true);
        }}
      />
    </View>
  );
};

export { ApproveDeny };
