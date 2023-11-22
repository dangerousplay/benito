import {Inject, Injectable, Logger} from "@nestjs/common";
import {InjectS3, S3} from "nestjs-s3";
import {S3Configuration} from "../configuration";
import * as path from "path";

import {GetObjectCommandOutput} from "@aws-sdk/client-s3";
import {S3Service} from "./s3.service";


const entityDirPath = "entity"


@Injectable()
export class EntityService {
    private readonly logger = new Logger(EntityService.name);

    constructor(
        private s3Service: S3Service,
    ) {}

    public async getNeedImage(id: string): Promise<GetObjectCommandOutput> {
        return this.s3Service.getImage(entityDirPath, id);
    }

    public async setNeedImage(id: string, mimetype: string, buffer: Buffer): Promise<void> {
        return this.s3Service.setImage(entityDirPath, id, mimetype, buffer);
    }
}
