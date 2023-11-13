import {CardItemProps, CardPlacesList} from "./CardPlacesList.tsx";
import React, {useRef, useState} from "react";
import {GoogleMap} from "../map";
import {computeBoundingBox, sortByClosest} from "benito-common/geolocation";
import {useGeolocated} from "react-geolocated";


const defaultIconSize = () => new google.maps.Size(60, 60, "px", "px")

type MapViewProps = {
    items: CardItemProps[];
    additionalMarkers?: google.maps.Marker[];
    onMarkerClick?: (item: CardItemProps) => void;
    center?: google.maps.LatLngLiteral;
    className?: string;
    iconSize?: google.maps.Size;
    onMapCreated?: (g: google.maps.Map) => void;
};

const MapView = ({
                     items,
                     center,
                     additionalMarkers,
                     iconSize = defaultIconSize(),
                     onMarkerClick = (_) => {
                     },
                     onMapCreated = (_) => {},
                     className = 'sm:h-[36vh] md:h-[26vh]'
                 }: MapViewProps) => {
    const markers = items.map(i => {
        const marker = new google.maps.Marker({
            position: {
                lat: i.address.latitude,
                lng: i.address.longitude,
            },
            clickable: true,
            icon: {
                url: i.iconUrl,
                scaledSize: iconSize
            }
        });

        marker.addListener("click", () => {
            onMarkerClick(i);
        })

        return marker
    })

    additionalMarkers?.forEach(m => markers.push(m))

    return (
        <>
            {center && <GoogleMap center={center} markers={markers} onMapCreated={onMapCreated} className={className}/>}
        </>
    )
}

const CardHeader = (props: CardMapListProps) => {
    return (
        <div>
            {props.cardHeader}

            <MapView {...props} />
        </div>
    )
}

type CardMapListProps = {
    items: CardItemProps[]
    cardHeader?: React.ReactElement;
    cardFooter?: React.ReactElement;

    additionalMarkers?: google.maps.Marker[];
    onMarkerClick?: (item: CardItemProps) => void;
    center?: google.maps.LatLngLiteral;
    iconSize?: google.maps.Size;
    onMapCreated?: (g: google.maps.Map) => void;

    setAddressFilter?: (_: any) => void;

    debugMap?: boolean;
};

export const CardMapList = (props: CardMapListProps) => {
    const aditionalMarkers = props.additionalMarkers ?? [];
    const setAddressFilter = props.setAddressFilter
    let center = props.center;

    const map = useRef<google.maps.Map>(undefined);

    const { coords, isGeolocationAvailable } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            userDecisionTimeout: 10000,
        });

    const [currentCoords, setCurrentCoords] = useState(coords)

    const isGeoReady = isGeolocationAvailable && coords;

    if (isGeoReady) {
        const boudingCoords = computeBoundingBox({ lat: coords.latitude, lon: coords.longitude }, 7)

        if (coords?.latitude != currentCoords?.latitude && coords?.longitude != currentCoords?.longitude) {
            if (setAddressFilter) {
                const newFilter = {
                    AND: {
                        latitude: { lt: boudingCoords.max.lat, gt: boudingCoords.min.lat},
                        longitude: { lt: boudingCoords.max.lon, gt: boudingCoords.min.lon}
                    }
                };

                setAddressFilter(newFilter)
                setCurrentCoords(coords)
            }
        }


        const mark = [
            {lat: coords.latitude, lng: coords.longitude}
        ]

        if (props.debugMap) {
            [
              {lat: boudingCoords.max.lat, lng: boudingCoords.max.lon},
              {lat: boudingCoords.min.lat, lng: boudingCoords.min.lon}
            ].forEach(m => mark.push(m))
        }

        mark.forEach(c => {
            aditionalMarkers.push(new google.maps.Marker({
                position: c
            }))
        })

        if (!center) {
            center = { lat: coords.latitude, lng: coords.longitude }
        }
    }

    const items = props.items.map(i => {
        i.onItemHover = (i) => {
            if (map.current) {
                map.current.setCenter({lat: i.address.latitude, lng: i.address.longitude })
            }
        }

        return i;
    })

    sortByClosest(items);

    return (
        <CardPlacesList cardHeader={
            <CardHeader {...props} center={center} additionalMarkers={aditionalMarkers} onMapCreated={(m) => { map.current = m}} />
        } {...props} items={items} />
    )
}
