import React, {useEffect, useRef} from "react";
import {
    AbstractAlgorithm,
    MarkerClusterer,
    SuperClusterAlgorithm,
    Marker
} from "@googlemaps/markerclusterer";




type MapProps = {
    center?: google.maps.LatLngLiteral;
    zoom?: number;
    algorithm?: AbstractAlgorithm;
    markers?: Marker[];
    className?: string;

    onMapCreated?: (_: google.maps.Map) => void;
};


const InnerMap = ({
                      center,
                      zoom = 15,
                      markers,
                      className = '',
                      algorithm = new SuperClusterAlgorithm({}),
                      onMapCreated = (_) => {}
                  }: MapProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const map = new window.google.maps.Map(ref.current, {
            center,
            zoom,
        });

        new MarkerClusterer({
            algorithm,
            map,
            markers,
        });

        onMapCreated(map);
    }, [algorithm, markers]);

    return (
        <div ref={ref} id="map" className={className}/>
    )
}


export function GoogleMap(props: Readonly<MapProps>) {
    return (
       <InnerMap {...props} />
    );
}
