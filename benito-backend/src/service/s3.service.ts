import {Inject, Injectable, Logger} from "@nestjs/common";
import {InjectS3, S3} from "nestjs-s3";
import {S3Configuration} from "../configuration";
import {GetObjectCommandOutput} from "@aws-sdk/client-s3";
import * as path from "path";


@Injectable()
export class S3Service {
    private readonly logger = new Logger(S3Service.name);

    constructor(
        @InjectS3() private readonly s3: S3,
        @Inject('S3Configuration') private readonly s3Config: S3Configuration) {
    }

    public async getImage(dir: string, id: string): Promise<GetObjectCommandOutput> {
        const key = S3Service.buildFilePath(dir, id);

        this.logger.debug(`getting image '${key}'`)

        const result = await this.s3.getObject({
            Bucket: this.s3Config.imagesBucketName,
            Key: key
        });

        this.logger.debug(`success getting image '${key}'`)

        return result;
    }

    public async setImage(dir: string, id: string, mimetype: string, buffer: Buffer): Promise<void> {
        const key = S3Service.buildFilePath(dir, id);

        this.logger.debug(`setting image for '${id}' using key '${key}' with mimetype '${mimetype}'`)

        const params = {
            Bucket: this.s3Config.imagesBucketName,
            Key: key,
            Body: buffer,
            ContentType: mimetype
        };

        await this.s3.putObject(params);

        this.logger.debug(`success setting image for '${id}' using key '${key}' with mimetype '${mimetype}'`)
    }

    static buildFilePath(dir: string, id: string): string {
        return path.join(dir, id)
    }
}
