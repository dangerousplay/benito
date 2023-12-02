import React from "react";
import {CompassIcon, PinIcon} from "benito-common/icons";
import {formatAddress} from "benito-common/address";
import {formatDistance} from "benito-common/geolocation";
import {Address} from "benito-common/hooks";

export type AddressViewProps = {
    address: Address
    distance?: number
    className?: string
}

export const AddressView = ({address, distance, className = ''}: AddressViewProps) => {
    return (
        <div className={`flex flex-row items-center gap-x-8 ${className}`}>
            <div className={"flex flex-row items-center space-x-1"}>
                <PinIcon className={"h-6 w-6 xl:h-7 xl:w-7"}/>
                <p className={"font-light xl:text-xl"}>{formatAddress(address)}</p>
            </div>

            {distance && <div className={"flex flex-row items-center space-x-1"}>
                <CompassIcon className={"h-6 w-6 xl:h-7 xl:w-7"}/>
                <p className={"font-light xl:text-xl"}>{formatDistance(distance)}</p>
            </div>}
        </div>
    )
}
