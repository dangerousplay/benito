import {Injectable, Logger} from "@nestjs/common";

import {GetObjectCommandOutput} from "@aws-sdk/client-s3";
import {S3Service} from "./s3.service";


const entityDirPath = "entity"


@Injectable()
export class EntityService {
    private readonly logger = new Logger(EntityService.name);

    constructor(
        private s3Service: S3Service,
    ) {}

    public async getEntityImage(id: string): Promise<GetObjectCommandOutput> {
        return this.s3Service.getImage(entityDirPath, id);
    }

    public async setEntityImage(id: string, mimetype: string, buffer: Buffer): Promise<void> {
        return this.s3Service.setImage(entityDirPath, id, mimetype, buffer);
    }
}
