import {Address, useFindManyItemCategory, useFindManyItemNeed} from "benito-common/hooks";

import {useState} from "react";

import debounce from "lodash.debounce"
import {CardMapList} from "@/components/card";


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
        ?.map(i => ({ ...i, iconUrl: i.category.iconUrl, places: i.entity.places }))
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
        />
    )
};


export default Needs;
