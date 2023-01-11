import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

export const detailPlaceHolderStyles = StyleSheet.create({
    container: {
        flex: 1,
        margin: normalize(20),
    },
    main: {
        width: "100%",
        marginBottom: normalize(20),
    },
    title: {
        height: normalize(10),
    },
    thinLine: {
        height: normalize(8),
    },
});