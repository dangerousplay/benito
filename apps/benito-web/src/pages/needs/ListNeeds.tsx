import {
    CardHeader,
    Input, Popover, PopoverContent, PopoverTrigger
} from "@nextui-org/react";

import debounce from "lodash.debounce"

import {SearchIcon} from "../../assets/icons/SearchSvg.tsx";
import {FilterIcon} from "../../assets/icons/FiltersSvg.tsx";
import { useGeolocated } from "react-geolocated";

import {useFindManyEntity, useFindManyItemCategory, useFindManyItemNeed} from 'benito-common/hooks';
import { findClosestAddress } from 'benito-common/address';
import {CardMapList} from "../../components/card";
import {useRef, useState} from "react";
import {Selectable} from "../../components/Selectable.tsx";
import {ProgressBar} from "../../components/progress";
import {useNavigate} from "react-router-dom";


type NeedProps = {
    title: string;
    description: string;
    iconUrl: string;
    address: string;
    distance?: number;
    entityId?: string;
    tags: string[];
};


type Filters = {
    name?: string;
    entities?: string[];
    categories?: string[];
}


type FiltersProps = {
  className?: string
  organizations: string[]
  categories: string[]
  onFilterUpdated?: (_ :Filters) => void;
};

const Filter = ({ organizations, categories, onFilterUpdated = () => {}, className }: FiltersProps) => {
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
                placeholder="Alimentos..."
                size="sm"
                startContent={<SearchIcon width={18} height={18} />}
                type="search"
                onValueChange={ v => updateFilter("name", v)}
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
                            label={"Organização"}
                            placeHolder={"Selecione as organizações"}
                            selectionMode={"multiple"}
                            items={organizations as any}
                            onSelectionChange={s => updateFilter("entities", s)}
                        />

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


export default function ListNeeds() {
    const { data: organizations } = useFindManyEntity({
        select: { name: true, id: true }
    })

    const { data: itemCategories} = useFindManyItemCategory({
        select: { name: true, id: true }
    })

    const navigate = useNavigate();

    const { coords, isGeolocationAvailable } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 10000,
        });

    const [addressFilter, setAddressFilter] = useState();
    const [nameFilter, setNameFilter] = useState<string>()
    const [entitiesFilter, setEntitiesFilter] = useState<string[]>()
    const [categoriesFilter, setCategoriesFilter] = useState<string[]>()


    const { data: itemNeeds } = useFindManyItemNeed({
        select: {
            id: true,
            name: true,
            description: true,
            minimum: true,
            currentAcquired: true,
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
                contains: nameFilter,
                mode: 'insensitive'
            },
            entity: {
                id: {
                    in: entitiesFilter?.length == 0 ? undefined : entitiesFilter
                }
            },
            category: {
                id: {
                    in: categoriesFilter?.length == 0 ? undefined : categoriesFilter
                }
            }
        }
    })

    const needs: NeedProps[] = itemNeeds ? itemNeeds.map(i => {
        const addresses = i.entity.places.map(({place}) => ({...place, ...place.address}));

        const closestAddress = isGeolocationAvailable ?
            findClosestAddress({ lat: coords?.latitude, lon: coords?.longitude }, addresses) :
            addresses[0];

        return {
            id: i.id,
            title: i.name,
            description: i.description,
            iconUrl: i.category.iconUrl,
            address: closestAddress,
            distance: closestAddress.distance,
            entityId: i.entity.id,
            minimum: i.minimum,
            currentAcquired: i.currentAcquired,
            tags: [i.category.name],
        }
    }) : [];

    const updateFilters = debounce((f: Filters) => {
        setEntitiesFilter(f.entities)
        setNameFilter(f.name)
        setCategoriesFilter(f.categories)
    }, 250)

    return (
        <CardMapList items={needs}
                     setAddressFilter={f => {
                        setAddressFilter(f)
                     }}
                     afterTextComponent={i => {
                         return i.minimum && <ProgressBar value={i.currentAcquired/i.minimum} rightComponent={<p className={"text-inherit"}>{i.currentAcquired}/{i.minimum}</p>}/>
                     }}
                     onItemClick={i => navigate(`/home/needs/${i.id}`)}
                     cardHeader={
                        <Filter organizations={organizations}
                                onFilterUpdated={updateFilters}
                                categories={itemCategories}
                        />
                     }
        />
    )
}
