import { Observable } from 'rxjs';
import { PokemonStorageService } from './../../../core/services/pokemon-storage/pokemon-storage.service';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { PokemonDetail } from './../../../shared/models/interfaces/pokemon/pokemon-detail/pokemon-detail';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokedex-home',
  templateUrl: './pokedex-home.component.html',
  styleUrls: ['./pokedex-home.component.scss']
})
export class PokedexHomeComponent implements OnInit {

  pokemons$!: Observable<PokemonDetail[]>;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
     this.pokemons$ = this.pokemonService.returnPokemons();
  }
}
