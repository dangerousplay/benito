import React, {useEffect, useState} from "react";
import {Base} from "@/components/base";
import {SImage, SView} from "@/components/core";
import MapView, {Marker} from "react-native-maps";
import {SearchInput} from "@/components/inputs";
import CardSelector from "@/components/CardSelector";
import {Image, Text} from "react-native";
import * as Location from "expo-location";
import {LocationAccuracy} from "expo-location";
import {Place} from 'benito-common/hooks';
import {findClosestAddress} from "benito-common/address";
import {CardPlacesList} from "@/components/card/CardPlacesList";


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

    isLoading?: boolean;

    markerClassName?: string;
}


export function CardMapList<T extends Item>({
                                   items, onSearch = (_) => {},
                                   middleFilter,
                                   afterSeachElement,
                                   isLoading = false,
                                   markerClassName = 'w-[50px] h-[50px]'
                               }: CardMapListProps<T>) {
    const [position, setPosition] = useState<Location.LocationObjectCoords>();

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                return;
            }

            const subscription = await Location.watchPositionAsync({accuracy: LocationAccuracy.High}, location => {
                setPosition(location.coords)
            })

            return () => subscription.remove()
        })();
    }, []);

    const markers = items?.map(i => {
        return i.places
            .map(p => p.place)
            .filter(p => p.address.latitude && p.address.longitude)
            .map(p => (
                <Marker className={markerClassName}
                        coordinate={{ ...p.address }}
                        title={i.name}
                        description={i.description}
                >
                    <SImage source={{uri: i.iconUrl}} className={markerClassName} />
                </Marker>
        ))
    })?.flat() ?? []

    if (position) {
        markers.push(
            <Marker
                coordinate={position}
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
        const addresses = i.places.map(p => p.place.address);

        let closestAddress = addresses[0];

        if (position) {
            const coords = position;

            const selfCoords = {lat: coords.latitude, lon: coords.longitude};
            closestAddress = findClosestAddress(selfCoords, addresses)
        }

        return {
            title: i.name,
            description: i.description,
            iconUrl: i.iconUrl,
            address: closestAddress,
            distance: closestAddress.distance
        }
    }) ?? []

    return (
        <Base>
            <SView className={"w-full mt-4"}>
                <MapView style={{ height: 200 }} >
                    {markers}
                </MapView>
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

            <CardPlacesList items={closestItems} isLoading={isLoading}/>
        </Base>
    );
}
