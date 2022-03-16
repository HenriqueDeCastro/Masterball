import { ResumeInfoPokeapi } from "../../resume-info-pokeapi";
import { Sprites } from "./sprites";
import { Types } from "./types";
import { VersionGroupDetails } from "./version-group-details";

export interface PokemonDetail {
  abilities: { ability: ResumeInfoPokeapi, is_hidden: boolean, slot: number }[];
  base_experience: number;
  forms: ResumeInfoPokeapi[];
  game_indices: { game_index: number, version:ResumeInfoPokeapi };
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: { move:ResumeInfoPokeapi, version_group_details:VersionGroupDetails[] }[];
  name: string;
  order: number;
  past_types: [];
  species: ResumeInfoPokeapi;
  sprites: Sprites;
  stats: { base_stat: number, effort: number, stat:ResumeInfoPokeapi }[];
  types: Types[];
  weight: number;
}
