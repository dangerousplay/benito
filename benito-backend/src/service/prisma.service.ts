import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // constructor() {
  //   super({
  //     log: ['info'],
  //   });
  // }

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  async onModuleInit() {
    // Note: this is optional
    await this.$connect();

    this.$use(async (params, next) => {
      if (params.action == 'create' && params.model == 'User') {
        const user = params.args.data;
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(user.password, salt);

        user.password = hash;
        params.args.data = user;
      }

      return next(params);
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('query', async (e) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log(`${e.query} ${e.params}`);
    });
  }
}
