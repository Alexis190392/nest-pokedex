import { Injectable } from '@nestjs/common';
import { PokeResponse } from "./interfaces/poke-response.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Pokemon } from "../pokemon/entities/pokemon.entity";
import { Model } from "mongoose";
import { AxiosAdapter } from "../common/adapters/axios.adapter";

@Injectable()
export class SeedService {
  
  // private readonly axios: AxiosInstance = axios;
  
  constructor(
      @InjectModel(Pokemon.name)
      private readonly pokemonModel: Model<Pokemon>,
      private readonly http:AxiosAdapter,
      ) {}
  
  async executeSeed(){
    
    await this.pokemonModel.deleteMany({}); //elimino todos los pokemon de la bd
    
    const data = await this.http.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=650");
    const pokemonToInsert:{name: string, no: number} []= [];
    
      //extraer el id
    data.results.forEach(async ({name,url}) => {
      
      //divido por slash
      const segments = url.split('/');
      const no: number = +segments[segments.length-2];
      console.log({name,no});
      
      pokemonToInsert.push({name,no});
      
    })
    
   await this.pokemonModel.insertMany(pokemonToInsert);
    
    // return data.results;
    return "SEED EJECUTADO";
    
  }
}
