import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from "axios";
import { PokeResponse } from "./interfaces/poke-response.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Pokemon } from "../pokemon/entities/pokemon.entity";
import { Model } from "mongoose";

@Injectable()
export class SeedService {
  
  private readonly axios: AxiosInstance = axios;
  
  constructor(
      @InjectModel(Pokemon.name)
      private readonly pokemonModel: Model<Pokemon>,
      ) {}
  
  async executeSeed(){
    const {data} = await this.axios.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=250");
    
    //extraer el id
    data.results.forEach(async ({name,url}) => {
      //divido por slash
      const segments = url.split('/');
      const no: number = +segments[segments.length-2];
      console.log({name,no});
      
      const pokemon = await this.pokemonModel.create({name,no});
      
    })
    
    // return data.results;
    return "SEED EJECUTADO";
    
  }
}
