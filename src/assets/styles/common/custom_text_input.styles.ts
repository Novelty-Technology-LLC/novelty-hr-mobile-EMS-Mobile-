import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import color from '../../colors';

export const customTextInputStyles = StyleSheet.create({
    textinputContainer: {
        marginBottom: normalize(25),
        flex: 1,
    },
    textInput: {
        minHeight: normalize(55),
        width: '100%',
        padding: normalize(10),
        borderRadius: normalize(4),
        backgroundColor: color.grey,
        opacity: 0.8,
    },
    error: {
        paddingTop: normalize(10),
        color: color.red
    },
});