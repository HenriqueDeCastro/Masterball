import { PokedexPokemon } from "../pokedex-general";

export interface PokedexSubject {
  pokemons?: PokedexPokemon[];
  search?: string;
  url?: string;
  type?: string;
}
