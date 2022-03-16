import { ResumeInfoPokeapi } from "../../resume-info-pokeapi";

export interface PokemonGeneral {
  count: number;
  next: string;
  previou: any;
  results: ResumeInfoPokeapi[];
}
