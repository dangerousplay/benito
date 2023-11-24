import {Injectable, Logger} from "@nestjs/common";

import {GetObjectCommandOutput} from "@aws-sdk/client-s3";
import {S3Service} from "./s3.service";


const itemCategoryDirPath = "item-category"


@Injectable()
export class ItemService {
    private readonly logger = new Logger(ItemService.name);

    constructor(
        private s3Service: S3Service,
    ) {}

    public async getItemCategoryImage(id: string): Promise<GetObjectCommandOutput> {
        return this.s3Service.getImage(itemCategoryDirPath, id);
    }

    public async setItemCategoryImage(id: string, mimetype: string, buffer: Buffer): Promise<void> {
        return this.s3Service.setImage(itemCategoryDirPath, id, mimetype, buffer);
    }
}
