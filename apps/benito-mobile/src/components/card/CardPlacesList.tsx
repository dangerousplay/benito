import {ActivityIndicator, TouchableOpacity} from "react-native";
import {SFlatList, SImage, SText, SView} from "@/components/core";
import React from "react";
import {sortByClosest} from "benito-common/geolocation";
import {Address} from "benito-common/hooks";
import {AddressView} from "@/components";


type ItemViewProps = {
    title: string;
    description: string;
    iconUrl: string;

    address: Address;
    distance?: number;
};

const ItemView = ({title, description, iconUrl, address, distance}: ItemViewProps) => {
    return (
        <SView className={"bg-white rounded-2xl p-3 mt-4"}>
            <SView className={"flex-row items-center space-x-4"}>
                <SView className={"justify-center"}>
                    <SImage source={{uri: iconUrl}} width={60} height={60}/>
                </SView>

                <SView className={"mr-14"}>
                    <SText className={"text-xl leading-normal"}>{title}</SText>
                    <SText className={"font-light"}>{description}</SText>
                </SView>
            </SView>

            <SView className={"pt-3"}>
                <AddressView address={address} distance={distance}/>  
            </SView>

        </SView>
    )
}


export type CardPlacesListProps = {
    items: ItemViewProps[]

    onItemClick?: (i: ItemViewProps) => void;

    isLoading?: boolean;
};

export function CardPlacesList({items, isLoading, onItemClick = (_) => {}}: Readonly<CardPlacesListProps>) {
    sortByClosest(items);

    if (isLoading) {
        return (
            <SView className={"justify-center items-center pt-10"}>
                <ActivityIndicator size="large" color="#00ff00" />
            </SView>
        )
    }

    return (
        <SFlatList
          data={items}
          renderItem={i =>
            <TouchableOpacity onPress={_ => onItemClick(i.item)}>
                <ItemView {...i.item} />
            </TouchableOpacity>
          }
          className={"mx-4"}
       />
    )
}
