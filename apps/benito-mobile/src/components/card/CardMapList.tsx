import React from "react";
import {Base} from "@/components/base";
import {SImage, SView} from "@/components/core";
import MapView, {Marker} from "react-native-maps";
import {SearchInput} from "@/components/inputs";
import CardSelector from "@/components/CardSelector";
import {ActivityIndicator, Image, Text} from "react-native";
import {Place} from 'benito-common/hooks';
import {CardPlacesList} from "@/components/card/CardPlacesList";
import {useGeolocation} from "@/geolocation";
import {findClosestPlace} from "@/geolocation/places";
import {Camera} from "react-native-maps/lib/MapView.types";


export type MiddleFilterItem = {
    iconUrl: string;
    name: string;
    id: string;
};

export type MiddleFilter = {
    items: MiddleFilterItem[]
    onSelectionChanges: (s: MiddleFilterItem[]) => void;
}

export type Item = {
    id: string;
    name: string;
    description: string;
    iconUrl: string;

    distance?: number;
    places: Place[];
};

export type CardMapListProps<T extends Item> = {
    onSearch: (v: string) => void;
    middleFilter?: MiddleFilter;
    items?: T[];
    afterSeachElement?: React.ReactElement;

    onItemClick?: (i: Item) => void;

    isLoading?: boolean;

    markerClassName?: string;
    
    initialCamera?: Camera;
    afterText?: (_: any) => React.ReactElement;
}


export function CardMapList<T extends Item>({
                                   items, onSearch = (_) => {},
                                   middleFilter,
                                   afterSeachElement,
                                   isLoading = false,
                                   onItemClick,
                                   initialCamera,
                                   markerClassName = 'w-[50px] h-[50px]',
                                   afterText
                               }: CardMapListProps<T>) {
    const [position, setPosition] = useGeolocation();

    const markers = items?.map(i => {
        return i.places
            .map(p => p.place)
            .filter(p => p.address.latitude && p.address.longitude)
            .map(p => {
                return (
                    <Marker className={markerClassName}
                            coordinate={{ ...p.address }}
                            title={i.name}
                            description={i.description}
                            identifier={p.id}
                            key={p.id}
                    >
                        <SImage source={{uri: i.iconUrl}} className={markerClassName}/>
                    </Marker>
                )
            })
    })?.flat() ?? []

    if (position) {
        markers.push(
            <Marker
                coordinate={position}
                key={position}
                title={"Sua posição"}
                onDragEnd={e => {
                    const coordinate = e.nativeEvent?.coordinate;

                    if (coordinate) {
                        setPosition(p => {
                            const { latitude, longitude } = coordinate

                            return p ? {...p, latitude, longitude} : {latitude, longitude}
                        })
                    }
                }} draggable={true} />
        )
    }


    const closestItems = items?.map(i => {
        const closestAddress = findClosestPlace(position, i.places)

        return {
            ...i,
            ...closestAddress
        }
    }) ?? []

    const listClassName = middleFilter ? "h-[47%]" : "h-[62%]";

    return (
        <Base>
            <SView className={"w-full mt-4"}>
                {position && <MapView style={{ height: 200 }}
                                      initialCamera={{
                                          center: position,
                                          heading: 0, zoom: 12,
                                          pitch: 0, altitude: 500,
                                          ...initialCamera
                                      }}
                >
                    {markers}
                </MapView>}

                {!position && <ActivityIndicator size={"large"}/>}
            </SView>

            <SView className={'m-4 my-6'}>
                <SearchInput onChangeText={onSearch}
                             className={"w-full space-x-4"}
                             elementAfter={afterSeachElement}/>
            </SView>


            {middleFilter && <SView>
                <CardSelector
                    items={middleFilter.items}
                    displayItem={i =>
                        <SView className={"items-center"} key={i.item.id}>
                            <Image source={{uri: i.item.iconUrl}} width={60} height={60} />
                            <Text>{i.item.name}</Text>
                        </SView>
                    }
                    onSelectionChanges={middleFilter.onSelectionChanges}
                    className={"space-x-4"}
                    horizontal={true} />
            </SView>}

            <CardPlacesList
                items={closestItems}
                isLoading={isLoading}
                onItemClick={onItemClick}
                afterText={afterText}
                classesName={listClassName} />
        </Base>
    );
}
