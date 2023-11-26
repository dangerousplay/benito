import {STextInput, SView} from "@/components/core";
import {Text, TextInputProps} from "react-native";
import {useState} from "react";

type InputType = "number" | "text"

export type InputProps = {
    label: string
    type: InputType
} & TextInputProps;

export const Input = ({type = "text", value, onChangeText = () => {}, ...props}: InputProps) => {
    const [text, setText] = useState(value);
    
    const innerValue = typeof text == "string" ? text : text?.toString()
    
    return (
        <SView className={"px-2 bg-white border rounded-xl"}>
            <Text className={"font-bold text-red-500"}>{props.label}</Text>
            <STextInput {...props} value={innerValue} onChangeText={(text: string) => {
                let sanitized = type == "number" ? text.replace(/[^0-9]/g, '') : text

                onChangeText(sanitized)
                setText(sanitized)
            }}/>
        </SView>
    )
};
