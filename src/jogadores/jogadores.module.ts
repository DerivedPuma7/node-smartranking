import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [JogadoresController],
  providers: [JogadoresService],
})
export class JogadoresModule {}
