import {Base} from "@/components/base";
import {TopBar} from "@/components";
import {useFindManyItemCategory, useFindManyItemNeed} from "benito-common/hooks";
import {CardMapList} from "@/components/card";
import {useState} from "react";
import debounce from "lodash.debounce"


type Filters = {
    name?: string;
    categories?: string;
};


type NeedsViewProps = {
    id: string
}

const NeedsView = ({id}: NeedsViewProps) => {
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
            entity: {
                id: {
                    in: [id]
                }
            }
        }
    })

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
        />
    )  
};


export default function EntityNeedsScreen() {
    return (
        <Base>
            <TopBar title={"Organização"} />

            <NeedsView id={"1"}/>
        </Base>
    )
}
