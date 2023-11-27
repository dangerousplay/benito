import {Base} from "@/components/base";
import {Button, TopBar} from "@/components";
import {useFindManyItemNeed} from "benito-common/hooks";
import React from "react";
import {router, useLocalSearchParams} from "expo-router";
import {SFlatList, SImage, SText, SView} from "@/components/core";
import {ActivityIndicator, TouchableOpacity} from "react-native";
import {EditIcon} from "benito-common/icons";


type NeedViewProps = {
    iconUrl: string;
    title: string;
    description: string;
}

const NeedView = ({iconUrl, title, description}: NeedViewProps) => {
  return (
      <SView className={"bg-white rounded-2xl p-3 mt-4"}>
          <SView className={"flex-row items-center space-x-4"}>
              <SView className={"justify-center"}>
                  <SImage source={{uri: iconUrl}} width={60} height={60}/>
              </SView>

              <SView className={"mr-14"}>
                  <SView className={"flex-row"}>
                      <SText className={"text-xl leading-normal"}>{title}</SText>
                      <EditIcon />
                  </SView>
                  
                  <SText className={"font-light"}>{description}</SText>
              </SView>
          </SView>
      </SView>
  )  
};


type NeedsViewProps = {
    id: string
}

const NeedsView = ({id}: NeedsViewProps) => {

    const {
        data: itemNeeds, isFetching
    } = useFindManyItemNeed({
        select: {
            id: true,
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
            entity: {
                id: {
                    in: [id]
                }
            }
        }
    })


    const items = itemNeeds
            ?.map(i => ({ ...i, iconUrl: i.category.iconUrl, places: i.entity.places, title: i.name }))
        ?? []

    return (
        <SView className={""}>

            <SView className={"mx-2"}>
                {isFetching && <ActivityIndicator size={"large"} />}

                {!isFetching && <SFlatList data={items}
                                           renderItem={(i) =>
                                               <TouchableOpacity
                                                   onPress={(_) => router.push(`/entities/${id}/needs/createOrEdit?entityId=${id}&needId=${i.item.id}`)}>
                                                 <NeedView {...i.item}/>
                                              </TouchableOpacity>}
                                           className={"h-[92%]"}
                                />}
            </SView>
        </SView>
    )  
};


export default function EntityNeedsScreen() {
    const { slug } = useLocalSearchParams();

    return (
        <Base classesName={"flex-1"}>
            <TopBar title={"Organização"} />

            <NeedsView id={slug}/>

            <SView className={"absolute bottom-1 w-[100%] items-center"}>
                <Button classesName={"w-[100%]"} onClick={() => router.push(`/entities/${slug}/needs/createOrEdit?entityId=${slug}`)}>
                    Adicionar necessidade
                </Button>
            </SView>
        </Base>
    )
}
