import { useFindManyEntity, Address } from 'benito-common/hooks';

import { findClosestAddress } from 'benito-common/address';

import { useGeolocated } from "react-geolocated";
import { CardItemProps, CardMapList } from "../../components/card";
import { useState } from "react";


export default function ListEntities() {

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            userDecisionTimeout: 10000,
        });

    const isGeoReady = isGeolocationAvailable && coords;

    const [addressFilter, setAddressFilter] = useState();

    const { data: organizations, isFetching } = useFindManyEntity({
        select: {
            id: true,
            name: true,
            description: true,
            iconUrl: true,
            places: {
                select: {
                    place: {
                        include: {
                            address: true
                        }
                    }
                }
            },
            tags: {
                select: {
                    tag: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        },

        where: {
            places: {
                some: {
                    place: {
                        address: addressFilter
                    }
                }
            }
        }
    })

    const entities: CardItemProps[] = organizations ? organizations!.map(e => {
        const addresses = e.places.map(p => p.place.address);

        let closestAddress = addresses[0];

        if (isGeoReady) {
            const selfCoords = { lat: coords.latitude, lon: coords.longitude };
            closestAddress = findClosestAddress(selfCoords, addresses)
        }

        return {
            title: e.name,
            description: e.description,
            iconUrl: e.iconUrl,
            address: closestAddress,
            distance: closestAddress.distance,
            tags: e.tags.map(t => t.tag.name)
        }
    }) : []

    return (
        <CardMapList items={entities} setAddressFilter={f => {
            setAddressFilter(f)
        }} />
    )
}
