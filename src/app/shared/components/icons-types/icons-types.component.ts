import { Component, Input } from '@angular/core';
import { Types } from '../../models/interfaces/pokemon';

@Component({
  selector: 'app-icons-types',
  templateUrl: './icons-types.component.html',
  styleUrls: ['./icons-types.component.scss']
})
export class IconsTypesComponent {

  @Input() pokemonsTypes!: Types[];
}
