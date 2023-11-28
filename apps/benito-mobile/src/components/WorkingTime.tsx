import {ClockIcon} from "benito-common/icons/ClockSvg";
import {SText, SView} from "@/components/core";
import React from "react";
import {formatHour} from "benito-common/address";


export type WorkingTimeProps = {
    opensAt: number
    closesAt: number
    workingDays: number[]
}

export const WorkingTime = ({opensAt = 0, closesAt = 0}: WorkingTimeProps) => {
    return (
        <SView className={"flex-row items-center space-x-1"}>
            <ClockIcon />
            <SView>
                <SText className={"font-light"}>
                    Aberto das {formatHour(opensAt)} às {formatHour(closesAt)}
                </SText>
            </SView>
        </SView>
    )
}
