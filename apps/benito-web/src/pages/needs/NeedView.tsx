import React from "react";
import {Card, CardBody, CardHeader, Spinner} from "@nextui-org/react";
import { useFindUniqueItemNeed } from "benito-common/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {ProgressBar} from "../../components/progress";
import {WorkingTime} from "../../components/WorkingTime.tsx";
import {AddressView} from "../../components/AddressView.tsx";
import { findClosestAddress } from "benito-common/address.ts";
import {useGeolocated} from "react-geolocated";
import {GoogleMap} from "../../components/map";


const EntityView = ({itemNeed, address}) => {
    const navigate = useNavigate();

    return <Card className={"m-4 hover:bg-gray-100 hover:cursor-pointer"}>
        <div className={"m-4"}
             onClick={_ => navigate(`/home/organizations/${itemNeed.entity.id}`)}>
            <div className={"flex items-center space-x-16"}>
                <img src={itemNeed.entity.iconUrl} alt={"logo " + itemNeed.entity.name} className={"h-32 w-32"}/>

                <div className={"space-y-2"}>
                    <p className={"font-bold text-2xl"}>{itemNeed.entity.name}</p>
                    <p className={"text-xl"}>{itemNeed.entity.description}</p>
                </div>
            </div>

            <div className={"space-y-1 w-full mt-8"}>
                <WorkingTime opensAt={address.opensAt}
                             closesAt={address.closesAt}
                             workingDays={address.workingDays}/>

                <AddressView address={address} distance={address.distance}/>
            </div>
        </div>
    </Card>;
}

export type NeedViewProps = {
};

export const NeedView = (props: NeedViewProps) => {
    const { id } = useParams();

    const { coords, isGeolocationAvailable } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 10000,
        });

    const { data: itemNeed, isFetching } = useFindUniqueItemNeed({
        select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            minimum: true,
            currentAcquired: true,
            entity: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    iconUrl: true,
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
            id
        }
    })

    if (isFetching) {
        return <Spinner size={"lg"} />
    }

    const progress = itemNeed?.currentAcquired/itemNeed?.minimum

    const addresses = itemNeed?.entity?.places?.map(({place}) => ({...place, ...place.address}))

    let address = addresses[0]

    if (isGeolocationAvailable) {
        address = findClosestAddress({lat: coords.latitude, lon: coords.longitude}, addresses)
    }

    const addressPosition = { lat: address.latitude, lng: address.longitude }

    const markers = [
        new google.maps.Marker({
            position: addressPosition,
            icon: {
                url: itemNeed.category.iconUrl,
                scaledSize: new google.maps.Size(70, 70)
            }
        })
    ]

  return (
      <div>
          <Card>
              <CardHeader className={"border-b-2 p-6"}>
                  <div className={"flex items-center space-x-16"}>
                      <img src={itemNeed.category.iconUrl} alt={"logo " + itemNeed.name} className={"h-32 w-32"}/>
                      <p className={"font-bold text-2xl"}>{itemNeed.name}</p>
                  </div>
              </CardHeader>


              <CardBody className={"mt-2 border-b-2"}>
                  <p className={"text-xl"}>{itemNeed.description}</p>

                  {itemNeed?.minimum > 0 && <div className={"mt-8"}>
                      <ProgressBar value={progress}
                                   rightComponent={<p>{itemNeed.currentAcquired}/{itemNeed.minimum}</p>}
                      />
                  </div>}

                  <div className={"mt-16 text-xl font-light"}>
                      <p className={"text-inherit"}>Criada em {itemNeed.createdAt.toLocaleString()}</p>
                      <p className={"text-inherit"}>Última atualização {itemNeed.updatedAt.toLocaleString()}</p>
                  </div>
              </CardBody>

              <EntityView itemNeed={itemNeed} address={address}/>


          </Card>

          <Card className={"mt-12"}>
              <GoogleMap center={addressPosition} markers={markers} className={"h-[500px]"}/>
          </Card>
      </div>
  )
}
