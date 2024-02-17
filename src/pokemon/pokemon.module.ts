import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Pokemon, PokemonSchema } from "./entities/pokemon.entity";
import { PaginacionDto } from "../common/dto/paginacion.dto";
import { ConfigModule } from "@nestjs/config";

@Module({
  controllers: [PokemonController],
  providers: [PokemonService,PaginacionDto],
  imports: [
      ConfigModule,
      MongooseModule.forFeature([{
        name: Pokemon.name, //.name es de Document
        schema: PokemonSchema,
    }])
  ],
  exports: [
      MongooseModule
  ]
})
export class PokemonModule {}
