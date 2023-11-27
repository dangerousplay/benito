import {useLocalSearchParams, router} from 'expo-router';
import {ActivityIndicator} from 'react-native';
import {Base} from "@/components/base";
import {TopBar} from "@/components/TopBar";
import {SImage, SText, SView} from "@/components/core";
import {useFindUniqueEntity, Entity, Address} from "benito-common/hooks";
import {useGeolocation} from "@/geolocation";
import {findClosestPlace} from "@/geolocation/places";
import {AddressView, Button, WorkingTime} from "@/components";
import React from "react";
import {PhoneIcon, WorldGlobeIcon} from "benito-common/icons";
import {ClockIcon} from "benito-common/icons/ClockSvg";


type EntityViewProps = {
    entity: Entity
    closestAddrres: Address
}

const EntityView = ({ entity, closestAddrres }: EntityViewProps) => {
    const { cellphone, website } = entity;
    const { address, distance } = closestAddrres;
    
    return (
        <SView >
            <SView>
                <SView className={"flex flex-row items-center gap-x-8"}>
                    <SImage source={{ uri: entity.iconUrl }} className={"w-16 h-16"}/>
                    <SText className={"text-center text-lg font-medium max-w-[80%]"}>{entity.name}</SText>
                </SView>

                <SText className={"mt-4 text-justify"} style={{ lineHeight: 20 }}>
                    {entity.description}
                </SText>
            </SView>

            <SView className={"mt-6 space-y-2"}>
                {cellphone && <SView className={"flex-row space-x-2 items-center"}>
                    <PhoneIcon />
                    <SText className={"font-light"}>{cellphone}</SText>
                </SView>}

                {website && <SView className={"flex-row space-x-2 items-center"}>
                    <WorldGlobeIcon />
                    <SText className={"font-light underline"}>{website}</SText>
                </SView>}

                <WorkingTime workingDays={[]} {...address}/>

                <SView>
                    <AddressView
                        address={address}
                        distance={distance} className={"pt-8"}/>
                </SView>
            </SView>

        </SView>
    )
};


export default function EntityScreen() {
    const { slug } = useLocalSearchParams();

    const [position, _] = useGeolocation();

    const {data: entity, isFetching} = useFindUniqueEntity({
        select: {
            name: true,
            description: true,
            iconUrl: true,
            places: {
                select: {
                    place: {
                        include: {
                            address: true
                        }
                    }
                }
            },
        },
        where: {
            id: slug
        }
    })

    const closestAddress = findClosestPlace(position, entity?.places)

    return (
        <Base className={"bg-white"}>
            <TopBar title={"Organização"} />

            <SView className={"mx-4"}>
                {isFetching ?
                    <ActivityIndicator size="large" /> :
                    <EntityView entity={entity} closestAddrres={closestAddress}/>}

                <SView className={"mt-6"}>
                    <Button variant={"secondary"}
                            beforeElement={<ClockIcon className={"mr-2"}/>}
                    onClick={() => router.push(`/entities/${slug}/needs/list`)}>
                        Necessidades
                    </Button>
                </SView>
                
            </SView>

        </Base>

    )
}
