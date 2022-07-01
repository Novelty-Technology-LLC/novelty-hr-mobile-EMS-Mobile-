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
          <Text style={termPolicyStyle.termSection}>
            Terms of Use<Text style={termPolicyStyle.dashSection}> | </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              'https://docs.google.com/document/d/1PCeVJ1S39G22S4v7wKEVMOMLovFQiKkLP8reJ2tR6z4',
            ).catch((err) => console.error('Error', err))
          }}
        >
          <Text style={termPolicyStyle.privacySection}>Privacy Policy</Text>
        </TouchableOpacity>
      </Text>
    </View>
  )
}
