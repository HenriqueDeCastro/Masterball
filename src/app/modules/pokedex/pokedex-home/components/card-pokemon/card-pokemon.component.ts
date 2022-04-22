import { PokemonDetail } from './../../../../../shared/models/interfaces/pokemon/pokemon-detail/pokemon-detail';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.scss']
})
export class CardPokemonComponent {

  @Input() pokemon!: PokemonDetail;
}
