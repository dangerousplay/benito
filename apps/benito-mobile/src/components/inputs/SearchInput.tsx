import {STextInput, SView} from "@/components/core";
import {SearchIcon} from "benito-common/icons";

type SearchInputProps = {
  placeholder?: string;
  className?: string;
  onChangeText?: (_: string) => void;
};

export const SearchInput = ({ placeholder, className, onChangeText = (_) => {} }: SearchInputProps) => {
    return (
        <SView className={`flex-row items-center bg-white rounded-2xl border ${className}`}>
            <SearchIcon width={23} height={23} className={"ml-2"}/>
            <STextInput
                className={"flex-1 px-2 w-full"}
                placeholder={placeholder}
                onChangeText={onChangeText}
            />
        </SView>

    )
};
