import { PokemonDetail } from "../../pokemon";
import { PokedexPokemon } from "../pokedex-general";

export interface PokedexSubject {
  pokemonsGeneral?: PokedexPokemon[];
  pokemonsDetails?: PokemonDetail[];
  search?: string;
  url?: string;
  type?: string;
  description?: string;
}
