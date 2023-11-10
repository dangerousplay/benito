import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ClsModule } from 'nestjs-cls';
import { CrudMiddleware } from './zen/crud.middleware';


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
            userId ? { id: Number(userId), role: userRole } : undefined,
          );
        },
      },
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CrudMiddleware).forRoutes('/api/model');
  }
}
