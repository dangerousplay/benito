import {SText, SView} from "@/components/core";
import {CompassIcon, ClockIcon} from "benito-common/icons";
import {formatAddress} from "benito-common/address";
import {formatDistance} from "benito-common/geolocation";
import React from "react";
import {Address} from "benito-common/hooks";

export type OpenTimeProps = {
    open: string
    close?: string
    className?: string
}

export const OpenTimeView = ({open, close, className = ''}: AddressViewProps) => {
    return (
        <SView className={`flex-row items-center gap-x-8 ${className}`}>
            <SView className={"flex-row items-center gap-x-1 w-[60%]"}>
                <ClockIcon />
                <SText className={"font-light"}>{open + "-"}</SText>
                <SText className={"font-light"}>{close}</SText>
            </SView>
        </SView>
    )
}
