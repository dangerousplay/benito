import {S3Module} from "nestjs-s3";
import {Module, Provider} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";


export class S3Configuration {
    imagesBucketName: string
    fileMaxSize: number
    accessKey: string
    secretKey: string
    endpoint: string

    constructor(config: any) {
        this.fileMaxSize = config?.fileMaxSize
        this.imagesBucketName = config?.imagesBucketName
        this.accessKey = config?.accessKey
        this.secretKey = config?.secretKey
        this.endpoint = config?.endpoint
    }
}

const loadS3Configuration = (conf: ConfigService): S3Configuration => {
    return new S3Configuration({
        imagesBucketName: conf.get('S3_IMAGES_BUCKET_NAME'),
        fileMaxSize: conf.get('FILE_UPLOAD_MAX_SIZE'),
        accessKey: conf.get('S3_ACCESS_KEY'),
        secretKey: conf.get('S3_SECRET_KEY'),
        endpoint: conf.get('S3_ENDPOINT'),
    })
};

export const S3ConfigurationProvider: Provider = {
    provide: 'S3Configuration',
    useFactory: loadS3Configuration,
    inject: [ConfigService]
};

@Module({
    providers: [S3ConfigurationProvider],
    exports: [S3ConfigurationProvider],
    imports: [ConfigModule]
})
export class S3ConfigurationModule { }



export const S3ModuleConf = S3Module.forRootAsync({
    useFactory: (config: ConfigService) => {
        const s3Config = loadS3Configuration(config);

        return ({
            config: {
                credentials: {
                    accessKeyId: s3Config.accessKey,
                    secretAccessKey: s3Config.secretKey,
                },
                // region: 'us-east-1',
                endpoint: s3Config.endpoint,
                forcePathStyle: true,
                signatureVersion: 'v4',
            },
        })
    },
    imports: [ConfigModule],
    inject: [ConfigService]
});
