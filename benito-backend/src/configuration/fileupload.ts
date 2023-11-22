import {HttpStatus, ParseFilePipe, ParseFilePipeBuilder, Provider} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

export const fileImageValidator = new ParseFilePipeBuilder()
    .addMaxSizeValidator({
        maxSize: 1000 * 1000 * 3
    })
    .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    });


const loadFileUploadConfiguration = (conf: ConfigService): ParseFilePipe => {
    return new ParseFilePipeBuilder()
        .addMaxSizeValidator({
            maxSize: 1000 * 1000 * 3
        })
        .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        });
};

export const FileImgValidatorConfProvider: Provider = {
    provide: 'FileImageValidator',
    useFactory: loadFileUploadConfiguration,
    inject: [ConfigService]
};
