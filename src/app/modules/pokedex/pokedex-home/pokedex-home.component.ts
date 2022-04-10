import { environment } from 'src/environments/environment';
import { TypeService } from './../../../core/services/type/type.service';
import { PokemonDetail } from 'src/app/shared/models/interfaces/pokemon';
import { Observable, Subscription } from 'rxjs';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { Component, OnDestroy } from '@angular/core';
import { ResumeInfoPokeapi } from 'src/app/shared/models/interfaces/resume-info-pokeapi';
import { EventSelectFilter } from 'src/app/shared/models/interfaces/event';

@Component({
  selector: 'app-pokedex-home',
  templateUrl: './pokedex-home.component.html',
  styleUrls: ['./pokedex-home.component.scss']
})
export class PokedexHomeComponent implements OnDestroy {

  pokemons$: Observable<PokemonDetail[]>;
  types$: Observable<ResumeInfoPokeapi[]>;
  pokemonsGet$!: Subscription;
  pokemonsCount: number;
  textinfo: string;
  searchValue!: string;
  showFilter!: boolean;

  constructor(private pokemonService: PokemonService, private typeService: TypeService) {
    this.pokemons$ = this.pokemonService.returnPokemons();
    this.types$ = this.typeService.returnTypes();
    this.pokemonsCount = environment.pokemons_count;
    this.textinfo = 'The Pokédex contains detailed stats for every creature from the Pokémon games';
  }

  receivedClicked(click: boolean): void {
    if(click) {
      this.pokemonsGet$ = this.pokemonService.getPokemons().subscribe();
    }
  }

  receiveSearch(value: string): void {
    this.unsubscribePokemons();

    if(value) {
      this.searchValue = value;
      this.pokemonsGet$ = this.pokemonService.getPokemonBySearch(this.searchValue).subscribe()
    } else {
      this.pokemonsGet$ = this.pokemonService.getPokemons(true).subscribe();
    }
  }

  receiveFilter(selected: EventSelectFilter): void {
    if(selected.checked) {
      this.pokemonsGet$ = this.pokemonService.getPokemonsByType(selected.value, true).subscribe();
    } else {
      this.pokemonsGet$ = this.pokemonService.getPokemons(true).subscribe();
    }
  }

  unsubscribePokemons(): void {
    if(this.pokemonsGet$) {
      this.pokemonsGet$.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribePokemons();
  }
}
