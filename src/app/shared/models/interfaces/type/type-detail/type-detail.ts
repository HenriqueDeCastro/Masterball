import { ResumeInfoPokeapi } from "../../resume-info-pokeapi";
import { DamageRelations } from "./damage-relations";

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
  pokemon: { pokemon: ResumeInfoPokeapi, slot: number }[];
}
