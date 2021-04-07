import React from 'react';
import { Image } from 'react-native';
export const HR_ID = 1029;

export const dashboarCard = {
  menu: (
    <Image
      source={require('../../assets/images/menu.png')}
      style={{ width: 40, height: 30 }}
    />
  ),
  employee: (
    <Image
      source={require('../../assets/images/employee.png')}
      style={{ width: 42, height: 30 }}
    />
  ),
};
