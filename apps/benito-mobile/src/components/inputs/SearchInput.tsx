import {STextInput, SView} from "@/components/core";
import {SearchIcon} from "benito-common/icons";
import React from "react";

type SearchInputProps = {
  placeholder?: string;
  className?: string;
  onChangeText?: (_: string) => void;
  elementAfter?: React.ReactElement;
};

export const SearchInput = ({ placeholder, className, elementAfter, onChangeText = (_) => {} }: SearchInputProps) => {
    const extraClass = elementAfter ? 'space-x-2' : '';

    return (
        <SView className={`flex-row items-center ${extraClass} ${className}`}>
            <SView className={`flex-1 bg-white rounded-2xl border`}>
                <SearchIcon width={23} height={23} className={"ml-2"}/>
                <STextInput
                    className={"flex-1 px-2 w-full"}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                />
            </SView>

            {elementAfter}
        </SView>


    )
};
