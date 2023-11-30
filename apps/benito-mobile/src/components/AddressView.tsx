import {SText, SView} from "@/components/core";
import {CompassIcon, PinIcon} from "benito-common/icons";
import {formatAddress} from "benito-common/address";
import {formatDistance} from "benito-common/geolocation";
import React from "react";
import {Address} from "benito-common/hooks";
import {Linking, TouchableWithoutFeedback} from "react-native";
import {mapsUrl} from "@/maps";

export type AddressViewProps = {
    address: Address
    distance?: number
    className?: string
}

export const AddressView = ({address, distance, className = ''}: AddressViewProps) => {
    return (
        <TouchableWithoutFeedback onPress={_ => {
            const { latitude, longitude } = address

            Linking.openURL(mapsUrl(latitude, longitude, ""))
        }}>
            <SView className={`flex-row items-center gap-x-8 ${className}`}>
                    <SView className={"flex-row items-center space-x-1 w-[60%]"}>
                        <PinIcon />
                        <SText className={"font-light"}>{formatAddress(address)}</SText>
                    </SView>

                    {distance && <SView className={"flex-row items-center space-x-1"}>
                        <CompassIcon />
                        <SText className={"font-light"}>{formatDistance(distance)}</SText>
                    </SView>}
            </SView>
        </TouchableWithoutFeedback>
    )
}
