import React from "react";
import {TouchableOpacity} from "react-native";
import {SText} from "@/components/core";

const variants = {
    primary: {
        button: "bg-blue-500",
        text: "text-white text-xl",
    },
    danger: {
        button: "bg-red-500",
        text: "text-white text-xl",
    },
    secondary: {
        button: "bg-white",
        text: "text-black text-xl",
    }
}

export type ButtonProps = {
    beforeElement?: React.ReactElement
    afterElement?: React.ReactElement
    variant: string
    classesName?: string;
    onClick?: () => void;
}

export const Button = ({
                           beforeElement,
                           afterElement,
                           onClick = () => {},
                           children,
                           variant = "primary",
                           classesName = ''
                       }: React.PropsWithChildren<ButtonProps>) => {
    
    const variantClassName = variants[variant]
    
    return (
        <TouchableOpacity onPress={(_) => onClick()}
                          className={`p-1 rounded-2xl items-center justify-center flex-row ${variantClassName.button} ${classesName}`}>
            {beforeElement}

            <SText className={`${variantClassName.text}`}>
                {children}
            </SText>

            {afterElement}
        </TouchableOpacity>
    )
};
