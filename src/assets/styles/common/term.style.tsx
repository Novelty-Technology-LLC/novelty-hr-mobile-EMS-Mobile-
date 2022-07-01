import { StyleSheet } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../colors'
import { fonts, theme } from '../theme'

export const termPolicyStyle = StyleSheet.create({
  container: {
    alignContent: 'flex-end',
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
    alignSelf: 'center',
  },

  privacySection: {
    justifyContent: 'center',
    color: colors.primary,
    alignContent: 'center',
  },
})
