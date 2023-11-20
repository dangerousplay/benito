import {Inject, Injectable, Logger} from "@nestjs/common";
import {InjectS3, S3} from "nestjs-s3";
import {S3Configuration} from "../configuration";
import * as path from "path";

import {GetObjectCommandOutput} from "@aws-sdk/client-s3";


const needsDirPath = "needs"


@Injectable()
export class NeedsService {
    private readonly logger = new Logger(NeedsService.name);

    constructor(
        @InjectS3() private readonly s3: S3,
        @Inject('S3Configuration') private readonly s3Config: S3Configuration) {
    }


    public async getNeedImage(id: string): Promise<GetObjectCommandOutput> {
        this.logger.debug(`getting need image for '${id}'`)

        const result = await this.s3.getObject({
            Bucket: this.s3Config.imagesBucketName,
            Key: NeedsService.buildFilePath(id)
        });

        this.logger.debug(`success getting need image for '${id}'`)

        return result;
    }

    public async setNeedImage(id: string, mimetype: string, buffer: Buffer): Promise<void> {
        const key = NeedsService.buildFilePath(id);

        this.logger.debug(`setting need image for '${id}' using key '${key}' with mimetype '${mimetype}'`)

        const params = {
            Bucket: this.s3Config.imagesBucketName,
            Key: key,
            Body: buffer,
            ContentType: mimetype
        };

        await this.s3.putObject(params);

        this.logger.debug(`success setting need image for need '${id}' using key '${key}' with mimetype '${mimetype}'`)
    }

    static buildFilePath(id: string): string {
        return path.join(needsDirPath, id)
    }


}
