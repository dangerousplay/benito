import {CardMapList} from "@/components/card";
import {useFindManyEntity} from "benito-common/hooks";
import {useState} from "react";
import debounce from "lodash.debounce"
import { router } from 'expo-router';
import {clampString} from "benito-common/clamp";


type Filters = {
  name?: string;
  categories?: string;
};

const Entities = () => {
    const [filters, setFilters] = useState<Filters>({});
    const updateFilters = debounce(setFilters, 350);

    const {data: organizationsData, isFetching} = useFindManyEntity({
        select: {
            id: true,
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
            // places: {
            //     some: {
            //         place: {
            //             address: addressFilter
            //         }
            //     }
            // },
            name: {
                contains: filters?.name,
                mode: 'insensitive'
            },
            // tags: {
            //     some: {
            //         tag: {
            //             id: {
            //                 in: categoriesFilter?.length == 0 ? undefined : categoriesFilter
            //             }
            //         }
            //     }
            // }
        }
    })

    // const {data: entityCategories} = useFindManyTag({
    //     select: {name: true, id: true}
    // })

    const organizations = organizationsData?.map(o => ({...o, title: o.name, description: clampString(o.description, 160)}))

    return (
        <CardMapList items={organizations}
                     onSearch={s => updateFilters((f: Filters) => ({...f, name: s}))}
                     isLoading={isFetching}
                     onItemClick={i => router.push(`/entities/${i.id}`)}
        />
    )
};


export default Entities;

