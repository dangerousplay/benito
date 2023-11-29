import {SText, SView} from "@/components/core";
import {Bar} from 'react-native-progress';


export type ProgressBarViewProps = {
    progress: number,
    text: number
}



export const ProgressBarView = ({progress, text}: ProgressBarViewProps) => {
    
    return (
        <SView className={"mt-3 justify-center"} >
            <Bar progress={progress} unfilledColor={"#8ebff6"} height={15} width={null} />
            <SText className={"absolute font-bold text-white pl-[50%]"}>
                {text}%
            </SText>
        </SView>
        )
}
