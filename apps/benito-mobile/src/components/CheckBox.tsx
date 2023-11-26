import {Text, TouchableWithoutFeedback} from "react-native";
import React, {useState} from "react";
import {CheckmarkIcon, UncheckedBoxIcon} from "benito-common/icons";
import {SView} from "@/components/core";

type CheckBoxProps = {
    value?: boolean
    onSelectionChanges?: (_: boolean) => void;
    label: string;
};

export const CheckBox = ({value, onSelectionChanges = (_) => {}, label}: CheckBoxProps) => {
    const [innerValue, setInnerValue] = useState(value);

    return (
        <TouchableWithoutFeedback onPress={(_) => {
            const newValue = !innerValue;
            onSelectionChanges(newValue)

            setInnerValue(newValue)
        }}>
            <SView className={"flex-row items-center space-x-2"}>
                {innerValue ? <CheckmarkIcon height={24} width={24}/> : <UncheckedBoxIcon height={24} width={24}/>}

                <Text>
                    {label}
                </Text>
            </SView>
        </TouchableWithoutFeedback>
    )
}
