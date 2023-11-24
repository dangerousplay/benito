import {Module} from "@nestjs/common";
import {S3Service} from "./s3.service";
import {NeedsService} from "./needs.service";
import {S3ConfigurationModule} from "../configuration";
import {PrismaService} from "./prisma.service";
import {EntityService} from "./entity.service";
import {ItemService} from "./item.service";

export * from './needs.service';
export * from './s3.service';


@Module({
    providers: [S3Service, NeedsService, PrismaService, EntityService, ItemService],
    imports: [S3ConfigurationModule],
    exports: [S3Service, NeedsService, EntityService, PrismaService, ItemService]
})
export class ServiceModule {

}
