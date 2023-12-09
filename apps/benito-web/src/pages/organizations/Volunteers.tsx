import { useFindManyOrganizationUsers } from "benito-common/hooks"
import {useParams} from "react-router-dom";
import {Avatar, Card, CardBody, Spinner} from "@nextui-org/react";

export const Volunteers = () => {
    const { id } = useParams();

    const {data, isFetching} = useFindManyOrganizationUsers({
        include: {
            user: true
        },
        where: {
            organizationId: id,
        }
    })

    if (isFetching) {
        return <Spinner size={"lg"} />
    }

    return (
        <div className={"space-y-4"}>
            {data.map(({user, role}) => {
                return (
                    <Card key={user.id}>
                        <CardBody className={"flex flex-row items-center space-x-4"}>
                            <Avatar src={user.iconUrl} name={user.name} size={"lg"}/>

                            <div>
                                <p className={"text-xl"}>{user.name} {user.lastName}</p>
                                <p>{role}</p>
                            </div>
                        </CardBody>
                    </Card>
                )
            })}
        </div>
    )
}
