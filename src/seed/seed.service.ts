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
    
    await this.pokemonModel.deleteMany({}); //elimino todos los pokemon de la bd
    
    const {data} = await this.axios.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=250");
    const insertPromisesArray = [];
    
      //extraer el id
    data.results.forEach(async ({name,url}) => {
      
      //divido por slash
      const segments = url.split('/');
      const no: number = +segments[segments.length-2];
      console.log({name,no});
      
      // const pokemon = await this.pokemonModel.create({name,no});
      insertPromisesArray.push(
          this.pokemonModel.create({name,no})
      );
      
    })
    
    await Promise.all(insertPromisesArray);// hace las insersiones de forma simultanea una vez
    
    // return data.results;
    return "SEED EJECUTADO";
    
  }
}
