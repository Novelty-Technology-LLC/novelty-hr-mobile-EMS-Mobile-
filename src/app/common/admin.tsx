import React from 'react';
import { View, Text } from 'react-native';
import colors from '../../assets/colors';

interface adminPropType {
  isAdmin: boolean;
  setIsAdmin: Function;
}

const Admin = ({ isAdmin, setIsAdmin }: adminPropType) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
      }}
    >
      <Text
        style={{
          color: isAdmin ? colors.primary : colors.secondary,
        }}
        onPress={() => setIsAdmin(!isAdmin)}
      >
        ADMIN
      </Text>
    </View>
  );
};

export { Admin };
