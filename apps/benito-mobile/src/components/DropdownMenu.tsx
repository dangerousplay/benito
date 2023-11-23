

import React, { useRef, useState } from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import { Dropdown as DropDown, IDropdownRef } from 'react-native-element-dropdown';
import {DropdownProps} from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

const { width } = Dimensions.get('window');

export type DropdownMenuProps<T> = {
    icon: React.ReactElement;
} & DropdownProps<T>;

function DropdownMenu<T>(props: Readonly<DropdownMenuProps<T>>) {
    const ref = useRef<IDropdownRef>(null);

    const renderIcon = () => {
        return (
            <View style={styles.iconStyle}>
                {props.icon}
            </View>
        );
    };

    return (
        <DropDown
            {...props}
            ref={ref}
            style={styles.dropdown}
            containerStyle={styles.containerStyle}
            iconStyle={styles.iconStyle}
            onChangeText={() => {}} // Keep search keyword
            renderRightIcon={renderIcon}
        />
    );
}

export default DropdownMenu;

const styles = StyleSheet.create({
    dropdown: {
        margin: 16,
        width: 50,
        marginLeft: width - 80,
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingRight: 14,
    },
    containerStyle: {
        width: 200,
        marginLeft: -150,
        marginTop: 5,
    },
    iconStyle: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
