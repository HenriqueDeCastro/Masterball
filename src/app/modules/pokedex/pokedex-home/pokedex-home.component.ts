import { TypeService } from './../../../core/services/type/type.service';
import { PokemonDetail } from 'src/app/shared/models/interfaces/pokemon';
import { Observable, Subscription } from 'rxjs';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResumeInfoPokeapi } from 'src/app/shared/models/interfaces/resume-info-pokeapi';

@Component({
  selector: 'app-pokedex-home',
  templateUrl: './pokedex-home.component.html',
  styleUrls: ['./pokedex-home.component.scss']
})
export class PokedexHomeComponent implements OnInit, OnDestroy {

  pokemons$!: Observable<PokemonDetail[]>;
  types$!: Observable<ResumeInfoPokeapi[]>;
  pokemonsGet$!: Subscription;

  constructor(private pokemonService: PokemonService, private typeService: TypeService) {}

  ngOnInit(): void {
     this.pokemons$ = this.pokemonService.returnPokemons();
     this.types$ = this.typeService.returnTypes();
  }

  receivedClicked(click: boolean): void {
    if(click) {
      this.pokemonsGet$ = this.pokemonService.getPokemons().subscribe();
    }
  }

  ngOnDestroy(): void {
    if(this.pokemonsGet$) {
      this.pokemonsGet$.unsubscribe();
    }
  }
}
