import { StyleSheet } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../colors'
import { fonts, theme } from '../theme'

export const termPolicyStyle = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  termSection: {
    color: colors.primary,
    alignContent: 'center',
    justifyContent: 'center',
  },
  dashSection: {
    color: colors.primary,
    alignContent: 'center',
    justifyContent: 'center',
    // marginHorizontal: normalize(5),
    // paddingHorizontal: normalize(5),
  },

  privacySection: {
    justifyContent: 'center',
    color: colors.primary,
    alignContent: 'center',
  },
})
