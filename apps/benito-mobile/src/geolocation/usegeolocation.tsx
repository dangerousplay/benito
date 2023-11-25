import {useEffect, useState} from "react";
import * as Location from "expo-location";
import {LocationAccuracy} from "expo-location";


export const useGeolocation = () => {
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
    
    return [position, setPosition]
}
