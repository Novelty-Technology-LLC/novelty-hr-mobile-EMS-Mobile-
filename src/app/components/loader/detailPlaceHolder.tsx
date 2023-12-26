import React from "react";
import { View } from "react-native";
import normalize, { SCREEN_WIDTH } from "react-native-normalize";
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";
import { detailPlaceHolderStyles as styles } from "../../../assets/styles/common/detailPlaceholder.styles";
import { Space } from "../../common/space";

export const DetailPlaceHolder = () => {
    return (
        <View style={styles.container}>
            <Placeholder style={styles.main} Animation={Fade}>
                <PlaceholderLine width={100} style={styles.title} />
                <PlaceholderLine width={50} style={styles.title} />
                <Space height={normalize(10)} />

                <PlaceholderLine width={100} style={styles.thinLine} />
                <PlaceholderLine width={80} style={styles.thinLine} />
                <Space height={normalize(20)} />
                <PlaceholderLine width={20} style={[styles.thinLine, { alignSelf: 'flex-end' }]} />

            </Placeholder>
        </View>
    );
};