import {
    Card,
    CardBody,
    CardHeader,
    Chip,
    Input, Popover, PopoverContent, PopoverTrigger, Select, SelectItem
} from "@nextui-org/react";
import Pin from "../../assets/icons/PinSvg.tsx";
import CompassSvg from "../../assets/icons/CompassSvg.tsx";

import refeicaoIconUrl from "../../../public/entities/refeicao_solidaria_logo.png";
import combateFomeIconUrl from "../../../public/entities/acao_contra_fome_logo.png";
import quilombolasIconUrl from "../../../public/entities/quilombolas_logo.png";
import ranchoIconUrl from "../../../public/entities/rancho_gnomos_logo.png";
import {SearchIcon} from "../../assets/icons/SearchSvg.tsx";
import {FilterIcon} from "../../assets/icons/FiltersSvg.tsx";

import { useFindManyEntity } from 'benito-common/hooks';


type NeedProps = {
    name: string;
    description: string;
    iconUrl: string;
    address: string;
    distance: string;
    entityId?: string;
    tags: string[];
};

const Need = (props: NeedProps) => {
    return (
        <Card className={"cursor-pointer hover:bg-gray-100"}>
            <CardBody className={""}>
                <div className={"flex flex-row gap-x-6 items-center"}>
                    <img src={props.iconUrl} alt={"logo " + props.name} className={"h-32 w-32"}/>

                    <div className={"space-y-4"}>
                        <div>
                            <div className={"flex gap-x-4 items-center"}>
                                <h2 className={"font-medium text-xl"}>{props.name}</h2>
                                {props.tags
                                    .map(t => <Chip key={t} color={"primary"} className={"h-5"}>{t}</Chip>)
                                }
                            </div>

                            {props.description.split("\n")
                                .map(t => <p className={"font-light"}>{t}</p>)
                            }
                        </div>

                        <div className={"flex gap-x-4"}>
                            <div className={"flex gap-x-1"}>
                                <Pin/> <p className={"font-light"}>{props.address}</p>
                            </div>

                            <div className={"flex gap-x-1"}>
                                <CompassSvg /> <p className={"font-light"}>{props.distance}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}


type FiltersProps = {
  className?: string
  organizations: string[]
};

const Filters = ({ organizations }: FiltersProps) => {

    return (
        <Popover placement="bottom" showArrow={true}>
            <PopoverTrigger>
                <div className={"flex items-center gap-x-1 font-medium hover:cursor-pointer"}>
                    <p>Filtros</p>
                    <FilterIcon/>
               </div>
            </PopoverTrigger>
            <PopoverContent className={"gap-y-4 p-4 w-80"}>
                <Select
                    label="Organização"
                    placeholder="Selecione uma organização"
                    className="max-w-full"
                >
                    {organizations.map((org) => (
                        <SelectItem key={org} value={org}>
                            {org}
                        </SelectItem>
                    ))}
                </Select>
            </PopoverContent>
        </Popover>
    )
}


export default function ListNeeds() {
    const needs: NeedProps[] = [
        {
            name: "Projeto refeição solidária",
            description:
                "Somos um grupo de pessoas que nos unimos para levar alimentos (marmitas) a pessoas em situação de rua.\n" +
                "Hoje, além de montarmos nossos kits alimentação, distribuímos kits pets, kits de higiene, kits de frio, cestas básicas, cobertores, etc",
            iconUrl: refeicaoIconUrl,
            address: "Rua Doutor Germano 11, Canoas, RS",
            distance: "2 KM",
            tags: ["Refeição"]
        },
        {
            name: "Ação Combate à Fome",
            description:
                "Somos amigos e parentes que mensalmente se unem de forma a ajudar o próximo, fazemos isso desde 1993.\n" +
                "Auxiliar a quem necessita doação de cestas básicas à famílias em situação de risco que moram em habitações coletivas, mães solteiras e idosos desamparados.",
            iconUrl: combateFomeIconUrl,
            address: "Rua Barcelos 11, Canoas, RS",
            distance: "4 KM",
            tags: ["Refeição"]
        },
        {
            name: "Associação dos Remanecestes Quilombolas Urbano do Bairro da Liberdade",
            description:
                "Temos por finalidade melhorar a qualidade de vida de nossos associados em geral, defendendo-os, organizando-os e desenvolvendo trabalho social, cultural e educacional.\n" +
                "junto aos adultos, idosos, jovens e crianças portadores ou não-portadores de deficiência, incluindo remanescentes de quilombos do Bairro da Liberdade.",
            iconUrl: quilombolasIconUrl,
            address: "Rua Palmares 55, Esteio, RS",
            distance: "5 KM",
            tags: ["Moradia"]
        },
        {
            name: "Santuário Rancho dos Gnomos",
            description:
                "Somos uma Organização Não-Governamental sem fins lucrativos e estamos movidos por uma filosofia de convivência harmoniosa entre os seres que habitam o planeta\n" +
                "Pregamos a ajuda mútua, onde não há melhor ou pior, mais ou menos importante, mas uma troca integrada de informação e de forças.",
            iconUrl: ranchoIconUrl,
            address: "Rua José Alencastro 15, Esteio, RS",
            distance: "6 KM",
            tags: ["Animal"]
        }
    ]

    const { data: organizations, isFetching } = useFindManyEntity({
        select: { name: true, id: true }
    })

    return (
        <Card className={"max-w"}>
            <CardHeader className={"mt-4 justify-center"}>
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
                />

                <div className={"sm:pl-14 md:pl-20 mt-3"}>
                    <Filters organizations={isFetching ? [] : organizations!.map(e => e.name)}/>
                </div>
            </CardHeader>
            <CardBody className={"gap-y-4"}>
                {needs.map(e => <Need {...e} />)}
            </CardBody>
        </Card>
    )
}
