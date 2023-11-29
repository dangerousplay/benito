import {useLocalSearchParams} from 'expo-router';
import {ActivityIndicator} from 'react-native';
import {Base} from "@/components/base";
import {TopBar} from "@/components/TopBar";
import {SImage, SText, SView} from "@/components/core";
import {ItemNeed, useFindUniqueItemNeed} from "benito-common/hooks";
import {AddressView, WorkingTime} from "@/components";
import React from "react";
import { router } from 'expo-router';
import {useGeolocation} from "@/geolocation";
import {findClosestPlace} from "@/geolocation/places";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProgressBarView } from '../../../src/components/ProgressBar';


type NeedViewProps = {
    need: ItemNeed
}

const formatProgress = (p: number) => {
    return (p * 100).toFixed(0)
}



const NeedView = ({ need }: NeedViewProps) => {
    const [geolocation] = useGeolocation();
    const closestAddress = findClosestPlace(geolocation, need.entity?.places)
    const progress = need.currentAcquired/need.minimum
    
    return (
        <SView>
            <SView>
                <SView className={"flex flex-row items-center gap-x-8"}>
                    <SImage source={{ uri: need.category.iconUrl }} className={"w-16 h-16"}/>
                    <SText className={"text-center text-lg font-medium"}>{need.name}</SText>
                </SView>

                <SText className={"mt-4 text-justify"} style={{ lineHeight: 20 }}>
                    {need.description}
                </SText>
                { need.minimum && need.minimum > 0 &&

                     <ProgressBarView text={formatProgress(progress)} progress={progress} />
                }
                <TouchableOpacity
                    onPress={s => router.push(`/entities/${need.entity.id}`)}>

                    <SView className={"bg-white rounded-2xl p-3 mt-10"}> 
                        <SView className={"flex flex-row items-center gap-x-8 mb-5"}>
                            <SImage source={{ uri: need.entity.iconUrl }} className={"w-16 h-16"}/>
                            <SText className={"text-center text-lg font-medium max-w-[80%]"}>{need.entity.name}</SText>
                        </SView>
                        <WorkingTime workingDays={[]} {...closestAddress?.address}/>
                        <SView>
                            <AddressView
                                address={closestAddress?.address}
                                distance={closestAddress?.distance} className={"pt-8"}/>
                        </SView>
                    </SView>
                </TouchableOpacity>
                </SView>
        </SView>
    )
            
};


export default function NeedScreen() {
    const { slug } = useLocalSearchParams();

    const [position, _] = useGeolocation();

    const {data: need, isFetching} = useFindUniqueItemNeed({
        select: {
            name: true,
            description: true,
            currentAcquired: true,
            minimum: true,
            entity: {
                select: {
                    id: true,
                    name: true,
                    iconUrl: true,
                    places: {
                        include: {
                            place: {
                                include: {
                                    address: true
                                }
                            }
                        }
                    }
                }
            },
            category: {
                select: {
                    id: true,
                    name: true,
                    iconUrl: true,
                }
            }
        },
        where: {
            id: slug,
        }
    })

    return (
        <Base className={"bg-white"}>
            <TopBar title={"Lista de necessidades"} />

           <SView className={"mx-4"}>
                {isFetching ?
                    <ActivityIndicator size="large" /> :
                    <NeedView need={need} />}
            </SView>
        </Base>
    )
}