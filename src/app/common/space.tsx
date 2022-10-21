import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Space = ({ height, width }: { height?: number | string, width?: number | string }) => {
    return <View
        style={{
            height,
            width,
        }}
    />
}

