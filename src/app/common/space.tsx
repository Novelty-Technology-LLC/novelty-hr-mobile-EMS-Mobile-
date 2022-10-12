import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Space = ({ height, width }: { height?: number, width?: number }) => {
    return <View
        style={{
            height,
            width,
        }}
    />
}

