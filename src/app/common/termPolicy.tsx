import { View, Text, Linking } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { termPolicyStyle } from '../../assets/styles/common/term.style'

export const TermPolicy = () => {
  return (
    <View style={termPolicyStyle.container}>
      <Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://noveltytechnology.com/').catch((err) =>
              console.error('Error', err),
            )
          }}
        >
          <Text style={termPolicyStyle.termSection}>Terms of Use</Text>
        </TouchableOpacity>
        <Text style={termPolicyStyle.dashSection}> | </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://noveltytechnology.com/').catch((err) =>
              console.error('Error', err),
            )
          }}
        >
          <Text style={termPolicyStyle.privacySection}>Privacy Policy</Text>
        </TouchableOpacity>
      </Text>
    </View>
  )
}
