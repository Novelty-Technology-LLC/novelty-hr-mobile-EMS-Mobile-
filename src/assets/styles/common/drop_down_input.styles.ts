import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import colors from '../../colors';
import { fonts } from '../theme';

export const dropDownInputStyles = StyleSheet.create({
    dropdownContainer: {
        width: '100%',
        flex: 1,
    },
    container: {
        height: normalize(50),
        padding: normalize(10),
        opacity: 0.8,
        borderWidth: 0,
        color: colors.black,
        backgroundColor: colors.grey,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: normalize(4),
        borderBottomRightRadius: normalize(4)
    },
    innerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropdown: {
        // borderColor: colors.primary,
        backgroundColor: colors.grey,
    },
    icon: {
        color: colors.primary,
        backgroundColor: colors.grey,
        fontSize: 22,
        height: normalize(50),
        borderBottomLeftRadius: normalize(4),
        borderTopLeftRadius: normalize(4),
        padding: 10,
        paddingRight: 0,
    },
    labelStyle: {
        fontFamily: fonts.mulishRegular,

    }
});