import {
    Controller,
    Get,
    Logger,
    Param,
    Post, Res, StreamableFile,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {NoSuchKey} from "@aws-sdk/client-s3";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiBody, ApiConsumes} from "@nestjs/swagger";
import {NeedImageUpload} from "./dto/needs";
import {NeedsService} from "../service";

import { Readable } from "stream";
import type { Response } from 'express';
import {fileImageValidator} from "../configuration/fileupload";
import {detectImageType} from "../image";


@Controller("/needs")
export class NeedsController {
    private readonly logger = new Logger(NeedsController.name);

    constructor(
        private needService: NeedsService
    ) {}

    @Get("/:id/image")
    async getNeedImage(@Param('id') id: string, @Res({ passthrough: true })  res: Response): Promise<StreamableFile> {
        try {
            const image = await this.needService.getNeedImage(id)

            res.set({
                "Content-Type": image.ContentType,
                "Content-Length": image.ContentLength.toString()
            })

            return new StreamableFile(image.Body as Readable)
        } catch (e) {
            if (e instanceof NoSuchKey) {
                res.status(404)

                this.logger.debug(`Not found image for need '${id}'`)
            } else {
                throw e
            }
        }
    }

    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload an image for the need',
        type: NeedImageUpload,
    })
    @Post(":id/image")
    async uploadNeedImage(
        @UploadedFile(fileImageValidator) file: Express.Multer.File,
        @Param('id') id: string
    ) {
        const imageTyp = await detectImageType(file.buffer)

        this.logger.debug(`detected upload image type '${imageTyp.mime}' for '${id}'`)

        await this.needService.setNeedImage(id, imageTyp.mime, file.buffer);
    }
}
