import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from "./entities/pokemon.entity";
import { isValidObjectId, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { PaginacionDto } from "../common/dto/paginacion.dto";

@Injectable()
export class PokemonService {
  
  constructor(
      @InjectModel(Pokemon.name)
      private readonly pokemonModel: Model<Pokemon>
  ) {
  }
  
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    
    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      
      return pokemon;
      
    } catch (error){
        this.handleExceptions(error);
    }
    
    
  }
  
  findAll(paginacionDto: PaginacionDto) {
      const {limit = 10, offset = 0} = paginacionDto; //por default
      
      return this.pokemonModel.find()
        .limit(limit)
        .skip(offset)
        .sort({
            no: 1
        })
        .select('-__v'); //elimino parametro que no quiero ver
  }
  
  async findOne(term: string) {
    
    let pokemon: Pokemon;
    if (!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({no: term});
    }
    //Verificacion por mongoId
    if (!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }
    
    //Verificacion por Name
    if (!pokemon){
      pokemon = await  this.pokemonModel.findOne({name: term.toLowerCase().trim()}); //trim para eliminar espacios adelante o detras
    }
    
    //Si no exite
    if (!pokemon){
      throw new NotFoundException(`El pokemon con el id o name '${term}' no se encuentra.`)
    }
    
    return pokemon;
    //return `This action returns a #${id} pokemon`;
  }
  
  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
      
      try{
      const pokemon = await this.findOne(term);
      
      if (updatePokemonDto.name)
          updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      
      await pokemon.updateOne( updatePokemonDto, {new: true}); // para devolver el response, caso contrario responde con el request
    
      return { ...pokemon.toJSON(), ...updatePokemonDto };
      } catch (error){
         this.handleExceptions(error)
        }
  }
  
  async remove(id: string) {
      // const pokemon = await this.findOne(id);
      // await pokemon.deleteOne();
      //   return {id};
      
      // const result =  await this.pokemonModel.findByIdAndDelete(id);
      const {deletedCount} = await  this.pokemonModel.deleteOne({_id: id});
      if (deletedCount === 0)
          throw new BadRequestException(`Pokemon con el id "${id}" no existe.`);
      
      return ;
  }
  
  
  private handleExceptions(error: any){
      if ( error.code === 11000){
          throw new BadRequestException(`El pokemon existe en db ${JSON.stringify( error.keyValue)}`);
      }
      console.log(error);
      throw new InternalServerErrorException(`No se puede crear el Pokemon - checkear logs`)
  }
}