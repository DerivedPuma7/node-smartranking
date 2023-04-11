import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

import {
  Controller,
  Post,
  Put,
  Body,
  Get,
  Delete,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.jogadoresService.atualizarJogadorPorId(id, atualizarJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.consultarJogadores();
  }

  @Get(':id')
  async consultarJogadorPorId(@Param('id') id: string): Promise<Jogador> {
    return await this.jogadoresService.consultarJogadorPorId(id);
  }

  @Delete(':id')
  async deletarJogador(@Param('id') id: string): Promise<void> {
    await this.jogadoresService.deletarJogadorPorId(id);
  }
}
