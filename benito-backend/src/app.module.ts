import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ClsModule } from 'nestjs-cls';
import { CrudMiddleware } from './zen/crud.middleware';
import {S3ConfigurationModule, S3ModuleConf} from "./configuration";
import {NeedsController} from "./controller";
import {ConfigModule} from "@nestjs/config";
import {NeedsService} from "./service";


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
    S3ConfigurationModule
  ],
  controllers: [NeedsController],
  providers: [PrismaService, NeedsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CrudMiddleware).forRoutes('/api/model');
  }
}
