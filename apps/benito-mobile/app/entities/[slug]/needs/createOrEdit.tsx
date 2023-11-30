import {Base} from "@/components/base";
import {useGlobalSearchParams, useNavigation} from "expo-router";
import {
    useCreateItemNeed,
    useFindManyItemCategory,
    useFindUniqueItemNeed,
    useUpdateItemNeed
} from "benito-common/hooks";
import {ActivityIndicator, View} from "react-native";
import {Button, CheckBox, TopBar, Dropdown} from "@/components";
import React from "react";
import {Formik} from "formik";
import {SView} from "@/components/core";
import {Input} from "@/components/inputs/Input";

export default function Need() {
    const { entityId, needId } = useGlobalSearchParams();
    
    const navigation = useNavigation()

    let need = undefined
    let isFetching = false

    if (needId) {
        const {data, isFetching: isFetch} = useFindUniqueItemNeed({
            select: {
                id: true,
                name: true,
                description: true,
                completed: true,
                minimum: true,
                currentAcquired: true,
                category: {
                    select: {
                        name: true,
                        id: true,
                    }
                }
            },
            where: {
                id: needId
            }
        })

        isFetching = isFetch
        need = data
    }
    
    const isEditing = needId;

    const {data: categories, isFetching: isFetchingCategories} = useFindManyItemCategory({
        select: {
            name: true,
            id: true
        }
    })
    
    const updateNeed = useUpdateItemNeed()
    const createNeed = useCreateItemNeed()

    const isLoading = updateNeed.isPending || createNeed.isPending || isFetching


    return (
        <Base>
            <TopBar title={needId ? "Editar necessidade" : "Criar necessidade"} />

            <SView className={"mx-4"}>
                {isLoading && <ActivityIndicator size={"large"}/>}

                {!isLoading && <Formik
                    initialValues={{ 
                        name: need?.name, 
                        description: need?.description,
                        category: need?.category.id,
                        minimum: need?.minimum || undefined,
                        completed: need?.completed || false,
                        id: need?.id,
                        currentAcquired: need?.currentAcquired || 0
                    }}
                    onSubmit={async (values) => {
                        const payload = {
                            name: values.name,
                            description: values.description,
                            currentAcquired: parseInt(values.currentAcquired),
                            minimum: values.minimum ? parseInt(values.minimum) : undefined,
                            completed: values.completed || false,
                            active: true,
                            category: {
                                connect: {
                                    id: values.category
                                }
                            }
                        };

                        if (isEditing) {
                            await updateNeed.mutateAsync({
                                data: payload,
                                where: {
                                    id: needId
                                }
                            })
                        } else {
                            await createNeed.mutateAsync({
                                data: {
                                    ...payload,
                                    entity: {
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
                            <View>
                                <Input
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    label={"Nome"}
                                />
                            </View>

                            {!isFetchingCategories &&
                                <SView>
                                    <Dropdown
                                      data={categories}
                                      labelField={"name"}
                                      valueField={"id"}
                                      value={values.category}
                                      label={"Categoria"}
                                      placeholder={"Selecione a categoria"}
                                      onChange={(s) => values.category = s.id} />
                                </SView> }

                            {isFetchingCategories && <ActivityIndicator size={"large"} /> }

                            <View>
                                <Input
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    value={values.description}
                                    multiline={true}
                                    numberOfLines={3}
                                    label={"Descrição"}
                                />
                            </View>

                            <SView className={"pt-8"}>
                                <Input
                                    onChangeText={handleChange('minimum')}
                                    onBlur={handleBlur('minimum')}
                                    value={values.minimum}
                                    type={"number"}
                                    label={"Meta"}
                                />
                            </SView>

                            <SView>
                                <Input
                                    onChangeText={handleChange('currentAcquired')}
                                    onBlur={handleBlur('currentAcquired')}
                                    value={values.currentAcquired}
                                    type={"number"}
                                    label={"Arrecadado"}
                                />
                            </SView>
                            
                            <SView className={"pt-4"}>
                                <CheckBox
                                    label={"Finalizar necessidade"}
                                    value={values.completed}
                                    onSelectionChanges={v => values.completed = v}
                                />
                            </SView>

                            <SView className={"pt-4"}>
                                <Button onClick={handleSubmit}>{isEditing ? "Salvar" : "Criar" }</Button>
                            </SView>
                        </SView>
                    )}
                </Formik>}
            </SView>
            
        </Base>
    )
}
