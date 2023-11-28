import {Base} from "@/components/base";
import {useGlobalSearchParams, useNavigation} from "expo-router";
import {
    useCreateOrganizationUsers, useDeleteOrganizationUsers,
    useFindManyUser, useFindUniqueOrganizationUsers,
    useUpdateOrganizationUsers
} from "benito-common/hooks";
import {ActivityIndicator} from "react-native";
import {Button, TopBar, Dropdown} from "@/components";
import React from "react";
import {Formik} from "formik";
import {SView} from "@/components/core";


export default function Need() {
    const { entityId, userId } = useGlobalSearchParams();
    
    const navigation = useNavigation()

    let user = undefined
    let isFetching = false

    if (userId) {
        const {data, isFetching: isFetch} = useFindUniqueOrganizationUsers({
            select: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        lastName: true,
                        email: true
                    }
                },
                role: true,
            },
            where: {
                id: userId,
                organizationId: entityId,
            }
        })

        isFetching = isFetch
        user = {...data?.user, role: data?.role}
    }
    
    const isEditing = userId;

    const {data: users, isFetching: isFetchingUsers} = useFindManyUser({
        select: {
            name: true,
            lastName: true,
            iconUrl: true,
            id: true
        }
    })
    
    const updateUser = useUpdateOrganizationUsers()
    const removeUser = useDeleteOrganizationUsers()
    const createUser = useCreateOrganizationUsers()

    const isLoading = updateUser.isPending || createUser.isPending || removeUser.isPending || isFetching

    const roles = [
        { name: "Voluntário", value: "VOLUNTEER" },
        { name: "Gerenciador", value: "MANAGER" },
    ]


    return (
        <Base>
            <TopBar title={userId ? "Editar usuário" : "Adicionar usuário"} />

            <SView className={"mx-4"}>
                {isLoading && <ActivityIndicator size={"large"}/>}

                {!isLoading && <Formik
                    initialValues={{
                        user: user?.id,
                        role: user?.role,
                    }}
                    onSubmit={async (values) => {
                        const payload = {
                            user: {
                                connect: {
                                    id: values.user
                                }
                            },
                            role: values.role
                        };

                        if (isEditing) {
                            await updateUser.mutateAsync({
                                data: payload,
                                where: {
                                    id: userId
                                }
                            })
                        } else {
                            await createUser.mutateAsync({
                                data: {
                                    ...payload,
                                    organization: {
                                        connect: {
                                            id: entityId?.toString()
                                        }
                                    }
                                }
                            })
                        }

                        navigation.goBack()
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <SView className={"space-y-3"}>

                            {!isFetchingUsers &&
                                <SView>
                                    <Dropdown
                                      data={users.map(u => ({ ...u, name: `${u.name} ${u.lastName}` }))}
                                      labelField={"name"}
                                      valueField={"id"}
                                      value={values.user}
                                      label={"Usuário"}
                                      placeholder={"Selecione um usuário"}
                                      onChange={(s) => values.user = s.id}
                                      search={true} />
                                </SView> }

                            {isFetchingUsers && <ActivityIndicator size={"large"} /> }

                            <SView>
                                <Dropdown
                                    data={roles}
                                    labelField={"name"}
                                    valueField={"value"}
                                    value={values.role}
                                    label={"Função"}
                                    placeholder={"Selecione a função"}
                                    onChange={(s) => values.role = s.value} />
                            </SView>


                            <SView className={"pt-4"}>
                                <Button onClick={handleSubmit}>
                                    {isEditing ? "Salvar" : "Adicionar" }
                                </Button>
                            </SView>

                            {isEditing && <SView>
                                <Button variant={"danger"} onClick={async () => {
                                    await removeUser.mutateAsync({
                                        where: {
                                            id: userId
                                        }
                                    })

                                    navigation.goBack()
                                }}>Remover</Button>
                            </SView>}
                        </SView>
                    )}
                </Formik>}
            </SView>
            
        </Base>
    )
}
