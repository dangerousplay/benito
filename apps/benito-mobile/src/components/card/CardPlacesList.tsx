import {ActivityIndicator, TouchableOpacity} from "react-native";
import {SFlatList, SImage, SText, SView} from "@/components/core";
import React from "react";
import {sortByClosest} from "benito-common/geolocation";
import {Address} from "benito-common/hooks";
import {AddressView} from "@/components";
import { WorkingTime } from "../WorkingTime";



type ItemViewProps = {
    title: string;
    description: string;
    iconUrl: string;
    opensAt: number;
    closesAt: number;
    address: Address;
    distance?: number;
    afterText?: (_: any) => React.ReactElement;

};

const ItemView = ({title, description, iconUrl, address, distance, opensAt, closesAt, afterText, ...props}: ItemViewProps) => {
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
            
            {afterText && afterText(props)}
            
            <SView className={"pt-3"}>
                <WorkingTime opensAt={opensAt} closesAt={closesAt} />
                <AddressView address={address} distance={distance}/>  
            </SView>

        </SView>
    )
}


export type CardPlacesListProps = {
    items: ItemViewProps[]
    afterText?: (_: any) => React.ReactElement;
    
    onItemClick?: (i: ItemViewProps) => void;

    isLoading?: boolean;
    classesName?: string;
};

export function CardPlacesList({   items,
                                   afterText,
                                   isLoading,
                                   classesName = '',
                                   onItemClick = (_) => {}}
                                   : Readonly<CardPlacesListProps>) {
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
            <TouchableOpacity onPress={_ => onItemClick(i.item)} key={i.item.id}>
                <ItemView {...i.item} afterText = {afterText} />
            </TouchableOpacity>
          }
          className={`mx-4 ${classesName}`}
       />
    )
}
