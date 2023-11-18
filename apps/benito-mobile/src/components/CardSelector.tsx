import React, {useState} from "react";
import {ListRenderItemInfo, TouchableOpacity} from "react-native";
import {SFlatList, SView} from "@/components/core";
import {CheckmarkIcon, UncheckedBoxIcon} from "benito-common/icons";


type ListRenderItem<T> = {
    selected: boolean;
} & ListRenderItemInfo<T>;

type CardSelectorProps<T> = {
    items: T[]
    displayItem: (_: ListRenderItem<T>) => React.ReactElement;
    className?: string;
    onSelectionChanges?: (selected: T[]) => void;
    horizontal: boolean;
};

function CardSelector<T>({ items, displayItem, className = "", onSelectionChanges = (_) => {}, ...props }: Readonly<CardSelectorProps<T>>) {
    const [selected, setSelected] = useState(new Set<T>());
    const [update, setUpdate] = useState(new Date());
    
    return (
        <SFlatList
            {...props}
            data={items}
            renderItem={i => {
                const isSelected = selected.has(i.item)

                return (
                    <TouchableOpacity
                        onPress={_ => {
                            setSelected((prev) => {
                                if (prev.has(i.item)) {
                                    prev.delete(i.item)
                                } else {
                                    prev.add(i.item)
                                }

                                onSelectionChanges(Array.from(prev))

                                setUpdate(new Date())

                                return prev
                            })
                        }}
                        className={`bg-white rounded-2xl mx-2 p-2 border ${isSelected ? "" : "border-white"}`}>
                        <SView className={"flex-1 mb-6 items-end"}>
                            { isSelected ? <CheckmarkIcon height={24} width={24}/> : <UncheckedBoxIcon height={24} width={24}/> }
                        </SView>
                        <SView className={"mr-2"}>
                            {displayItem({...i, selected: isSelected})}
                        </SView>

                    </TouchableOpacity>
                )
            }}
            extraData={update}
            className={`${className}`}
        />
    )
}

export default CardSelector;
