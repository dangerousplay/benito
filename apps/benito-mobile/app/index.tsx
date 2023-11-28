import {ActivityIndicator} from "react-native";
import {useEffect} from "react";
import {router} from "expo-router";

const Root = () => {
    useEffect(() => {
        router.push('/home')
    }, []);

    return (
        <ActivityIndicator size={"large"} />
    );
}

export default Root;
