import { ResumeInfoPokeapi } from "../../resume-info-pokeapi";
import { DamageRelations } from "./damage-relations";
import { PokemonWithSlot } from "./pokemon-with-slot";

export interface TypeDetail {
  damage_relations: DamageRelations;
  game_indices: { game_index: number, generation: ResumeInfoPokeapi }[];
  generation: ResumeInfoPokeapi;
  id: number;
  move_damage_class: ResumeInfoPokeapi;
  moves: ResumeInfoPokeapi[];
  name: string;
  names: { language:ResumeInfoPokeapi, name: string }[];
  past_damage_relations: { damage_relations: DamageRelations, generation: ResumeInfoPokeapi };
  pokemon: PokemonWithSlot[];
}
