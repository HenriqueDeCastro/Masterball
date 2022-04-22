import { LanguagePokeapi, ResumeInfoPokeapi } from "../../pokeapi";

export interface RegionDetail {
  id: number;
  locations: ResumeInfoPokeapi[];
  main_generation: ResumeInfoPokeapi;
  name: string;
  names: LanguagePokeapi[];
  pokedexes: ResumeInfoPokeapi[];
  version_groups: ResumeInfoPokeapi[];
}
