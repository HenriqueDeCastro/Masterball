import { ResumeInfoPokeapi } from "../../resume-info-pokeapi";

export interface DamageRelations {
  double_damage_from: ResumeInfoPokeapi[];
  double_damage_to: ResumeInfoPokeapi[];
  half_damage_from: ResumeInfoPokeapi[];
  half_damage_to: ResumeInfoPokeapi[];
  no_damage_from: ResumeInfoPokeapi[];
  no_damage_to: ResumeInfoPokeapi[];
}
