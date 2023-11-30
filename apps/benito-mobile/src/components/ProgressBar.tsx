import {SText, SView} from "@/components/core";
import {Bar} from 'react-native-progress';


const formatProgress = (p: number) => {
    return (p * 100).toFixed(0)
}


export type ProgressBarViewProps = {
    progress: number;
    rightText?: string;
    leftText?: string;
}


export const ProgressBarView = ({progress, leftText, rightText}: ProgressBarViewProps) => {
    const text = formatProgress(progress);

    return (
        <SView className={"mt-3 justify-center"} >
            <Bar progress={progress} unfilledColor={"#8ebff6"} height={15} width={null} />
            {leftText && <SText className={"absolute font-bold text-white"}>
                {leftText}
            </SText>}

            <SText className={"absolute font-bold text-white pl-[50%]"}>
                {text}%
            </SText>

            {rightText && <SText className={"absolute font-bold right-1 text-white"}>
                {rightText}
            </SText>}
        </SView>
        )
}
