import {findClosestAddress} from "benito-common/address";
import {Place} from "benito-common/hooks";
import * as Location from "expo-location";


export const findClosestPlace = (position: Location.LocationObjectCoords, places: Place[]) => {
    if (!places) {
        return null
    }

    const addresses = places.map(({place}) => ({ ...place, ...place.address}));

    let closestAddress = addresses[0];

    if (position) {
        const coords = position;

        const selfCoords = {lat: coords.latitude, lon: coords.longitude};
        closestAddress = findClosestAddress(selfCoords, addresses)
    }

    return {
        address: closestAddress,
        distance: closestAddress.distance
    }
}
