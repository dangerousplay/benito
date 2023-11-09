import {Card, CardBody, Chip} from "@nextui-org/react";
import Pin from "../../assets/icons/PinSvg.tsx";
import CompassSvg from "../../assets/icons/CompassSvg.tsx";

import refeicaoIconUrl from "../../assets/entities/refeicao_solidaria_logo.png";
import combateFomeIconUrl from "../../assets/entities/acao_contra_fome_logo.png";
import quilombolasIconUrl from "../../assets/entities/quilombolas_logo.png";
import ranchoIconUrl from "../../assets/entities/rancho_gnomos_logo.png";


type EntityProps = {
    name: string;
    mission: string;
    iconUrl: string;
    address: string;
    distance: string;
    tags: string[];
};

const Entity = (props: EntityProps) => {
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

                            {props.mission.split("\n")
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


export default function ListEntities() {
    const entities: EntityProps[] = [
        {
            name: "Projeto refeição solidária",
            mission:
                "Somos um grupo de pessoas que nos unimos para levar alimentos (marmitas) a pessoas em situação de rua.\n" +
                "Hoje, além de montarmos nossos kits alimentação, distribuímos kits pets, kits de higiene, kits de frio, cestas básicas, cobertores, etc",
            iconUrl: refeicaoIconUrl,
            address: "Rua Doutor Germano 11, Canoas, RS",
            distance: "2 KM",
            tags: ["Refeição"]
        },
        {
            name: "Ação Combate à Fome",
            mission:
                "Somos amigos e parentes que mensalmente se unem de forma a ajudar o próximo, fazemos isso desde 1993.\n" +
                "Auxiliar a quem necessita doação de cestas básicas à famílias em situação de risco que moram em habitações coletivas, mães solteiras e idosos desamparados.",
            iconUrl: combateFomeIconUrl,
            address: "Rua Barcelos 11, Canoas, RS",
            distance: "4 KM",
            tags: ["Refeição"]
        },
        {
            name: "Associação dos Remanecestes Quilombolas Urbano do Bairro da Liberdade",
            mission:
                "Temos por finalidade melhorar a qualidade de vida de nossos associados em geral, defendendo-os, organizando-os e desenvolvendo trabalho social, cultural e educacional.\n" +
                "junto aos adultos, idosos, jovens e crianças portadores ou não-portadores de deficiência, incluindo remanescentes de quilombos do Bairro da Liberdade.",
            iconUrl: quilombolasIconUrl,
            address: "Rua Palmares 55, Esteio, RS",
            distance: "5 KM",
            tags: ["Moradia"]
        },
        {
            name: "Santuário Rancho dos Gnomos",
            mission:
                "Somos uma Organização Não-Governamental sem fins lucrativos e estamos movidos por uma filosofia de convivência harmoniosa entre os seres que habitam o planeta\n" +
                "Pregamos a ajuda mútua, onde não há melhor ou pior, mais ou menos importante, mas uma troca integrada de informação e de forças.",
            iconUrl: ranchoIconUrl,
            address: "Rua José Alencastro 15, Esteio, RS",
            distance: "6 KM",
            tags: ["Animal"]
        }
    ]

    return (
        <Card className={"max-w"}>
            <CardBody className={"gap-y-4"}>
                {entities.map(e => <Entity {...e} />)}
            </CardBody>
        </Card>
    )
}
