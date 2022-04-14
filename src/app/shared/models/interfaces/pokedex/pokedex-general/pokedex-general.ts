import { ResumeInfoPokeapi } from 'src/app/shared/models/interfaces/resume-info-pokeapi';
import { PokedexPokemon } from './pokedex-pokemon';

export interface PokedexGeneral {
  descriptions: { description: string, language: ResumeInfoPokeapi }[];
  id: number;
  is_main_series: boolean;
  name: string;
  names: { language: ResumeInfoPokeapi, name: string }[];
  pokemon_entries: PokedexPokemon[];
  region: ResumeInfoPokeapi;
  version_groups: ResumeInfoPokeapi[];
}
