import {
    useFindManyEntity,
    Address,
    useFindManyTag
} from 'benito-common/hooks';

import {findClosestAddress} from 'benito-common/address';

import {useGeolocated} from "react-geolocated";
import {CardItemProps, CardMapList} from "../../components/card";
import {useRef, useState} from "react";
import {CardHeader, Input, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {SearchIcon} from "../../assets/icons/SearchSvg.tsx";
import {FilterIcon} from "../../assets/icons/FiltersSvg.tsx";
import {Selectable} from "../../components/Selectable.tsx";

import debounce from "lodash.debounce"


type Filters = {
    name?: string;
    categories?: string[];
}


type FiltersProps = {
    className?: string
    categories: string[]
    onFilterUpdated?: (_: Filters) => void;
};

const Filter = ({
                    categories,
                    onFilterUpdated = () => {},
                    className
                }: FiltersProps) => {
    const filters = useRef<Filters>({})

    const updateFilter = (name: keyof Filters, value: any) => {
        filters.current[name] = value;

        onFilterUpdated(filters.current);
    }

    return (
        <CardHeader className={`mt-4 justify-center gap-x-14 ${className}`}>
            <Input
                classNames={{
                    base: "max-w-full sm:max-w-[30rem] h-5",
                    mainWrapper: "h-full",
                    innerWrapper: "",
                    input: "text-small",
                    inputWrapper: "h-full font-normal text-default-500 rounded-xl border-b-1",
                }}
                placeholder="Casa do Consolador..."
                size="sm"
                startContent={<SearchIcon width={18} height={18}/>}
                type="search"
                onValueChange={v => updateFilter("name", v)}
            />

            <div className={"mt-2"}>
                <Popover placement="bottom" showArrow={true}>
                    <PopoverTrigger>
                        <div className={"flex items-center gap-x-1 font-medium hover:cursor-pointer"}>
                            <p>Filtros</p>
                            <FilterIcon/>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className={"gap-y-4 p-4 w-80"}>
                        <Selectable
                            label={"Categoria"}
                            placeHolder={"Selecione as categorias"}
                            selectionMode={"multiple"}
                            items={categories as any}
                            onSelectionChange={s => updateFilter("categories", s)}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </CardHeader>

    )
}

export default function ListEntities() {

    const {coords, isGeolocationAvailable} =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            userDecisionTimeout: 10000,
        });

    const isGeoReady = isGeolocationAvailable && coords;

    const [addressFilter, setAddressFilter] = useState();

    const {data: entityCategories} = useFindManyTag({
        select: {name: true, id: true}
    })

    const [nameFilter, setNameFilter] = useState<string>()
    const [categoriesFilter, setCategoriesFilter] = useState<string[]>()

    const {data: organizations, isFetching} = useFindManyEntity({
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
            tags: {
                select: {
                    tag: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        },

        where: {
            places: {
                some: {
                    place: {
                        address: addressFilter
                    }
                }
            },
            name: {
                contains: nameFilter,
                mode: 'insensitive'
            },
            tags: {
                some: {
                    tag: {
                        id: {
                            in: categoriesFilter?.length == 0 ? undefined : categoriesFilter
                        }
                    }
                }
            }
        }
    })

    const updateFilters = debounce((f: Filters) => {
        setNameFilter(f.name)
        setCategoriesFilter(f.categories)
    }, 250)

    const entities: CardItemProps[] = organizations ? organizations.map(e => {
        const addresses = e.places.map(({place}) => ({...place, ...place.address}));

        let closestAddress = addresses[0];

        if (isGeoReady) {
            const selfCoords = {lat: coords.latitude, lon: coords.longitude};
            closestAddress = findClosestAddress(selfCoords, addresses)
        }

        return {
            title: e.name,
            description: e.description,
            iconUrl: e.iconUrl,
            address: closestAddress,
            distance: closestAddress.distance,
            tags: e.tags.map(t => t.tag.name)
        }
    }) : []

    return (
        <CardMapList
            items={entities}
            setAddressFilter={f => {
              setAddressFilter(f)
            }}
            cardHeader={
                <Filter onFilterUpdated={updateFilters}
                        categories={entityCategories}
                />
            }
        />
    )
}
