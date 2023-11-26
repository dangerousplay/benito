import {SView} from "@/components/core";
import {Dropdown as DropDown} from "react-native-element-dropdown";
import {Text} from "react-native";

export type DropdownProps<T> = {
    data: T[]
    labelField: string
    valueField: string
    value: string
    label: string
    onChange: (_: T) => void
};

export function Dropdown<T>(props: Readonly<DropdownProps<T>>) {
  return (
      <SView className={"border px-2 bg-white rounded-xl"}>
          <Text className={"font-bold text-red-500"}>{props.label}</Text>
          <DropDown {...props} />
      </SView>
  )
};
