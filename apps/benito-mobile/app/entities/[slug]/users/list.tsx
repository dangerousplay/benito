import {Base} from "@/components/base";
import {Button, TopBar} from "@/components";
import {useFindManyOrganizationUsers} from "benito-common/hooks";
import React from "react";
import {router, useLocalSearchParams} from "expo-router";
import {SFlatList, SImage, SText, SView} from "@/components/core";
import {ActivityIndicator, TouchableOpacity} from "react-native";
import {EditIcon, UserAvatarIcon} from "benito-common/icons";


type UserViewProps = {
    iconUrl?: string;
    name: string;
    lastName: string;
    role: string;
}

const UserView = ({iconUrl, name, lastName, role}: UserViewProps) => {
  return (
      <SView className={"bg-white rounded-2xl p-3 mt-4"}>
          <SView className={"flex-row items-center space-x-4"}>
              <SView className={"justify-center"}>
                  {iconUrl && <SImage source={{uri: iconUrl}} width={60} height={60}/> }
                  {!iconUrl && <UserAvatarIcon height={60} width={60}/>}
              </SView>

              <SView className={"mr-14"}>
                  <SView className={"flex-row"}>
                      <SText className={"text-xl leading-normal"}>{name} {lastName}</SText>
                      <EditIcon/>
                  </SView>

                  <SText className={"font-light"}>{role}</SText>
              </SView>
          </SView>
      </SView>
  )  
};


type NeedsViewProps = {
    id: string
}

const OrganizationUsersView = ({id}: NeedsViewProps) => {

    const {
        data: users, isFetching
    } = useFindManyOrganizationUsers({
        select: {
            id: true,
            user: {
              select: {
                  id: true,
                  name: true,
                  lastName: true,
              }
            },
            role: true,
        },

        where: {
            organization: {
                id: {
                    in: [id]
                }
            }
        }
    })


    return (
        <SView>
            <SView className={"mx-2"}>
                {isFetching && <ActivityIndicator size={"large"} />}

                {!isFetching && <SFlatList data={users}
                                           renderItem={(i) =>
                                               <TouchableOpacity
                                                   onPress={(_) => router.push(`/entities/${id}/users/addOrRemove?entityId=${id}&userId=${i.item.id}`)}>
                                                 <UserView {...{...i.item.user, role: i.item.role}}/>
                                              </TouchableOpacity>}
                                           className={"h-[92%]"}
                                />}
            </SView>
        </SView>
    )  
};


export default function OrganizationUsersScreen() {
    const { slug } = useLocalSearchParams();

    return (
        <Base classesName={"flex-1"}>
            <TopBar title={"Voluntários"} />

            <OrganizationUsersView id={slug}/>

            <SView className={"absolute bottom-1 w-[100%] items-center"}>
                <Button classesName={"w-[100%]"}
                        onClick={() => router.push(`/entities/${slug}/users/addOrRemove?entityId=${slug}`)}>
                    Adicionar voluntário
                </Button>
            </SView>
        </Base>
    )
}
