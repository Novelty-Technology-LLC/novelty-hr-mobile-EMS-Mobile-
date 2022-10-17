import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';

export const editEmployeeStyles = StyleSheet.create({
    body: {
        paddingHorizontal: normalize(20),
        paddingTop: normalize(20),
        backgroundColor: colors.white,
    },
    horizontalView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    horizontalViewItem: {
        flex: 1,
    }
});