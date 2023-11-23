import React, {useContext} from "react";
import axios from 'axios';

export class EntityClient {
    constructor(private url: string) {
    }

    public async uploadPhoto(id: string, file) {
        const formData = new FormData();
        formData.append("file", file)

        const url = `${this.url}/entity/${id}/image`

        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return url
    }
}


export const EntityClientContext = React.createContext(
    new EntityClient("http://localhost:3002")
)

export const useEntityClient = () => {
    return useContext(EntityClientContext)
}
