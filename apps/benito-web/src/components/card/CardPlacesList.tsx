import {
    Card,
    CardBody,
    Chip,
} from "@nextui-org/react";
import React from "react";
import {WorkingTime} from "../WorkingTime.tsx";
import {AddressView} from "../AddressView.tsx";


type CardItemEventListener = {
    onItemHover?: (c: CardItemProps) => void;
    onItemClick?: (c: CardItemProps) => void;
}

export type CardItemProps = {
    id?: string;
    title: string;
    description: string;
    iconUrl: string;
    address: Address;
    distance?: number;
    tags: string[];
} & CardItemEventListener;

const CardItem = (props: CardItemProps) => {

    const {
        iconUrl, title, description,
        address, distance, tags,
        onItemClick = (_) => {},
        onItemHover = (_) => {},
    } = props;

    return (
        <Card className={"cursor-pointer hover:bg-gray-100"}
              onClick={(_) => onItemClick(props)}
              onMouseEnter={(_) => onItemHover(props)}>
            <CardBody>
                <div className={"flex flex-row space-x-6 items-center"}>
                    <img src={iconUrl} alt={"logo " + title} className={"h-32 w-32"}/>

                    <div className={"space-y-6"}>
                        <div>
                            <div className={"flex gap-x-4 items-center"}>
                                <h2 className={"font-medium text-xl xl:text-2xl"}>{title}</h2>
                                {tags
                                    .map(t => <Chip key={t} color={"primary"} className={"h-5 xl:text-xl xl:h-8"}>{t}</Chip>)
                                }
                            </div>

                            {description.split("\n")
                                .map(t => <p key={t} className={"font-light xl:text-xl"}>{t}</p>)
                            }
                        </div>

                        <div className={"space-y-1"}>
                            <WorkingTime opensAt={address.opensAt}
                                         closesAt={address.closesAt}
                                         workingDays={address.workingDays} />

                            <AddressView address={address} distance={distance}/>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export type CardListProps = {
    items: CardItemProps[]
    cardHeader?: React.ReactElement;
    cardFooter?: React.ReactElement;
} & CardItemEventListener;

export const CardPlacesList = ({ items, cardHeader, cardFooter, onItemClick }: CardListProps) => {
    return (
        <Card className={"max-w"}>
            {cardHeader}

            <CardBody className={"gap-y-4"}>
                {items.map(i => <CardItem {...i} onItemClick={onItemClick}/>)}
            </CardBody>

            {cardFooter}
        </Card>
    )
}
