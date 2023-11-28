import {SText, SView} from "@/components/core";
import {ArrowLeftIcon} from "benito-common/icons";
import {TouchableOpacity} from "react-native";
import {useNavigation} from "expo-router";


export type TopBarProps = {
    title: string;
};

export const TopBar = ({ title }: TopBarProps) => {
    const navigation = useNavigation()

    return (
        <SView className="flex-row justify-between items-center p-4">
            <TouchableOpacity onPress={(_) => navigation.goBack()}>
                <ArrowLeftIcon height={36} width={36}/>
            </TouchableOpacity>
            <SText className="text-center text-lg font-semibold">{title}</SText>
            <SView className="w-8 h-8"></SView>
        </SView>
    )
}
