import {Module} from "@nestjs/common";
import {S3Service} from "./s3.service";
import {NeedsService} from "./needs.service";
import {S3ConfigurationModule, S3ConfigurationProvider} from "../configuration";
import {ClsModule} from "nestjs-cls";
import {PrismaService} from "./prisma.service";
import {EntityService} from "./entity.service";

export * from './needs.service';
export * from './s3.service';


@Module({
    providers: [S3Service, NeedsService, PrismaService, EntityService],
    imports: [S3ConfigurationModule],
    exports: [S3Service, NeedsService, EntityService, PrismaService]
})
export class ServiceModule {

}
