import React from "react";
import {TouchableOpacity} from "react-native";
import {SText} from "@/components/core";

const variants = {
    primary: {
        button: "bg-blue-500",
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
    className?: string;
    onClick?: () => void;
}

export const Button = ({
                           beforeElement,
                           afterElement,
                           onClick = () => {},
                           children,
                           variant = "primary",
                           className = ''
                       }: React.PropsWithChildren<ButtonProps>) => {
    
    const variantClassName = variants[variant]
    
    return (
        <TouchableOpacity onPress={(_) => onClick()}
                          className={`p-3 rounded-2xl items-center justify-center flex-row ${variantClassName.button} ${className}`}>
            {beforeElement}

            <SText className={`${variantClassName.text}`}>
                {children}
            </SText>

            {afterElement}
        </TouchableOpacity>
    )
};
