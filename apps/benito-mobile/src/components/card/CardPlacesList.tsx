import {ActivityIndicator, TouchableOpacity} from "react-native";
import {SFlatList, SImage, SText, SView} from "@/components/core";
import React from "react";
import {CompassIcon, PinIcon} from "benito-common/icons";
import {formatAddress} from "benito-common/address";
import {formatDistance, sortByClosest} from "benito-common/geolocation";
import {Address} from "benito-common/hooks";


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

            <SView className={"flex-row items-center gap-x-8 pt-3"}>
                <SView className={"flex-row items-center gap-x-1 w-[60%]"}>
                    <PinIcon />
                    <SText className={"font-light"}>{formatAddress(address)}</SText>
                </SView>

                {distance && <SView className={"flex-row items-center gap-x-1"}>
                    <CompassIcon />
                    <SText className={"font-light"}>{formatDistance(distance)}</SText>
                </SView>}
            </SView>
        </SView>
    )
}


export type CardPlacesListProps = {
    items: ItemViewProps[]

    isLoading?: boolean;
};

export function CardPlacesList({items, isLoading}: Readonly<CardPlacesListProps>) {
    sortByClosest(items);

    if (isLoading) {
        return (
            <SView className={"justify-center items-center"}>
                <ActivityIndicator size="large" color="#00ff00" />
            </SView>
        )
    }

    return (
        <SFlatList
          data={items}
          renderItem={i =>
            <TouchableOpacity>
                <ItemView {...i.item} />
            </TouchableOpacity>
          }
          className={"mx-4"}
       />
    )
}
