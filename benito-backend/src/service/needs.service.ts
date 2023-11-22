import {Injectable, Logger} from "@nestjs/common";

import {GetObjectCommandOutput} from "@aws-sdk/client-s3";
import {S3Service} from "./s3.service";


const needsDirPath = "needs"


@Injectable()
export class NeedsService {
    private readonly logger = new Logger(NeedsService.name);

    constructor(
        private s3Service: S3Service,
    ) {}

    public async getNeedImage(id: string): Promise<GetObjectCommandOutput> {
        return this.s3Service.getImage(needsDirPath, id);
    }

    public async setNeedImage(id: string, mimetype: string, buffer: Buffer): Promise<void> {
        return this.s3Service.setImage(needsDirPath, id, mimetype, buffer);
    }
}
