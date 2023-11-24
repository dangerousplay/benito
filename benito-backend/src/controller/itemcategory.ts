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

import { Readable } from "stream";
import type { Response } from 'express';
import {fileImageValidator} from "../configuration/fileupload";
import {detectImageType} from "../image";
import {ItemService} from "../service/item.service";


@Controller("/item/category")
export class ItemCategoryController {
    private readonly logger = new Logger(ItemCategoryController.name);

    constructor(
        private itemService: ItemService
    ) {}

    @Get("/:id/image")
    async getNeedImage(@Param('id') id: string, @Res({ passthrough: true })  res: Response): Promise<StreamableFile> {
        try {
            const image = await this.itemService.getItemCategoryImage(id)

            res.set({
                "Content-Type": image.ContentType,
                "Content-Length": image.ContentLength.toString()
            })

            return new StreamableFile(image.Body as Readable)
        } catch (e) {
            if (e instanceof NoSuchKey) {
                res.status(404)

                this.logger.debug(`Not found image for item category '${id}'`)
            } else {
                throw e
            }
        }
    }

    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload an image for the item category',
        type: NeedImageUpload,
    })
    @Post(":id/image")
    async uploadNeedImage(
        @UploadedFile(fileImageValidator) file: Express.Multer.File,
        @Param('id') id: string
    ) {
        const imageTyp = await detectImageType(file.buffer)

        this.logger.debug(`detected upload image type '${imageTyp.mime}' for '${id}'`)

        await this.itemService.setItemCategoryImage(id, imageTyp.mime, file.buffer);
    }
}
