import { Observable, Subscription } from 'rxjs';
import { PokedexService } from 'src/app/core/services/pokedex/pokedex.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventSelectFilter } from 'src/app/shared/models/interfaces/event';
import { EventSelectFilterEnum } from 'src/app/shared/models/enum';
import { PokedexSubject } from 'src/app/shared/models/interfaces/pokedex';

@Component({
  selector: 'app-pokedex-home',
  templateUrl: './pokedex-home.component.html',
  styleUrls: ['./pokedex-home.component.scss']
})
export class PokedexHomeComponent implements OnInit, OnDestroy {

  pokedex$!: Observable<PokedexSubject>;
  nextPage$!: Observable<boolean>;
  showFilter!: boolean;
  searchValue!: string | null;
  typeFilter!: EventSelectFilter | null;
  regionFilter!: EventSelectFilter | null;
  textinfo: string;
  private pokemonsGet$!: Subscription;

  constructor(private pokedexService: PokedexService) {
    this.textinfo = 'The Pokédex contains detailed stats for every creature from the Pokémon games';
  }

  ngOnInit(): void {
    this.pokedex$ = this.pokedexService.returnPokedex();
    this.nextPage$ = this.pokedexService.returnNextPagePokemon();
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
    this.pokemonsGet$ = this.pokedexService.get({
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
    this.pokedexService.resetPokemons();
    this.pokedexService.resetPokedex();
  }
}
