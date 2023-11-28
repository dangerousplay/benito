import {Address, useFindManyItemCategory, useFindManyItemNeed} from "benito-common/hooks";

import {useState} from "react";

import debounce from "lodash.debounce"
import {CardMapList} from "@/components/card";
import {Bar} from 'react-native-progress';
import {SText, SView} from "@/components/core";


const formatProgress = (p: number) => {
    return (p * 100).toFixed(0)
}

type Filters = {
  name?: string;
  entities?: string;
  categories?: string;
};


const Needs = () => {
    const [filters, setFilters] = useState<Filters>({});
    const updateFilters = debounce(setFilters, 350);

    const {
        data: itemNeeds, isFetching
    } = useFindManyItemNeed({
        select: {
            name: true,
            description: true,
            currentAcquired: true,
            minimum: true,
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

    const { data: itemCategories, isFetching: isFetchingCategories, error: categoriesError} = useFindManyItemCategory({
        select: { name: true, id: true, iconUrl: true }
    })

    const items = itemNeeds
        ?.map(i => ({ ...i, iconUrl: i.category.iconUrl, places: i.entity.places, title: i.name }))
    ?? []

    return (
        <CardMapList items={items}
                     onSearch={s => updateFilters((f: Filters) => ({...f, name: s}))}
                     middleFilter={{
                         onSelectionChanges: (s) => updateFilters((f: Filters) =>
                                 ({...f, categories: s.map(i => i.id)})
                             ),
                         items: itemCategories
                     }}
                     isLoading={isFetching}
                     afterText={s => {
                         const progress = s.currentAcquired/s.minimum

                         return s.minimum && s.minimum > 0 &&
                          <SView className={"mt-3 justify-center"} >
                            <Bar progress={progress} unfilledColor={"#8ebff6"} height={15} width={null} />
                            <SText className={"absolute font-bold text-white pl-[50%]"}>
                                {formatProgress(progress)}%
                            </SText>
                          </SView>
                        }
                    }
        />
    )
};


export default Needs;
