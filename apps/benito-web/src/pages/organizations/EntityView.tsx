import React from "react";
import {Avatar, AvatarGroup, Card, CardBody, CardHeader, Chip, Spinner} from "@nextui-org/react";
import {useNavigate, useParams} from "react-router-dom";
import {useGeolocated} from "react-geolocated";
import { useFindUniqueEntity } from "benito-common/hooks";
import {WorkingTime} from "../../components/WorkingTime.tsx";
import {AddressView} from "../../components/AddressView.tsx";
import { findClosestAddress } from "benito-common/address.ts";
import {GoogleMap} from "../../components/map";
import {GlobeAltIcon, PhoneIcon} from "@heroicons/react/24/outline";


type VolunteersProps = {
    volunteers: any,
    onClick: (_) => void
};

function Volunteers({ volunteers, onClick }: Readonly<VolunteersProps>) {
    if (!volunteers) {
        return <></>
    }

    return (
        <div className={"mt-8 flex items-start hover:cursor-pointer rounded-xl"}
             onClick={onClick}>
            <div className={"mb-2 space-y-4"}>
                <p className={"text-xl font-medium"}>Voluntários</p>

                <AvatarGroup isBordered>
                    {volunteers.map(u => <Avatar key={u.user.id} src={u.user.iconUrl}
                                                 name={u.user.name}
                                                 size={"lg"}/>)}
                </AvatarGroup>
            </div>
        </div>
    )
}

function EntityContact(props: { organization: any }) {
    return (
        <div className={"mt-12 space-y-4"}>
            <p className={"text-xl font-medium"}>Contato</p>

            <div>
                {props.organization.phoneNumber && <div className={"flex flex-row space-x-2 items-center"}>
                    <PhoneIcon className={"w-6"}/>
                    <p className={"font-light text-xl pl-2"}>{props.organization.phoneNumber}</p>
                </div>}

                {props.organization.website && <div className={"flex flex-row space-x-2 items-center"}>
                    <GlobeAltIcon className={"w-8"}/>
                    <p className={"font-light underline"}>
                        <a href={props.organization.website} target={"_blank"}>{props.organization.website}</a>
                    </p>
                </div>}
            </div>
        </div>
    );
}

export const EntityView = () => {
    const {id} = useParams();

    const navigate = useNavigate();

    const {coords, isGeolocationAvailable} =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 10000,
        });

    const {data: organization, isFetching} = useFindUniqueEntity({
        select: {
            id: true,
            name: true,
            description: true,
            iconUrl: true,
            createdAt: true,
            updatedAt: true,
            phoneNumber: true,
            website: true,
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
            },
            users: {
                include: {
                    user: true,
                }
            }
        },

        where: {
            id: id,
        }
    })

    if (isFetching) {
        return <Spinner />
    }

    const addresses = organization?.places?.map(({place}) => ({...place, ...place.address}))

    let address = addresses[0]

    if (isGeolocationAvailable) {
        address = findClosestAddress({lat: coords.latitude, lon: coords.longitude}, addresses)
    }

    const addressPosition = { lat: address.latitude, lng: address.longitude }

    const markers = [
        new google.maps.Marker({
            position: addressPosition,
            icon: {
                url: organization.iconUrl,
                scaledSize: new google.maps.Size(70, 70)
            }
        })
    ]
    
    const tags = organization.tags.map(t => t.tag.name);

    const volunteers = organization.users;

    return (
        <div>
            <Card>
                <CardHeader className={"border-b-2"}>
                    <div className={"flex m-2 items-center space-x-16 pb-2"}>
                        <img src={organization.iconUrl} alt={"logo " + organization.name}
                             className={"h-32 w-32"}/>

                        <div className={"space-y-2"}>
                            <p className={"font-bold text-2xl"}>{organization.name}</p>
                            {tags.map(i => <Chip key={i} color={"primary"}>{i}</Chip>)}
                        </div>
                    </div>
                </CardHeader>

                <CardBody className={"border-b-2"}>
                    <div className={"p-1"}>
                        <div className={"mt-4"}>
                            {organization.description
                                .split("\n")
                                .map(i => <p key={i} className={"text-xl"}>{i}</p>)}
                        </div>

                        <Volunteers volunteers={volunteers}
                                    onClick={_ => navigate(`/home/organizations/${id}/volunteers`)}/>

                        <EntityContact organization={organization}/>
                    </div>

                    <div className={"mt-12 text-xl font-light"}>
                        <p className={"text-inherit"}>Criada em {organization.createdAt.toLocaleString()}</p>
                        <p className={"text-inherit"}>Última atualização {organization.updatedAt.toLocaleString()}</p>
                    </div>
                </CardBody>
            </Card>

            <Card className={"mt-12"}>
                <GoogleMap center={addressPosition} markers={markers} className={"h-[500px]"}/>

                <CardBody>
                    <div className={"space-y-1 w-full"}>
                        <WorkingTime opensAt={address.opensAt}
                                     closesAt={address.closesAt}
                                     workingDays={address.workingDays}/>

                        <AddressView address={address} distance={address.distance}/>
                    </div>
                </CardBody>
            </Card>
        </div>

    )
}
