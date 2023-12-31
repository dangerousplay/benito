import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { CrudMiddleware } from './zen/crud.middleware';
import {S3ConfigurationModule, S3ModuleConf} from "./configuration";
import {NeedsController} from "./controller";
import {ConfigModule} from "@nestjs/config";
import {ServiceModule} from "./service";
import {FileImgValidatorConfProvider} from "./configuration/fileupload";
import {EntitiesController} from "./controller/entity";
import {ItemCategoryController} from "./controller/itemcategory";


@Module({
  imports: [
    ClsModule.forRoot({
      middleware: {
        mount: true,
        setup: (cls, req) => {
          const userId = req.headers['x-user-id'];
          const userRole = req.headers['x-user-role'] ?? 'USER';
          cls.set(
            'user',
            userId ? { id: userId, role: userRole } : undefined,
          );
        },
      },
    }),
    S3ModuleConf,
    ConfigModule.forRoot(),
    S3ConfigurationModule,
      ServiceModule
  ],
  controllers: [NeedsController, EntitiesController, ItemCategoryController],
  providers: [FileImgValidatorConfProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CrudMiddleware).forRoutes('/api/model');
  }
}
