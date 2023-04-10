import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

import { v4 as uuidv4 } from 'uuid';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    this.logger.log(`criando jogador ${criarJogadorDto.nome}`);

    this.criar(criarJogadorDto);

    console.log(this.jogadores);
  }

  private criar(criarJogadorDto: CriarJogadorDto): void {
    const { nome, email, telefoneCelular } = criarJogadorDto;
    const jogador: Jogador = {
      _id: uuidv4(),
      nome,
      email,
      telefoneCelular,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'https://google.com.br/foto123.png',
    };
    this.jogadores.push(jogador);
  }

  async consultarJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }
}
