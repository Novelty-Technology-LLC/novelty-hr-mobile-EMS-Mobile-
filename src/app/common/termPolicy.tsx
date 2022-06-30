import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { termPolicyStyle } from '../../assets/styles/common/term.style'

const termPolicy = () => {
  return (
    <View style={termPolicyStyle.container}>
      <Text>
        <TouchableOpacity>
          <Text style={termPolicyStyle.termSection}>Terms of Use</Text>
        </TouchableOpacity>
        <Text> |</Text>
        <TouchableOpacity>
          <Text style={termPolicyStyle.privacySection}>Privacy Policy</Text>
        </TouchableOpacity>
      </Text>
    </View>
  )
}

export default termPolicy
