import {ImageSourcePropType, TouchableOpacity, Text, Image} from "react-native";

import {Marker} from 'react-native-maps';
import MapView from 'react-native-maps';

import {Base} from "@/components/base";
import CardSelector from "@/components/CardSelector";
import {
    useFindManyItemNeed,
    Address,
    useFindManyItemCategory
} from "benito-common/hooks";
import {SFlatList, SImage, SText, SView} from "@/components/core";

import {formatAddress} from "benito-common/address";
import {formatDistance} from "benito-common/geolocation";

import {CompassIcon, PinIcon} from "benito-common/icons";
import {SearchInput} from "@/components/inputs";
import {useState} from "react";

import debounce from "lodash.debounce"

type NeedViewProps = {
    name: string;
    description: string;
    iconUrl: ImageSourcePropType;
    address: Address;
    distance?: number;
};

const NeedView = ({name, description, address, distance, iconUrl}: NeedViewProps) => {
    return (
        <SView className={"bg-white rounded-2xl p-3 mt-4"}>
            <SView className={"flex-row items-center space-x-4"}>
                <SView className={"justify-center"}>
                    <SImage source={iconUrl} width={60} height={60}/>
                </SView>

                <SView className={"mr-14"}>
                    <SText className={"text-xl leading-normal"}>{name}</SText>
                    <SText className={"font-light"}>{description}</SText>
                </SView>
            </SView>

            <SView className={"flex-row items-center gap-x-4 pt-3"}>
                <SView className={"flex-row items-center gap-x-1"}>
                    <PinIcon />
                    <SText className={"font-light"}>{formatAddress(address)}</SText>
                </SView>

                {distance && <SView className={"flex-row gap-x-1"}>
                    <CompassIcon /> <SText className={"font-light"}>{formatDistance(distance)}</SText>
                </SView>}
            </SView>
        </SView>

    )
};


type Filters = {
  name?: string;
  entities?: string;
  categories?: string;
};

const Needs = () => {
    const [filters, setFilters] = useState<Filters>({});

    const {
        data: itemNeeds
    } = useFindManyItemNeed({
        select: {
            name: true,
            description: true,
            entity: {
                select: {
                    id: true,
                    name: true,
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
            name: {
                contains: filters.name,
                mode: 'insensitive'
            },
            // entity: {
            //     id: {
            //         in: entitiesFilter?.length == 0 ? undefined : entitiesFilter
            //     }
            // },
            category: {
                id: {
                    in: filters.categories?.length == 0 ? undefined : filters.categories
                }
            }
        }
    })

    // const { data: organizations } = useFindManyEntity({
    //     select: { name: true, id: true }
    // })

    const { data: itemCategories} = useFindManyItemCategory({
        select: { name: true, id: true, iconUrl: true }
    })

    const updateFilters = debounce(setFilters, 250);
    const markers = itemNeeds?.map(i => {
        const size = 'w-[50px] h-[50px]'

        return (
            i.entity.places.map(p => {
                return (
                    <Marker className={size}
                            coordinate={{ ...p.place.address }}
                            title={i.name}
                            description={i.description}
                    >
                        <SImage source={{uri: i.category.iconUrl}} className={size} />
                    </Marker>
                )
            })
        )
    }).flat()

    console.log("updated")

    return (
        <Base>

            <SView className={"w-full mt-4"}>
                <MapView style={{ height: 200 }} >
                    {markers}
                </MapView>
            </SView>

            <SView className={'m-4 my-6'}>
                <SearchInput onChangeText={(v: string) => {
                    const newFilter = {...filters, name: v};

                    updateFilters(newFilter)
                }}/>
            </SView>

            <SView>
                <CardSelector
                    items={itemCategories}
                    displayItem={i =>
                        <SView className={"items-center"} key={i}>
                            <Image source={{uri: i.item.iconUrl}} width={60} height={60} />
                            <Text>{i.item.name}</Text>
                        </SView>
                    }
                    onSelectionChanges={s => {
                        setFilters({...filters, categories: s.map(i => i.id)})
                    }}
                    className={"space-x-4"}
                    horizontal={true} />
            </SView>

            <SFlatList
                data={itemNeeds}
                renderItem={i =>
                    <TouchableOpacity>
                        <NeedView
                            {...i.item}
                            iconUrl={{uri: i.item.category.iconUrl}}
                            address={i.item.entity.places[0].place.address}
                        />
                    </TouchableOpacity>
                }
                className={"m-4"}
            />
        </Base>

    );
};

export default Needs;
