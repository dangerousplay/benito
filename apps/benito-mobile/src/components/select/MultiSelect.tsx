import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MultiSelect as MultiSelectD } from 'react-native-element-dropdown';
import {MultiSelectProps} from "react-native-element-dropdown/src/components/MultiSelect/model";


export function MultiSelect<T>(props: Readonly<MultiSelectProps<T>>) {

    return (
        <View style={styles.container}>
            <MultiSelectD
                {...props}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                selectedStyle={styles.selectedStyle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    dropdown: {
        height: 50,
        backgroundColor: 'transparent',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
    },
});
