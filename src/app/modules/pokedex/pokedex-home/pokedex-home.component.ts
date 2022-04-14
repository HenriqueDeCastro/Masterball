import { TypeService } from './../../../core/services/type/type.service';
import { PokemonDetail } from 'src/app/shared/models/interfaces/pokemon';
import { Observable, Subscription } from 'rxjs';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResumeInfoPokeapi } from 'src/app/shared/models/interfaces/resume-info-pokeapi';
import { EventSelectFilter } from 'src/app/shared/models/interfaces/event';

@Component({
  selector: 'app-pokedex-home',
  templateUrl: './pokedex-home.component.html',
  styleUrls: ['./pokedex-home.component.scss']
})
export class PokedexHomeComponent implements OnInit, OnDestroy {

  pokemons$!: Observable<PokemonDetail[]>;
  nextPage$!: Observable<boolean>;
  types$!: Observable<ResumeInfoPokeapi[]>;

  textinfo: string;
  searchValue!: string | null;
  showFilter!: boolean;
  selectFilter!: string | null;

  private pokemonsGet$!: Subscription;
  private currentPage: number;

  constructor(private pokemonService: PokemonService, private typeService: TypeService) {
    this.textinfo = 'The Pokédex contains detailed stats for every creature from the Pokémon games';
    this.currentPage = 1;
  }


  ngOnInit(): void {
    this.pokemons$ = this.pokemonService.returnPokemons();
    this.nextPage$ = this.pokemonService.returnNextPagePokemon();
    this.types$ = this.typeService.returnTypes();
    this.pokemonsGet$ = this.pokemonService.getAllPokemons({ currentPage: this.currentPage }).subscribe();
  }

  receivedClicked(click: boolean): void {
    if(click) {
      if(this.selectFilter) {
        this.pokemonsGet$ = this.pokemonService.getPokemonsByType(this.selectFilter!, { currentPage:this.currentPage++ }).subscribe();
      } else {
        this.pokemonsGet$ = this.pokemonService.getAllPokemons({ currentPage: this.currentPage++ }).subscribe();
      }
    }
  }

  receiveSearch(value: string): void {
    this.unsubscribePokemons();
    this.resetItemsBySearch();

    if(value) {
      this.searchValue = value;
      this.pokemonsGet$ = this.pokemonService.getPokemonBySearch(this.searchValue).subscribe()
    } else {
      this.pokemonsGet$ = this.pokemonService.getAllPokemons({ currentPage: this.currentPage++, clearSubject: true }).subscribe();
    }
  }

  receiveFilter(selected: EventSelectFilter): void {
    this.unsubscribePokemons();
    this.resetItemsBySearch();

    if(selected.checked) {
      this.selectFilter = selected.value;
      this.pokemonsGet$ = this.pokemonService.getPokemonsByType(this.selectFilter!, { currentPage: this.currentPage++, clearSubject: true }).subscribe();
    } else {
      this.pokemonsGet$ = this.pokemonService.getAllPokemons({ currentPage: this.currentPage++, clearSubject: true }).subscribe();
    }
  }

  resetItemsBySearch(): void {
    this.selectFilter = null;
    this.searchValue = null;
    this.currentPage = 0;
  }

  unsubscribePokemons(): void {
    if(this.pokemonsGet$) {
      this.pokemonsGet$.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribePokemons();
    this.pokemonService.clearPokemons();
  }
}
