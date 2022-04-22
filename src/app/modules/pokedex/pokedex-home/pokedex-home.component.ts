import { RegionService } from './../../../core/services/region/region.service';
import { TypeService } from './../../../core/services/type/type.service';
import { PokemonDetail } from 'src/app/shared/models/interfaces/pokemon';
import { Observable, Subscription } from 'rxjs';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResumeInfoPokeapi } from 'src/app/shared/models/interfaces/pokeapi';
import { EventSelectFilter } from 'src/app/shared/models/interfaces/event';
import { RegionDetail } from 'src/app/shared/models/interfaces/region';
import { EventSelectFilterEnum } from 'src/app/shared/models/enum';

@Component({
  selector: 'app-pokedex-home',
  templateUrl: './pokedex-home.component.html',
  styleUrls: ['./pokedex-home.component.scss']
})
export class PokedexHomeComponent implements OnInit, OnDestroy {

  pokemons$!: Observable<PokemonDetail[]>; // colocar no componente filho se possivel
  nextPage$!: Observable<boolean>; // colocar no componente filho se possivel
  types$!: Observable<ResumeInfoPokeapi[]>; // colocar no componente filho se possivel
  regions$!: Observable<RegionDetail[]>; // colocar no componente filho se possivel

  textinfo: string;
  showFilter!: boolean;
  searchValue!: string | null;
  typeFilter!: EventSelectFilter | null;
  regionFilter!: EventSelectFilter | null;

  private pokemonsGet$!: Subscription; // alterar para takUntil

  constructor(
    private pokemonService: PokemonService,
    private typeService: TypeService,
    private regionService: RegionService) {
    this.textinfo = 'The Pokédex contains detailed stats for every creature from the Pokémon games';
  }


  ngOnInit(): void {
    this.pokemons$ = this.pokemonService.returnPokemons();
    this.nextPage$ = this.pokemonService.returnNextPagePokemon();
    this.types$ = this.typeService.returnTypes();
    this.regions$ = this.regionService.returnRegions();
  }

  receivedClickedViewMore(): void {
    this.pokemonsByTypeRegion(false);
  }

  receiveSearch(value: string): void {
    this.unsubscribePokemons();
    this.searchValue = value;
    this.pokemonsByTypeRegion(true);
  }

  receiveFilter(selected: EventSelectFilter): void {
    this.unsubscribePokemons();

    if(selected.type == EventSelectFilterEnum.TypePokemon) {
      this.typeFilter = selected.checked? selected : null;
    } else if(selected.type == EventSelectFilterEnum.Region) {
      this.regionFilter = selected.checked? selected : null;
    }

    this.pokemonsByTypeRegion(true);
  }

  pokemonsByTypeRegion(clearSubject: boolean): void {
    this.pokemonsGet$ = this.pokemonService.getPokemonsByPokedex({
      clearSubject: clearSubject,
      search: this.searchValue!,
      url: this.regionFilter?.value,
      type: this.typeFilter?.value
    }).subscribe();
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
