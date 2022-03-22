import { PokemonDetail } from 'src/app/shared/models/interfaces/pokemon';
import { Observable, Subscription } from 'rxjs';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokedex-home',
  templateUrl: './pokedex-home.component.html',
  styleUrls: ['./pokedex-home.component.scss']
})
export class PokedexHomeComponent implements OnInit, OnDestroy {

  pokemons$!: Observable<PokemonDetail[]>;
  pokemonsGet$!: Subscription;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
     this.pokemons$ = this.pokemonService.returnPokemons();
  }

  receivedClicked(click: boolean): void {
    if(click) {
      this.pokemonsGet$ = this.pokemonService.getPokemons().subscribe();
    }
  }

  ngOnDestroy(): void {
    this.pokemonsGet$.unsubscribe();
  }
}
