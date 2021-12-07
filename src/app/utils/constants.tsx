import React from 'react';
import { Image } from 'react-native';
import normalize from 'react-native-normalize';
export const HR_ID = 1029;

export const dashboarCard = {
  Menu: (
    <Image
      source={require('../../assets/images/menu.png')}
      style={{
        width: normalize(40),
        height: normalize(30),
        marginLeft: normalize(10),
        marginBottom: normalize(-10),
      }}
    />
  ),
  Employee: (
    <Image
      source={require('../../assets/images/employee.png')}
      style={{
        width: normalize(42),
        height: normalize(30),
        marginLeft: normalize(10),
        marginBottom: normalize(-10),
      }}
    />
  ),
};

export const marking = [
  {
    id: '1',
    label: 'My Time',
    color: '#6DAF7C',
  },
  {
    id: '2',
    label: 'Novelty Average',
    color: '#BF8B59',
  },
  {
    id: '3',
    label: 'Base Time',
    color: '#BCBCBC',
  },
];

export const initialState = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      data: [8, 8, 8, 8, 8],
      strokeWidth: 2,
      color: () => `rgb(188, 188, 188)`,
    },
    {
      data: [8, 8, 8, 8, 8],
      strokeWidth: 2,
      color: () => `rgb(191, 139, 89)`,
    },
    {
      data: [8, 8, 8, 8, 8],
      strokeWidth: 2,
      color: () => `rgb(109,175,124)`,
    },
  ],
};