import {Platform} from "react-native";


export const mapsUrl = (latitutude: number, longitude: number, label = '') => {
    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${latitutude},${longitude}`;

    return Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });
}
