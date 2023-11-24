import {Address} from "./hooks"
import {calculateDistance, Coordinates} from "./geolocation"


export function findClosestAddress(coords: Coordinates, addresses: Address[] ): Address {
    const placesWithDistance = addresses.map(p => {
        const placeCoord = { lat: p.latitude, lon: p.longitude }

        return { ...p, distance: calculateDistance(placeCoord, coords) }
    });

    return placesWithDistance.reduce((a, b) => {
        if (a.distance < b.distance) {
            return a;
        } else {
            return b;
        }
    });
}

export function formatAddress(address: Address): string {
    return `${address.street} ${address.number}, ${address.city}, ${address.region}`
}

export function formatHour(hour: number): string {
    const text = hour.toFixed(0).padStart(4, "0")
    return `${text.slice(0, 2)}:${text.slice(2, 4)}`
}
