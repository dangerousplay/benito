import React from "react";
import {formatHour} from "benito-common/address";
import { ClockIcon } from "benito-common/icons";


export type WorkingTimeProps = {
    opensAt: number
    closesAt: number
    workingDays: number[]
}

export const WorkingTime = ({opensAt = 0, closesAt = 0}: WorkingTimeProps) => {
    return (
        <div className={"flex flex-row items-center space-x-1"}>
            <ClockIcon className={"h-6 w-6 xl:h-7 xl:w-7"} />
            <div>
                <p className={"font-light xl:text-xl"}>
                    Aberto das <strong>{formatHour(opensAt)}</strong> às <strong>{formatHour(closesAt)}</strong>
                </p>
            </div>
        </div>
    )
}
