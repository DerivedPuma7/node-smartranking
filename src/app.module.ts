import { JogadoresModule } from './jogadores/jogadores.module';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_CONECTION_URL),
    JogadoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
